import { ImageData } from 'skia-canvas';
import { Layer, Psd } from './index.js';
import { CanvasNoGpu } from './skiaCanvasNoGpu.js';

const cloneCanvasAndImageData = (
  inputCanvas: CanvasNoGpu,
): { canvas: CanvasNoGpu; imageData: ImageData } => {
  const canvas: CanvasNoGpu = new CanvasNoGpu(
    inputCanvas.width,
    inputCanvas.height,
  );
  const ctx = canvas.getContext('2d');
  ctx.drawImage(inputCanvas, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  return {
    canvas,
    imageData,
  };
};

export const backgroundToLayer = (input: Psd) => {
  const canvasClone = cloneCanvasAndImageData(<any>input.canvas);
  const layer: Layer = {
    parentLayer: input,
    name: 'Background_Layer',
    id: 0,
    top: 0,
    left: 0,
    bottom: input.height,
    right: input.width,
    canvas: canvasClone.canvas as unknown as HTMLCanvasElement,
    blendMode: 'normal',
    opacity: 1,
    imageData: canvasClone.imageData,
  };
  return layer;
};
