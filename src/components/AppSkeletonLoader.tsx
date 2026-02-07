import { JSX } from 'react';
import { DimensionValue, StyleProp, View, ViewStyle } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import Size from '@src/utils/useResponsiveSize';
interface Props {
  borderRadius?: number;
  children?: JSX.Element;
  width?: DimensionValue;
  height?: DimensionValue;
  style?: StyleProp<ViewStyle>;
}

const AppSkeletonLoader = (props: Props): React.ReactNode => {
  const {
    children,
    borderRadius = 10,
    height = Size.calcHeight(11),
    width = '100%',
    style,
  } = props;

  return (
    <View style={style}>
      <SkeletonPlaceholder
        borderRadius={borderRadius}
        backgroundColor="#A9A9A980"
      >
        {children ? children : <View style={{ height, width }} />}
      </SkeletonPlaceholder>
    </View>
  );
};

export default AppSkeletonLoader;
