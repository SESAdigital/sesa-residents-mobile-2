import { StatusBar, View } from 'react-native';

import {
  MaterialTopTabBar,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import AppText from '@src/components/AppText';
import SwitchPropertyRow from '@src/components/common/SwitchPropertyRow';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';

const CustomTopTabBar = (props: MaterialTopTabBarProps): React.JSX.Element => {
  return (
    <View style={{ paddingTop: StatusBar.currentHeight }}>
      <View
        style={{
          paddingVertical: Size.calcAverage(12),
          paddingHorizontal: Size.calcAverage(21),
        }}
      >
        <AppText
          style={{
            fontFamily: fonts.INTER_600,
            color: colors.BLACK_200,
            fontSize: Size.calcAverage(16),
          }}
        >
          Bookings
        </AppText>
        <SwitchPropertyRow />
      </View>
      <MaterialTopTabBar {...props} />
    </View>
  );
};

export default CustomTopTabBar;
