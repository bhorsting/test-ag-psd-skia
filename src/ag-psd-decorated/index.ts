import {
  createReader,
  readPsd as readPsdInternal,
} from 'ag-psd/dist/psdReader';
import { Layer as LayerInternal, Psd as PsdInternal } from 'ag-psd';
import { ReadOptions } from 'ag-psd/dist/psd';
import { backgroundToLayer } from './backgroundOnlyToLayeredPsd';

export { initializeAgPsdCanvas } from './initializeCanvas';
export interface BufferLike {
  buffer: ArrayBuffer;
  byteOffset: number;
  byteLength: number;
}

export interface Layer extends LayerInternal {
  textLayerIndex?: number;
  parentLayer?: Layer;
  children?: Layer[];
}

export interface Psd extends PsdInternal {
  children?: Layer[];
}

export const createTextLayerIndices = (
  layers: Layer[],
  parent: Layer | Psd,
  textLayerIndex = 0,
) => {
  for (let i = 0; i < layers.length; i += 1) {
    const layer = layers[i];
    layer.parentLayer = parent as Layer;
    if (layer.children) {
      createTextLayerIndices(layer.children, layer, textLayerIndex);
    }
    /**
     * In EngineData, each text layer is indexed based on the layer's occurrence in the tree
     * During PSD parsing, we assign each layer a text-specific index
     */
    if (layer.text) {
      layer.textLayerIndex = textLayerIndex;
      textLayerIndex += 1;
    }
  }
};

export function readPsd(
  buffer: ArrayBuffer | BufferLike,
  options?: ReadOptions,
): Psd {
  const reader =
    'buffer' in buffer
      ? createReader(buffer.buffer, buffer.byteOffset, buffer.byteLength)
      : createReader(buffer);
  const psd: Psd = readPsdInternal(reader, options) as any;
  if (!psd.children) {
    psd.children = [backgroundToLayer(psd)];
  }
  createTextLayerIndices(psd.children, psd);
  return psd;
}
