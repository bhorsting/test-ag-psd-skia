import { Psd } from './index.js';

export const ERROR_MESSAGE_NO_8_BITS_PER_CHANNEL =
  'Image mode cannot exceed 8 bits-per-channel. Please update file and try again';

export const checkPsdValidity = (psd: Psd) => {
  const errorMessages: string[] = [];
  if (psd.bitsPerChannel !== 8) {
    errorMessages.push(ERROR_MESSAGE_NO_8_BITS_PER_CHANNEL);
  }
  if (errorMessages.length > 0) {
    throw new Error(errorMessages.join('\n'));
  }
};
