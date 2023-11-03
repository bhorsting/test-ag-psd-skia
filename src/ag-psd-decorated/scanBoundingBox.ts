/**
 * Tools for finding the bounding box around a set of colored pixels
 */
import { LayerMaskData } from 'ag-psd';
import { Layer } from './index';
import { PIXEL_ARRAY_OFFSET_ALPHA, PIXEL_ARRAY_OFFSET_RED } from '../constants';
import { IBoundingBox } from './types';

const SCAN_THRESHOLD = 10;

export const scanBoundingBox = (
  data: Uint8ClampedArray,
  w: number,
  h: number,
  scanOffset: number = PIXEL_ARRAY_OFFSET_ALPHA,
  maskMode: boolean = false,
): IBoundingBox => {
  const l = data.length;
  let i;
  const bound: IBoundingBox = {
    top: undefined,
    left: undefined,
    right: undefined,
    bottom: undefined,
  };
  let x;
  let y;
  const substractValueFrom: number = maskMode ? 255 : 0;
  // Iterate over every pixel to find the highest
  // and where it ends on every axis ()
  for (i = 0; i < l; i += 4) {
    if (Math.abs(substractValueFrom - data[i + scanOffset]) > SCAN_THRESHOLD) {
      x = (i / 4) % w;
      // eslint-disable-next-line no-bitwise
      y = ~~(i / 4 / w);
      if (bound.top === undefined) {
        bound.top = y;
      }
      if (bound.left === undefined) {
        bound.left = x;
      } else if (x < bound.left) {
        bound.left = x;
      }
      if (bound.right === undefined) {
        bound.right = x;
      } else if (bound.right < x) {
        bound.right = x;
      }
      if (bound.bottom === undefined) {
        bound.bottom = y;
      } else if (bound.bottom < y) {
        bound.bottom = y;
      }
    }
  }
  if (bound.left === undefined) {
    bound.left = 0;
  }
  if (bound.right === undefined) {
    bound.right = w;
  }
  if (bound.top === undefined) {
    bound.top = 0;
  }
  if (bound.bottom === undefined) {
    bound.bottom = h;
  }
  return (<any>bound) as IBoundingBox;
};

export const scanLayerChannelBoundingBox = (
  layer: Layer | LayerMaskData,
  channel: number = PIXEL_ARRAY_OFFSET_RED,
): IBoundingBox | undefined => {
  const imageData = layer.canvas
    ?.getContext('2d')
    ?.getImageData(0, 0, layer.canvas?.width, layer.canvas?.height)
    ?.data.buffer;
  if (imageData && layer.canvas) {
    return scanBoundingBox(
      new Uint8ClampedArray(imageData),
      layer.canvas.width,
      layer.canvas.height,
      channel,
    );
  }
  return undefined;
};

export const scanLayerMaskBoundingBox = (
  mask: LayerMaskData,
): IBoundingBox | undefined => {
  const imageData = mask.canvas
    ?.getContext('2d')
    ?.getImageData(0, 0, mask.canvas?.width, mask.canvas?.height)?.data.buffer;
  if (imageData && mask.canvas) {
    return scanBoundingBox(
      new Uint8ClampedArray(imageData),
      mask.canvas.width,
      mask.canvas.height,
      PIXEL_ARRAY_OFFSET_RED,
      true,
    );
  }
  return undefined;
};

export const scanLayerTransparencyBoundingBox = (
  layer: Layer | LayerMaskData,
): IBoundingBox | undefined => {
  const imageData = layer.canvas
    ?.getContext('2d')
    ?.getImageData(0, 0, layer.canvas?.width, layer.canvas?.height)
    ?.data.buffer;
  if (imageData && layer.canvas) {
    return scanBoundingBox(
      new Uint8ClampedArray(imageData),
      layer.canvas.width,
      layer.canvas.height,
    );
  }
  return undefined;
};
