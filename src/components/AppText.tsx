import { Text, TextProps } from 'react-native';

import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';

const AppText = ({ children, style, ...otherProps }: TextProps) => {
  return (
    <Text
      style={[
        {
          fontSize: Size.calcAverage(14),
          fontFamily: fonts.INTER_400,
          color: colors.BLACK_100,
          flexShrink: 1,
        },
        style,
      ]}
      {...otherProps}
    >
      {children}
    </Text>
  );
};

export default AppText;
