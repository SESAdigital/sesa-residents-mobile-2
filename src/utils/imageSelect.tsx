import { ImagePickerResponse } from 'react-native-image-picker';

import {
  MaterialSymbolsAndroidCamera,
  MaterialSymbolsPhotoLibraryRounded,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import Size from '@src/utils/useResponsiveSize';
import appConfig from './appConfig';
import { takePhoto, pickImage } from './imagePicker';

interface Props {
  handleAdd: (res: ImagePickerResponse | null) => void;
  itemsLeft: number;
}
export const defaultSelectImageOptions = (props: Props) => {
  const { handleAdd, itemsLeft } = props;
  return [
    {
      title: 'Take a snapshot',
      onPress: () => {
        takePhoto(res => handleAdd(res), {
          mediaType: 'photo',
          quality: appConfig.APP_IMAGE_COMPRESS_VALUE,
        });
      },
      icon: (
        <MaterialSymbolsAndroidCamera
          height={Size.calcAverage(24)}
          width={Size.calcAverage(24)}
          color={colors.BLUE_200}
        />
      ),
    },
    {
      title: 'Pick from gallery',
      onPress: () => {
        pickImage(res => handleAdd(res), {
          mediaType: 'photo',
          quality: appConfig.APP_IMAGE_COMPRESS_VALUE,
          selectionLimit: itemsLeft,
        });
      },
      icon: (
        <MaterialSymbolsPhotoLibraryRounded
          height={Size.calcAverage(20)}
          width={Size.calcAverage(20)}
          color={colors.BLUE_200}
        />
      ),
    },
  ];
};
