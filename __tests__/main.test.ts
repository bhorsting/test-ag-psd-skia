import * as fs from "fs";
import {initializeAgPsdCanvas, Psd} from "../src/ag-psd-decorated/index.js";
import {openPsd} from "../src/main.js";

describe('When opening a large PSB file', () => {
  const psbFileBuffer = fs.readFileSync('./test-assets/template-50000px-wide.psb')
  let psd: Psd;
  beforeAll(() => {
    initializeAgPsdCanvas();
    psd = openPsd(psbFileBuffer);
  })
  it('Should open the file', () => {
    expect(psd).toBeDefined();
  });
  // PSD files have a maximum width and height of 30000
  // PSB files have a maximum width and height of 300000
  it('Should have a width of 50000', () => {
    expect(psd.width).toBe(50000);
  });
  it('Should have a canvas with a width of 50000', () => {
    expect(psd.canvas.width).toBe(50000);
  });
})
