import { JSX } from 'react';
import FastImage, { FastImageProps } from 'react-native-fast-image';

interface Props extends FastImageProps {
  isView?: boolean;
}

const AppImage = (props: Props): JSX.Element => {
  return <FastImage resizeMode="cover" {...props} />;
};

export default AppImage;
