import { JSX } from 'react';
import FastImage, { FastImageProps } from 'react-native-fast-image';

const AppImage = (props: FastImageProps): JSX.Element => {
  return <FastImage resizeMode="cover" {...props} />;
};

export default AppImage;
