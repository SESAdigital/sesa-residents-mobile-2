import { StyleSheet, TouchableOpacity, View } from 'react-native';

import AppAvatar from '@src/components/AppAvatar';
import AppText from '@src/components/AppText';
import {
  MaterialSymbolsChevronRightRounded,
  MaterialSymbolsLightBadgeOutlineRounded,
  MaterialSymbolsLightCalendarClockOutline,
  MaterialSymbolsLightGroupOutline,
  MdiLightArrowRight,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import Size from '@src/utils/useResponsiveSize';
import fonts from '@src/configs/fonts';
import { GetPropertyDetailsOccupantHistoryResData } from '@src/api/property-details.api';

interface Props {
  data: GetPropertyDetailsOccupantHistoryResData;
}

const OccupantHistoryRow = ({ data }: Props): React.JSX.Element => {
  const handleView = () => {};

  const values = [
    {
      Icon: MaterialSymbolsLightGroupOutline,
      val: data?.totalAlphaCount?.toLocaleString(),
    },
    {
      Icon: MaterialSymbolsLightGroupOutline,
      val: data?.totalDependentCount?.toLocaleString(),
    },
    {
      Icon: MaterialSymbolsLightBadgeOutlineRounded,
      val: data?.totalRFIDCount?.toLocaleString(),
    },
    {
      Icon: MaterialSymbolsLightBadgeOutlineRounded,
      val: data?.totalAccessCardCount?.toLocaleString(),
    },
  ];

  return (
    <View style={styles.container}>
      <AppAvatar />

      <TouchableOpacity
        onPress={() => handleView()}
        style={styles.mainContainer}
      >
        <View style={styles.contentContainer}>
          <AppText style={styles.title}>{data?.name}</AppText>
          <View style={styles.row}>
            <MaterialSymbolsLightCalendarClockOutline
              color={colors.GRAY_100}
              height={Size.calcAverage(16)}
              width={Size.calcAverage(16)}
            />

            <AppText>{data?.timeCreated}</AppText>

            <MdiLightArrowRight
              color={colors.GRAY_100}
              height={Size.calcAverage(16)}
              width={Size.calcAverage(16)}
            />
            <AppText style={styles.text}>{data?.timeDeparted}</AppText>
          </View>

          <View style={[styles.row, { gap: Size.calcAverage(12) }]}>
            {values?.map(({ Icon, val }, index) => (
              <View key={index} style={styles.row}>
                <Icon
                  color={colors.GRAY_100}
                  height={Size.calcAverage(16)}
                  width={Size.calcAverage(16)}
                />
                <AppText style={styles.textValue}>{val}</AppText>
              </View>
            ))}
          </View>
        </View>
        <MaterialSymbolsChevronRightRounded
          color={colors.BLACK_100}
          style={{ marginLeft: 'auto' }}
          height={Size.calcAverage(24)}
          width={Size.calcAverage(24)}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Size.calcWidth(20),
  },

  contentContainer: {
    paddingHorizontal: Size.calcWidth(12),
    paddingVertical: Size.calcHeight(14),
    width: '90%',
    rowGap: Size.calcHeight(5),
    flexShrink: 1,
  },

  mainContainer: {
    flex: 1,
    paddingVertical: Size.calcHeight(13),
    borderBottomWidth: Size.calcHeight(1),
    borderBottomColor: colors.WHITE_300,
    flexDirection: 'row',
    flexShrink: 1,
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Size.calcAverage(4),
  },

  text: {
    color: colors.GRAY_100,
    fontSize: Size.calcAverage(12),
  },

  textValue: {
    color: colors.GRAY_100,
    fontFamily: fonts.INTER_500,
    fontSize: Size.calcAverage(12),
  },

  title: {
    fontFamily: fonts.INTER_500,
    fontSize: Size.calcAverage(12),
  },
});

export default OccupantHistoryRow;
