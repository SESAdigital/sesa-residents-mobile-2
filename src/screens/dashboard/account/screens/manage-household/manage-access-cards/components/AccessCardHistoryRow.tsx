import { StyleSheet, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

import {
  AccessEntryType,
  AccessEntryTypeData,
} from '@src/api/constants/default';
import { GetHouseholdRFIDsHistoryResData } from '@src/api/household.api';
import AppText from '@src/components/AppText';
import {
  MaterialSymbolsHorizontalRuleRounded,
  MaterialSymbolsShieldPersonRounded,
  MdiLightArrowLeft,
  MdiLightArrowRight,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';
import DuplicateLoader from '@src/components/DuplicateLoader';
import TransactionIconMapper from '@src/screens/dashboard/transactions/components/TransactionIconMapper';

interface Props {
  data: GetHouseholdRFIDsHistoryResData;
}

const AccessCardHistoryRow = ({ data }: Props): React.JSX.Element => {
  return (
    <View>
      <View style={styles.dateContainer}>
        <AppText style={styles.date}>{data?.timeCreated}</AppText>
      </View>
      {data?.accessEntryDatas?.map((value, key) => {
        const { entryTime, entryType, entryTypeDescription, guardName } = value;
        const { Icon, color, bgColor, iconColor } = getConfig(entryType);

        return (
          <View style={styles.container} key={key}>
            <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
              <Icon
                height={Size.calcAverage(20)}
                width={Size.calcAverage(20)}
                color={iconColor}
              />
            </View>
            <View style={styles.content}>
              <View style={styles.contentContainer}>
                <AppText style={styles.contentTitle}>
                  {entryTypeDescription}
                </AppText>

                <View style={styles.row}>
                  <MaterialSymbolsShieldPersonRounded
                    height={Size.calcAverage(16)}
                    width={Size.calcAverage(16)}
                    color={color}
                  />
                  <AppText style={[styles.text, { color }]}>
                    {guardName}
                  </AppText>
                </View>
              </View>

              <View style={styles.row}>
                <MdiLightArrowRight
                  height={Size.calcAverage(20)}
                  width={Size.calcAverage(20)}
                  color={colors.GREEN_100}
                />
                <AppText style={styles.time}>{entryTime}</AppText>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export const AccessCardHistoryRowLoader = (): React.JSX.Element => {
  return (
    <View>
      <View style={styles.dateContainer}>
        <AppSkeletonLoader width="40%" />
      </View>

      <DuplicateLoader
        loader={
          <View style={styles.container}>
            <TransactionIconMapper isLoading />

            <View style={styles.content}>
              <View style={styles.contentContainer}>
                <AppSkeletonLoader width="70%" />
                <AppSkeletonLoader width="90%" />
              </View>

              <AppSkeletonLoader
                style={{ marginLeft: 'auto', marginRight: Size.calcWidth(21) }}
                width={Size.calcWidth(80)}
              />
            </View>
          </View>
        }
      />
    </View>
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
    paddingBottom: Size.calcHeight(20),
    flex: 1,
    flexShrink: 1,
    borderColor: colors.WHITE_300,
    borderBottomWidth: Size.calcHeight(1),
    flexDirection: 'row',
    columnGap: Size.calcWidth(4),
  },

  contentContainer: {
    rowGap: Size.calcHeight(4),
    flex: 1,
  },

  contentTitle: {
    fontFamily: fonts.INTER_500,
    color: colors.BLACK_300,
  },

  date: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
    fontFamily: fonts.INTER_500,
  },

  dateContainer: {
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(8),
    borderBottomWidth: Size.calcWidth(1),
    borderTopWidth: Size.calcWidth(1),
    borderColor: colors.WHITE_300,
  },

  iconContainer: {
    width: Size.calcAverage(40),
    height: Size.calcAverage(40),
    borderRadius: Size.calcAverage(40),
    backgroundColor: colors.WHITE_300,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 'auto',
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

  time: {
    fontFamily: fonts.INTER_600,
    color: colors.GREEN_100,
    fontSize: Size.calcAverage(12),
  },
});

export default AccessCardHistoryRow;

interface Config {
  Icon: (val: SvgProps) => React.JSX.Element;
  color: string;
  bgColor: string;
  iconColor: string;
}

function getConfig(type: AccessEntryType): Config {
  if (type === AccessEntryTypeData.CheckIn) {
    return {
      Icon: MdiLightArrowRight,
      color: colors.GREEN_100,
      bgColor: colors.GREEN_160,
      iconColor: colors.GREEN_600,
    };
  }
  if (type === AccessEntryTypeData.CheckOut) {
    return {
      Icon: MdiLightArrowLeft,
      color: colors.RED_100,
      bgColor: colors.RED_300,
      iconColor: colors.RED_100,
    };
  }

  return {
    Icon: MaterialSymbolsHorizontalRuleRounded,
    color: colors.GRAY_100,
    bgColor: colors.WHITE_300,
    iconColor: colors.WHITE_300,
  };
}
