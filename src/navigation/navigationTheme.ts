import {DefaultTheme} from '@react-navigation/native';
import colors from '@src/configs/colors';

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.BLUE_200,
    background: colors.WHITE_200,
  },
};
