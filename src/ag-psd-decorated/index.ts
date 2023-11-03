import {
  createReader,
  readPsd as readPsdInternal,
} from 'ag-psd/dist/psdReader.js';
import { Layer as LayerInternal, Psd as PsdInternal } from 'ag-psd';
import { ReadOptions } from 'ag-psd/dist/psd.js';
import { backgroundToLayer } from './backgroundOnlyToLayeredPsd.js';

export { initializeAgPsdCanvas } from './initializeCanvas.js';
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

export function readPsd(
  buffer: ArrayBuffer | BufferLike,
  options?: ReadOptions,
): Psd {
  const reader =
    'buffer' in buffer
      ? createReader(buffer.buffer, buffer.byteOffset, buffer.byteLength)
      : createReader(buffer);
  const psd: Psd = readPsdInternal(reader, options) as unknown as Psd;
  if (!psd.children) {
    psd.children = [backgroundToLayer(psd)];
  }
  return psd;
}
