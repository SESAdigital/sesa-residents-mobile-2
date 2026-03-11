import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import EventBookingsScreen from '@src/screens/dashboard/bookings/events/EventBookingsScreen';
import GroupAccessBookingsScreen from '@src/screens/dashboard/bookings/group-access/GroupAccessBookingsScreen';
import VisitorBookingsScreen from '@src/screens/dashboard/bookings/visitors/VisitorBookingsScreen';
import CustomTopTabBar from './components/CustomTopTabBar';
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
