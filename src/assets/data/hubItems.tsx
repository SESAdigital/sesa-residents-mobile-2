import { JSX } from 'react';
import { View } from 'react-native';
import { SvgProps } from 'react-native-svg';

import AppText from '@src/components/AppText';
import {
  MaterialSymbolsBed,
  MaterialSymbolsCalendarAddOn,
  MaterialSymbolsEmojiObjects,
  MaterialSymbolsGroupAdd,
  MaterialSymbolsGroups,
  MaterialSymbolsHandyman,
  MaterialSymbolsHowToVote,
  MaterialSymbolsLocalMall,
  MaterialSymbolsPayments,
  MaterialSymbolsQrCodeScanner,
  MaterialSymbolsShieldWithHeart,
  MaterialSymbolsSos,
} from '@src/components/icons';
import { EmptyIcon } from '@src/components/icons/custom';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import routes from '@src/navigation/routes';
import Size from '@src/utils/useResponsiveSize';

export interface HubItem {
  Icon: (props: SvgProps) => JSX.Element;
  title: ComingSoonTypes | JSX.Element;
  altTitle?: string;
  color: string;
  bgColor: string;
  route: string | null;
  onPress?: () => void;
}

export enum HubItemEnum {
  PANIC_ALERT = 0,
  BOOK_VISITOR,
  CREATE_EVENTS,
  GROUP_ACCESS,
  BILLS_AND_COLLECTIONS,
  BUY_POWER,
  HIRE_ARTISAN,
  POLL_AND_ELECTION,
  EMPTY_ITEM,
  SESA_MALL,
  INSURANCE,
  SESA_HOMES,
  SELF_ACCESS,
}

export type ComingSoonTypes =
  | 'Panic Alert'
  | 'Book Visitor'
  | 'Create Events'
  | 'Group Access'
  | 'Bills & Collections'
  | 'Buy Power'
  | 'Hire Artisan'
  | 'Poll & Election'
  | 'SESA Mall'
  | 'Insurance'
  | 'SESA Homes'
  | 'Self Access'
  | null;

export const allHubItems: HubItem[] = [
  {
    Icon: MaterialSymbolsSos,
    title: 'Panic Alert',
    color: colors.RED_100,
    bgColor: colors.RED_300,
    route: routes.PANIC_ALERT_SCREEN,
  },
  {
    Icon: MaterialSymbolsGroupAdd,
    title: 'Book Visitor',
    color: colors.GREEN_100,
    bgColor: colors.GREEN_110,
    route: routes.BOOK_VISITOR_SCREEN,
  },
  {
    Icon: MaterialSymbolsCalendarAddOn,
    title: 'Create Events',
    bgColor: colors.YELLOW_500,
    color: colors.YELLOW_100,
    route: routes.CREATE_EVENTS_SCREEN,
  },
  {
    Icon: MaterialSymbolsGroups,
    title: 'Group Access',
    bgColor: colors.BLUE_900,
    color: colors.BLUE_600,
    route: routes.GROUP_ACCESS_SCREEN,
  },
  {
    Icon: MaterialSymbolsPayments,
    altTitle: 'Bills & Collections',
    title: (
      <View style={{ width: '85%' }}>
        <AppText
          style={{
            fontFamily: fonts.INTER_600,
            color: colors.GRAY_100,
            fontSize: Size.calcAverage(13),
            textAlign: 'center',
          }}
        >
          Bills & Collections
        </AppText>
      </View>
    ),
    bgColor: colors.BLUE_900,
    color: colors.BLUE_200,
    route: routes.BILLS_AND_COLLECTIONS_SCREEN,
  },
  {
    Icon: MaterialSymbolsEmojiObjects,
    title: 'Buy Power',
    bgColor: colors.YELLOW_600,
    color: colors.YELLOW_300,
    route: routes.BUY_POWER_SCREEN,
  },
  {
    Icon: MaterialSymbolsHandyman,
    title: 'Hire Artisan',
    bgColor: colors.LIGHT_GRAY_200,
    color: colors.BLUE_110,
    // route: routes.HIRE_ARTISAN_SCREEN,
    route: null,
  },
  {
    Icon: MaterialSymbolsHowToVote,
    title: 'Poll & Election',
    bgColor: colors.BLUE_900,
    color: colors.BLACK_200,
    route: null,
  },
  {
    Icon: EmptyIcon,
    title: null,
    bgColor: colors.BLUE_900,
    color: colors.BLACK_200,
    route: null,
  },
  {
    Icon: MaterialSymbolsLocalMall,
    title: 'SESA Mall',
    bgColor: colors.GREEN_120,
    color: colors.GREEN_130,
    route: null,
  },
  {
    Icon: MaterialSymbolsShieldWithHeart,
    title: 'Insurance',
    bgColor: colors.GREEN_140,
    color: colors.GREEN_150,
    route: null,
  },
  {
    Icon: MaterialSymbolsBed,
    title: 'SESA Homes',
    bgColor: colors.GRAY_900,
    color: colors.PURPLE_100,
    route: null,
  },
  {
    Icon: MaterialSymbolsQrCodeScanner,
    title: 'Self Access',
    bgColor: colors.CYAN_200,
    color: colors.CYAN_100,
    route: null,
  },
];
