import { Image } from 'skia-canvas';
import { initializeCanvas } from 'ag-psd/dist/helpers';
import { CanvasNoGpu } from './skiaCanvasNoGpu';

function createCanvas(width: number, height: number) {
  return new CanvasNoGpu(width, height);
}

function createCanvasFromData(data: Uint8Array) {
  const image = new Image();
  image.src = Buffer.from(data);
  const canvas = new CanvasNoGpu(image.width, image.height);
  canvas.getContext('2d')!.drawImage(image, 0, 0);
  return canvas;
}

export function initializeAgPsdCanvas(): void {
  // @ts-ignore
  return initializeCanvas(createCanvas, createCanvasFromData);
}
