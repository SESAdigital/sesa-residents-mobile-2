import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import { StatusBar, View } from 'react-native';

import AppText from '@src/components/AppText';
import SwitchPropertyRow from '@src/components/common/SwitchPropertyRow';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import EventBookingsScreen from '@src/screens/dashboard/bookings/events/EventBookingsScreen';
import GroupAccessBookingsScreen from '@src/screens/dashboard/bookings/group-access/GroupAccessBookingsScreen';
import VisitorBookingsScreen from '@src/screens/dashboard/bookings/visitors/VisitorBookingsScreen';
import Size from '@src/utils/useResponsiveSize';
import AppTopTabBar from './components/AppTopTabBar';
import routes from './routes';

const BookingTopTabNavs = createMaterialTopTabNavigator({
  tabBar: props => <CustomTopTabBar {...props} />,
  screens: {
    [routes.VISITOR_BOOKINGS_SCREEN]: {
      screen: VisitorBookingsScreen,
      options: {
        title: 'Visitors',
      },
    },
    [routes.EVENT_BOOKINGS_SCREEN]: {
      screen: EventBookingsScreen,
      options: {
        title: 'Events',
      },
    },
    [routes.GROUP_ACCESS_BOOKINGS_SCREEN]: {
      screen: GroupAccessBookingsScreen,
      options: {
        title: 'Group Access',
      },
    },
  },
});

export default BookingTopTabNavs;

function CustomTopTabBar(props: MaterialTopTabBarProps): React.JSX.Element {
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
      <AppTopTabBar {...props} />
    </View>
  );
}
