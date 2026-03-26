import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { GetPropertyDetailsHouseholdActivityResData } from '@src/api/property-details.api';
import AppText from '@src/components/AppText';
import {
  MaterialSymbolsCalendarTodayRounded,
  MaterialSymbolsChevronRightRounded,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';
import HouseHoldActivityIconTypeMapper from './HouseHoldActivityIconTypeMapper';
import { dayJSFormatter } from '@src/utils/time';

interface Props {
  onPress: () => void;
  data: GetPropertyDetailsHouseholdActivityResData;
}

const HouseholdActivityRow = ({ data, onPress }: Props): React.JSX.Element => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <HouseHoldActivityIconTypeMapper
        type={data?.activity}
        containerStyles={{ marginBottom: 'auto' }}
      />

      <View style={styles.content}>
        <AppText style={styles.contentTitle}>{data?.status}</AppText>

        <View style={styles.row}>
          <MaterialSymbolsCalendarTodayRounded
            height={Size.calcAverage(16)}
            width={Size.calcAverage(16)}
            color={colors.GRAY_100}
          />
          <AppText style={styles.text}>
            {dayJSFormatter({
              value: data?.timeCreated,
              format: 'MMM D, YYYY h:mm A',
              shouldNotLocalize: true,
            })}
          </AppText>
        </View>
      </View>

      <MaterialSymbolsChevronRightRounded
        height={Size.calcAverage(24)}
        width={Size.calcAverage(24)}
        color={colors.GRAY_100}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Size.calcWidth(21),
    paddingTop: Size.calcHeight(20),
    columnGap: Size.calcWidth(12),
  },

  content: {
    rowGap: Size.calcHeight(4),
    paddingBottom: Size.calcHeight(20),
    flexShrink: 1,
    flex: 1,
    borderColor: colors.WHITE_300,
    borderBottomWidth: Size.calcHeight(1),
  },

  contentTitle: {
    fontFamily: fonts.INTER_500,
    color: colors.BLACK_300,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Size.calcAverage(4),
  },

  text: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
  },
});

export default HouseholdActivityRow;
