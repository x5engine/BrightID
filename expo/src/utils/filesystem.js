import {
  documentDirectory,
  EncodingType,
  makeDirectoryAsync,
  readAsStringAsync,
  writeAsStringAsync,
} from 'expo-file-system';
import { Alert } from 'react-native';
import { parseDataUri, mimeFromUri } from './images';

export const createImageDirectory = async () => {
  try {
    await makeDirectoryAsync(`${documentDirectory}/photos`, {
      intermediates: true,
    });
    return 'success';
  } catch (err) {
    err instanceof Error
      ? console.warn('createImageDirectory', err.message)
      : console.log('createImageDirectory', err);
  }
};

export const saveImage = async ({ base64Image, imageName }) => {
  try {
    const { filetype, image } = parseDataUri(base64Image);
    const path = `${documentDirectory}/photos/${imageName}.${filetype}`;
    await writeAsStringAsync(path, image, { encoding: EncodingType.Base64 });
    return `${imageName}.${filetype}`;
  } catch (err) {
    err instanceof Error
      ? console.warn('saveImage', err.message)
      : console.log('saveImage', err);
  }
};

export const retrieveImage = async (filename) => {
  try {
    const mime = mimeFromUri(filename);
    const base64Image = await readAsStringAsync(
      `${documentDirectory}/photos/${filename}`,
      { encoding: EncodingType.Base64 },
    );
    return `data:${mime};base64,${base64Image}`;
  } catch (err) {
    err instanceof Error
      ? console.warn('retrieveImage', err.message)
      : console.log('retrieveImage', err);
  }
};
