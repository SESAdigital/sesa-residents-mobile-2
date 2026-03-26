import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

import {
  HouseholdActivityType,
  HouseholdActivityTypeData,
} from '@src/api/constants/default';
import {
  MaterialSymbolsAddRounded,
  MaterialSymbolsBadgeRounded,
  MaterialSymbolsGroups,
  MaterialSymbolsHomeRounded,
  MaterialSymbolsHorizontalRuleRounded,
  MaterialSymbolsPentagonRounded,
  MaterialSymbolsStickyNote2Rounded,
  MaterialSymbolsSupervisorAccountRounded,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import Size from '@src/utils/useResponsiveSize';

interface Props {
  containerStyles?: StyleProp<ViewStyle>;
  size?: number;
  type: HouseholdActivityType;
}

const HouseHoldActivityIconTypeMapper = (props: Props): React.JSX.Element => {
  const { containerStyles, size = 40, type } = props;

  const { Icon, variant } = getBasicConfiguration(type);
  const { SubIcon, backgroundColor, color, iconColor } =
    getVariantConfig(variant);
  return (
    <View
      style={[
        styles.container,
        {
          height: Size.calcAverage(size),
          width: Size.calcAverage(size),
          borderRadius: Size.calcAverage(size),
          backgroundColor,
        },
        containerStyles,
      ]}
    >
      <Icon
        height={Size.calcAverage(size / 2)}
        color={iconColor}
        width={Size.calcAverage(size / 2)}
      />
      <View style={[styles.subIcon, { borderColor: backgroundColor }]}>
        <SubIcon
          height={Size.calcAverage(size / 4)}
          color={color}
          width={Size.calcAverage(size / 4)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Size.calcAverage(40),
    backgroundColor: colors.WHITE_300,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  subIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.WHITE_200,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: Size.calcAverage(1),
    height: Size.calcAverage(18),
    width: Size.calcAverage(18),
  },
});

export default HouseHoldActivityIconTypeMapper;

type Variant = 'DANGER' | 'SUCCESS' | 'DEFAULT';

function getVariantConfig(variant: Variant) {
  if (variant === 'SUCCESS') {
    return {
      backgroundColor: colors.GREEN_160,
      iconColor: colors.GREEN_300,
      color: colors.GREEN_100,
      SubIcon: MaterialSymbolsAddRounded,
    };
  }
  if (variant === 'DANGER') {
    return {
      backgroundColor: colors.RED_300,
      iconColor: colors.RED_100,
      color: colors.RED_100,
      SubIcon: MaterialSymbolsHorizontalRuleRounded,
    };
  }

  return {
    backgroundColor: colors.WHITE_300,
    iconColor: colors.GRAY_100,
    color: colors.GRAY_100,
    SubIcon: MaterialSymbolsPentagonRounded,
  };
}

interface GetBasicConfiguration {
  variant: Variant;
  Icon: (val: SvgProps) => React.JSX.Element;
}

const greenRfid: HouseholdActivityType[] = [
  HouseholdActivityTypeData.RFIDActivated,
  HouseholdActivityTypeData.RFIDAdded,
  HouseholdActivityTypeData.RFIDUpdated,
  HouseholdActivityTypeData.MTAGAdded,
  HouseholdActivityTypeData.MTAGActivated,
  HouseholdActivityTypeData.MTAGUpdated,
];

const redRfid: HouseholdActivityType[] = [
  HouseholdActivityTypeData.RFIDRemoved,
  HouseholdActivityTypeData.RFIDDeactivated,
  HouseholdActivityTypeData.MTAGRemoved,
  HouseholdActivityTypeData.MTAGDeactivated,
];

const greenAccessCard: HouseholdActivityType[] = [
  HouseholdActivityTypeData.AccessCardActivated,
  HouseholdActivityTypeData.AccessCardAdded,
  HouseholdActivityTypeData.AccessCardUpdated,
];

const redAccessCard: HouseholdActivityType[] = [
  HouseholdActivityTypeData.AccessCardRemoved,
  HouseholdActivityTypeData.AccessCardDeactivated,
];

const redOccupant: HouseholdActivityType[] = [
  HouseholdActivityTypeData.OccupantRemoved,
  HouseholdActivityTypeData.HouseholdOccupantRemoved,
  HouseholdActivityTypeData.HouseholdOccupantDeparted,
  HouseholdActivityTypeData.DependentOccupantDeactivated,
];

const greenOccupant: HouseholdActivityType[] = [
  HouseholdActivityTypeData.OccupantAdded,
  HouseholdActivityTypeData.DependentOccupantActivated,
];

const greenHousehold: HouseholdActivityType[] = [
  HouseholdActivityTypeData.HouseholdCreated,
  HouseholdActivityTypeData.HouseholdUpdated,
  HouseholdActivityTypeData.HouseholdActivated,
];

const redHousehold: HouseholdActivityType[] = [
  HouseholdActivityTypeData.HouseholdDeactivated,
  HouseholdActivityTypeData.HouseholdClosed,
];
//   HouseholdActivityTypeData.AlphaOccupantAdded,
//   HouseholdActivityTypeData.AlphaOccupantRemoved,

function getBasicConfiguration(
  val: HouseholdActivityType,
): GetBasicConfiguration {
  if (greenRfid.includes(val)) {
    return {
      variant: 'SUCCESS',
      Icon: MaterialSymbolsStickyNote2Rounded,
    };
  }

  if (redRfid.includes(val)) {
    return {
      variant: 'DANGER',
      Icon: MaterialSymbolsStickyNote2Rounded,
    };
  }

  if (greenAccessCard.includes(val)) {
    return {
      variant: 'SUCCESS',
      Icon: MaterialSymbolsBadgeRounded,
    };
  }

  if (redAccessCard.includes(val)) {
    return {
      variant: 'DANGER',
      Icon: MaterialSymbolsBadgeRounded,
    };
  }

  if (greenOccupant.includes(val)) {
    return {
      variant: 'SUCCESS',
      Icon: MaterialSymbolsSupervisorAccountRounded,
    };
  }

  if (redOccupant.includes(val)) {
    return {
      variant: 'DANGER',
      Icon: MaterialSymbolsSupervisorAccountRounded,
    };
  }

  if (greenHousehold.includes(val)) {
    return {
      variant: 'SUCCESS',
      Icon: MaterialSymbolsHomeRounded,
    };
  }

  if (redHousehold.includes(val)) {
    return {
      variant: 'DANGER',
      Icon: MaterialSymbolsHomeRounded,
    };
  }

  if (val === HouseholdActivityTypeData.AlphaOccupantAdded) {
    return {
      variant: 'SUCCESS',
      Icon: MaterialSymbolsGroups,
    };
  }
  if (val === HouseholdActivityTypeData.AlphaOccupantRemoved) {
    return {
      variant: 'DANGER',
      Icon: MaterialSymbolsGroups,
    };
  }

  return {
    variant: 'DEFAULT',
    Icon: MaterialSymbolsHorizontalRuleRounded,
  };
}
