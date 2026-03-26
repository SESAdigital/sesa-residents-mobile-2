import { StyleSheet, TouchableOpacity, View } from 'react-native';

import AppAvatar from '@src/components/AppAvatar';
import AppText from '@src/components/AppText';
import {
  MaterialSymbolsChevronRightRounded,
  MaterialSymbolsLightBadgeOutlineRounded,
  MaterialSymbolsLightCalendarClockOutline,
  MaterialSymbolsLightEngineeringOutlineRounded,
  MaterialSymbolsLightGroupOutline,
  MaterialSymbolsLightStickyNote2OutlineRounded,
  MaterialSymbolsLightSupervisorAccountOutline,
  MdiLightArrowRight,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import Size from '@src/utils/useResponsiveSize';
import fonts from '@src/configs/fonts';
import { GetPropertyDetailsOccupantHistoryResData } from '@src/api/property-details.api';
import { dayJSFormatter } from '@src/utils/time';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';

interface Props {
  data: GetPropertyDetailsOccupantHistoryResData;
  onPress: () => void;
}

const OccupantHistoryRow = ({ data, onPress }: Props): React.JSX.Element => {
  const values = [
    {
      Icon: MaterialSymbolsLightGroupOutline,
      val: data?.totalAlphaCount?.toLocaleString(),
    },
    {
      Icon: MaterialSymbolsLightSupervisorAccountOutline,
      val: data?.totalDependentCount?.toLocaleString(),
    },
    {
      Icon: MaterialSymbolsLightStickyNote2OutlineRounded,
      val: data?.totalRFIDCount?.toLocaleString(),
    },
    {
      Icon: MaterialSymbolsLightBadgeOutlineRounded,
      val: data?.totalAccessCardCount?.toLocaleString(),
    },
  ];

  if (data?.totalSiteWorkerCount) {
    values?.push({
      Icon: MaterialSymbolsLightEngineeringOutlineRounded,
      val: data?.totalSiteWorkerCount?.toLocaleString(),
    });
  }

  const splittedName = data?.name?.split(' ');

  return (
    <View style={styles.container}>
      <AppAvatar
        firstWord={splittedName?.[0]}
        lastWord={splittedName?.[1] || data?.name?.[1]}
        size={Size.calcAverage(40)}
      />

      <TouchableOpacity onPress={onPress} style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          <AppText style={styles.title}>{data?.name}</AppText>
          <View style={styles.row}>
            <MaterialSymbolsLightCalendarClockOutline
              color={colors.GRAY_100}
              height={Size.calcAverage(16)}
              width={Size.calcAverage(16)}
            />

            <AppText style={styles.text}>
              {dayJSFormatter({
                format: 'MMM D, YYYY',
                value: data?.timeCreated,
              })}
            </AppText>

            <MdiLightArrowRight
              color={colors.GRAY_100}
              height={Size.calcAverage(16)}
              width={Size.calcAverage(16)}
            />
            <AppText style={styles.text}>
              {data?.timeDeparted
                ? dayJSFormatter({
                    format: 'MMM D, YYYY',
                    value: data?.timeDeparted,
                  })
                : 'Current'}
            </AppText>
          </View>

          <View style={styles.row2}>
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

export const OccupantHistoryRowLoader = (): React.JSX.Element => {
  const values = [
    MaterialSymbolsLightGroupOutline,
    MaterialSymbolsLightSupervisorAccountOutline,
    MaterialSymbolsLightStickyNote2OutlineRounded,
    MaterialSymbolsLightBadgeOutlineRounded,
  ];

  return (
    <View style={styles.container}>
      <AppAvatar isLoading size={Size.calcAverage(40)} />

      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          <AppSkeletonLoader width={Size.calcWidth(150)} />
          <View style={styles.row}>
            <MaterialSymbolsLightCalendarClockOutline
              color={colors.GRAY_100}
              height={Size.calcAverage(16)}
              width={Size.calcAverage(16)}
            />
            <AppSkeletonLoader width={Size.calcWidth(70)} />

            <MdiLightArrowRight
              color={colors.GRAY_100}
              height={Size.calcAverage(16)}
              width={Size.calcAverage(16)}
            />
            <AppSkeletonLoader width={Size.calcWidth(70)} />
          </View>

          <View style={styles.row2}>
            {values?.map((Icon, index) => (
              <View key={index} style={styles.row}>
                <Icon
                  color={colors.GRAY_100}
                  height={Size.calcAverage(16)}
                  width={Size.calcAverage(16)}
                />
                <AppSkeletonLoader width={Size.calcWidth(30)} />
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
      </View>
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

  row2: {
    gap: Size.calcAverage(12),
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
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
