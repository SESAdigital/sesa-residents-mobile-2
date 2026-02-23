import { StyleSheet, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { GetAccessHistoryData } from '@src/api/auth.api';
import {
  AccessEntryType,
  AccessEntryTypeData,
} from '@src/api/constants/default';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';
import AppText from '@src/components/AppText';
import DuplicateLoader from '@src/components/DuplicateLoader';
import {
  MaterialSymbolsHorizontalRuleRounded,
  MdiLightArrowLeft,
  MdiLightArrowRight,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';
import TransactionIconMapper from '../../transactions/components/TransactionIconMapper';

interface Props {
  val: GetAccessHistoryData;
}

const AccessHistoryRow = ({ val }: Props): React.JSX.Element => {
  return (
    <View>
      <View style={styles.dateContainer}>
        <AppText style={styles.date}>{val?.timeCreated}</AppText>
      </View>
      {val?.accessEntryDatas?.map((entryData, index) => {
        const { bgColor, color, textColor, Icon } = mapStatusDetails(
          entryData?.entryType,
        );
        return (
          <View style={styles.container} key={index}>
            <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
              <Icon
                height={Size.calcHeight(26)}
                width={Size.calcHeight(26)}
                color={color}
              />
            </View>

            <View style={styles.contentContainer}>
              <View style={styles.descriptionContainer}>
                <AppText style={styles.title}>
                  {entryData?.residentName}
                </AppText>
                <AppText style={styles.guardName}>
                  {entryData?.guardName}
                </AppText>
              </View>
              <View style={styles.timeContainer}>
                <Icon
                  height={Size.calcHeight(26)}
                  width={Size.calcHeight(26)}
                  color={color}
                />
                <AppText style={[styles.time, { color: textColor }]}>
                  {entryData?.entryTime}
                </AppText>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export const AccessHistoryRowLoader = (): React.JSX.Element => {
  return (
    <View>
      <View style={styles.dateContainer}>
        <AppSkeletonLoader width="40%" />
      </View>

      <DuplicateLoader
        loader={
          <View style={styles.container}>
            <TransactionIconMapper isLoading />

            <View style={styles.contentContainer}>
              <View style={styles.descriptionContainer}>
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
    paddingLeft: Size.calcWidth(18),
  },

  contentContainer: {
    flex: 1,
    paddingVertical: Size.calcHeight(13),
    borderBottomWidth: Size.calcHeight(1),
    borderBottomColor: colors.WHITE_300,
    flexDirection: 'row',
    flexShrink: 1,
    alignItems: 'center',
  },

  date: {
    fontSize: Size.calcAverage(12),
    fontFamily: fonts.INTER_500,
    color: colors.GRAY_100,
  },

  dateContainer: {
    borderTopWidth: Size.calcHeight(0.5),
    borderBottomWidth: Size.calcHeight(0.5),
    borderColor: colors.LIGHT_GRAY_200,
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(8),
  },

  descriptionContainer: {
    paddingHorizontal: Size.calcWidth(12),
    width: '60%',
    rowGap: Size.calcHeight(4),
    flexShrink: 1,
  },

  guardName: {
    color: colors.GRAY_100,
    fontSize: Size.calcAverage(12),
  },

  iconContainer: {
    backgroundColor: colors.WHITE_300,
    height: Size.calcAverage(40),
    aspectRatio: 1,
    borderRadius: Size.calcAverage(40),
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontFamily: fonts.INTER_500,
    color: colors.BLACK_300,
  },

  time: {
    paddingLeft: Size.calcWidth(3),
    fontSize: Size.calcAverage(12),
    fontFamily: fonts.INTER_600,
  },
  timeContainer: {
    paddingRight: Size.calcWidth(18),
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AccessHistoryRow;

interface StatusDetails {
  bgColor: string;
  color: string;
  textColor: string;
  Icon: (val: SvgProps) => React.JSX.Element;
}

function mapStatusDetails(status: AccessEntryType): StatusDetails {
  if (status === AccessEntryTypeData.CheckIn) {
    return {
      bgColor: colors.GREEN_160,
      color: colors.GREEN_600,
      textColor: colors.GREEN_100,
      Icon: MdiLightArrowRight,
    };
  }
  if (status === AccessEntryTypeData.CheckOut) {
    return {
      bgColor: colors.RED_300,
      color: colors.RED_100,
      textColor: colors.RED_100,
      Icon: MdiLightArrowLeft,
    };
  }

  return {
    bgColor: colors.WHITE_300,
    color: colors.GRAY_100,
    textColor: colors.GRAY_100,
    Icon: MaterialSymbolsHorizontalRuleRounded,
  };
}
