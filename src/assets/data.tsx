import { JSX } from 'react';
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
  MaterialSymbolsShieldWithHeart,
  MaterialSymbolsSos,
} from '@src/components/icons';
import { EmptyIcon } from '@src/components/icons/custom';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';
import { View } from 'react-native';
import routes from '@src/navigation/routes';

interface HubItem {
  Icon: (props: SvgProps) => JSX.Element;
  title: string | JSX.Element;
  color: string;
  bgColor: string;
  route: string | null;
}

enum HubItemEnum {
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
}

const allHubItems: HubItem[] = [
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
    route: routes.HIRE_ARTISAN_SCREEN,
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
    title: '',
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
];

export const quickActions: HubItem[] = allHubItems.slice(0, 4);

interface HubData {
  title: string;
  sections: HubItem[][];
}

export const myHubData: HubData[] = [
  {
    title: 'General',
    sections: [
      [
        allHubItems[HubItemEnum.BOOK_VISITOR],
        allHubItems[HubItemEnum.CREATE_EVENTS],
        allHubItems[HubItemEnum.GROUP_ACCESS],
      ],
      [
        allHubItems[HubItemEnum.BILLS_AND_COLLECTIONS],
        allHubItems[HubItemEnum.BUY_POWER],
        allHubItems[HubItemEnum.EMPTY_ITEM],
      ],
    ],
  },

  {
    title: 'Others',
    sections: [
      [
        allHubItems[HubItemEnum.PANIC_ALERT],
        allHubItems[HubItemEnum.HIRE_ARTISAN],
        allHubItems[HubItemEnum.POLL_AND_ELECTION],
      ],
    ],
  },
  {
    title: 'Coming Soon',
    sections: [
      [
        allHubItems[HubItemEnum.SESA_MALL],
        allHubItems[HubItemEnum.INSURANCE],
        allHubItems[HubItemEnum.SESA_HOMES],
      ],
    ],
  },
];
