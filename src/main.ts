import {Psd, readPsd} from "./ag-psd-decorated/index.js";
import {checkPsdValidity} from "./ag-psd-decorated/checkPsdValidity.js";

export const openPsd = (buffer: Buffer): Psd => {
  const psd: Psd = readPsd(buffer, {
    skipThumbnail: true,
  });
  checkPsdValidity(psd);
  return psd;
}

