import { Image } from 'skia-canvas';
import { initializeCanvas } from 'ag-psd/dist/helpers.js';
import { CanvasNoGpu } from './skiaCanvasNoGpu.js';

const createCanvas = (width: number, height: number): CanvasNoGpu => {
  return new CanvasNoGpu(width, height);
};

const createCanvasFromData = (data: Uint8Array): CanvasNoGpu => {
  const image = new Image();
  image.src = Buffer.from(data);
  const canvas = new CanvasNoGpu(image.width, image.height);
  canvas.getContext('2d')!.drawImage(image, 0, 0);
  return canvas;
};

export function initializeAgPsdCanvas(): void {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return initializeCanvas(createCanvas, createCanvasFromData);
}
