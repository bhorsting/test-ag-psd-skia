import { Canvas } from 'skia-canvas';

export class CanvasNoGpu extends Canvas {
  constructor(width: number, height: number) {
    super(width, height);
    this.gpu = false;
  }
}
