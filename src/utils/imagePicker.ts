import ImageResizer from '@bam.tech/react-native-image-resizer';
import { PermissionsAndroid, Platform } from 'react-native';
import { CaptureData } from 'react-native-camera-kit';

import {
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

import { appToast } from './appToast';
import appConfig from './appConfig';

/**
 * Request camera permission for Android
 * @returns Promise<boolean> - whether permission was granted
 */
const requestCameraPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn('Camera permission error:', err);
      return false;
    }
  }
  return true;
};

/**
 * Open camera to take a photo
 * @param callback - Callback function with the image URI
 * @param options - Custom camera options (optional)
 */
export const takePhoto = async (
  callback: (val: ImagePickerResponse | null) => void,
  options?: CameraOptions,
): Promise<void> => {
  const hasPermission = await requestCameraPermission();
  if (!hasPermission) {
    appToast.Warning('Camera permission is required to take photos.');
    return;
  }

  const defaultOptions: CameraOptions = {
    mediaType: 'photo',
    quality: appConfig.APP_IMAGE_COMPRESS_VALUE,
    saveToPhotos: true,
    cameraType: 'back',

    ...options,
  };

  launchCamera(defaultOptions, res => verifyRes(res, callback));
};

/**
 * Open image library to pick an image
 * @param callback - Callback function with the image URI
 * @param options - Custom image library options (optional)
 */
export const pickImage = (
  callback: (val: ImagePickerResponse | null) => void,
  options?: ImageLibraryOptions,
): void => {
  const defaultOptions: ImageLibraryOptions = {
    mediaType: 'photo',
    quality: appConfig.APP_IMAGE_COMPRESS_VALUE,
    selectionLimit: 1,
    ...options,
  };

  launchImageLibrary(defaultOptions, res => verifyRes(res, callback));
};

/**
 * Check if camera is available on the device
 * @returns Promise<boolean> - whether camera is available
 */
export const isCameraAvailable = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    return await requestCameraPermission();
  }
  return true; // iOS always has camera access if permission granted
};

const verifyRes = (
  response: ImagePickerResponse,
  callback: (val: ImagePickerResponse | null) => void,
): void => {
  if (response?.didCancel) {
    appToast.Info('Image selection was cancelled');
    callback(null);
  } else if (response?.errorCode) {
    appToast.Warning(`ImagePicker Error: ${response?.errorMessage}`);
    callback(null);
  } else if (response?.assets && response?.assets?.length > 0) {
    callback(response);
  } else {
    callback(null);
  }
};

export const handleImageCompression = async (val: CaptureData) => {
  try {
    const compressedImage = await ImageResizer.createResizedImage(
      val?.uri,
      val?.width || 800,
      val?.height || 800,
      'JPEG',
      70,
      0,
      undefined,
      false,
    );
    return compressedImage;
  } catch (error) {
    appToast.Warning(
      `An error occured while trying to compress image. ${error}`,
    );
    return null;
  }
};
