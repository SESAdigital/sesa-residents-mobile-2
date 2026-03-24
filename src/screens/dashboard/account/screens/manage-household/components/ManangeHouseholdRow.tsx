import { StyleSheet, TouchableOpacity, View } from 'react-native';

import AppText from '@src/components/AppText';
import {
  MaterialSymbolsCheckRounded,
  MaterialSymbolsChevronRightRounded,
  MaterialSymbolsHome,
  MaterialSymbolsLightBadgeOutlineRounded,
  MaterialSymbolsLightEngineeringOutlineRounded,
  MaterialSymbolsLightGroupOutline,
} from '@src/components/icons';
import { DependentIcon, RFIDIcon } from '@src/components/icons/custom';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';
import { GetHouseholdPropertiesResData } from '@src/api/household.api';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';
import { mapPropertyCategoryTypeToShortCharacter } from '@src/api/constants/data';

interface Props {
  data: GetHouseholdPropertiesResData;
  onPress: () => void;
}

const ManangeHouseholdRow = ({ data, onPress }: Props): React.JSX.Element => {
  const listData = [
    {
      Icon: MaterialSymbolsLightGroupOutline,
      value: data?.totalAlphaCount?.toLocaleString(),
    },
    {
      Icon: DependentIcon,
      value: data?.totalDependentCount?.toLocaleString(),
    },
    {
      Icon: RFIDIcon,
      value: data?.totalAccessCardCount?.toLocaleString(),
    },
    {
      Icon: MaterialSymbolsLightBadgeOutlineRounded,
      value: data?.totalAccessCardCount?.toLocaleString(),
    },
  ];

  if (data?.totalSiteWorkerCount) {
    listData?.push({
      Icon: MaterialSymbolsLightEngineeringOutlineRounded,
      value: data?.totalSiteWorkerCount?.toLocaleString(),
    });
  }

  const getIconSize = (index: number) => {
    if (index === 0) {
      return Size.calcAverage(21);
    }
    if (index === 1) {
      return Size.calcAverage(17);
    }
    if (index === 2) {
      return Size.calcAverage(13);
    }
    return Size.calcAverage(20);
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.propertyIconContainer}>
        <MaterialSymbolsHome
          height={Size.calcAverage(24)}
          width={Size.calcAverage(24)}
          color={colors.WHITE_200}
        />
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          <AppText style={styles.propertyType}>
            {data?.propertyTypeName} (
            {mapPropertyCategoryTypeToShortCharacter(data?.propertyCategory)})
          </AppText>
          <AppText style={styles.propertyAddress}>
            {data?.name && (
              <AppText style={styles.propertyName}>{data?.name}</AppText>
            )}
            {data?.name ? ` (${data?.address})` : data?.address}
          </AppText>

          {data?.isVacant ? (
            <View style={styles.listDataContainer}>
              <View style={styles.row}>
                <MaterialSymbolsCheckRounded
                  color={colors.GREEN_100}
                  height={Size.calcAverage(20)}
                  width={Size.calcAverage(20)}
                />
                <AppText
                  style={[styles.textValue, { color: colors.GREEN_100 }]}
                >
                  Vacant
                </AppText>
              </View>
            </View>
          ) : (
            <View style={styles.listDataContainer}>
              {listData?.map(({ Icon, value }, index) => (
                <View key={index} style={styles.row}>
                  <Icon
                    color={colors.GRAY_100}
                    height={getIconSize(index)}
                    width={getIconSize(index)}
                  />
                  <AppText style={styles.textValue}>{value}</AppText>
                </View>
              ))}
            </View>
          )}
        </View>
        <MaterialSymbolsChevronRightRounded
          color={colors.BLACK_100}
          height={Size.calcAverage(24)}
          width={Size.calcAverage(24)}
        />
      </View>
    </TouchableOpacity>
  );
};

export const ManangeHouseholdRowLoader = (): React.JSX.Element => {
  const listData = [
    MaterialSymbolsLightGroupOutline,
    DependentIcon,
    RFIDIcon,
    MaterialSymbolsLightBadgeOutlineRounded,
  ];

  const getIconSize = (index: number) => {
    if (index === 0) {
      return Size.calcAverage(21);
    }
    if (index === 1) {
      return Size.calcAverage(17);
    }
    if (index === 2) {
      return Size.calcAverage(13);
    }
    return Size.calcAverage(20);
  };

  return (
    <View style={styles.container}>
      <View style={styles.propertyIconContainer}>
        <MaterialSymbolsHome
          height={Size.calcAverage(24)}
          width={Size.calcAverage(24)}
          color={colors.WHITE_200}
        />
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          <AppText style={styles.propertyType}>
            <AppSkeletonLoader width={Size.calcWidth(100)} />
          </AppText>
          <View style={styles.propertyAddress}>
            <AppSkeletonLoader width={Size.calcWidth(150)} />
          </View>

          <View style={styles.listDataContainer}>
            {listData?.map((Icon, index) => (
              <View key={index} style={styles.row}>
                <Icon
                  color={colors.GRAY_100}
                  height={getIconSize(index)}
                  width={getIconSize(index)}
                />
                <AppSkeletonLoader width={Size.calcWidth(30)} />
              </View>
            ))}
          </View>
        </View>
        <MaterialSymbolsChevronRightRounded
          color={colors.BLACK_100}
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
    columnGap: Size.calcWidth(12),
    paddingHorizontal: Size.calcWidth(21),
    paddingTop: Size.calcHeight(14),
  },

  contentContainer: {
    flexShrink: 1,
    paddingRight: Size.calcWidth(12),
  },

  propertyAddress: {
    paddingVertical: Size.calcHeight(5),
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
  },

  propertyIconContainer: {
    backgroundColor: colors.BLUE_200,
    padding: Size.calcAverage(8),
    borderRadius: Size.calcAverage(36),
    marginBottom: 'auto',
  },
  propertyName: {
    fontSize: Size.calcAverage(12),
    color: colors.BLACK_100,
    fontFamily: fonts.INTER_500,
  },

  propertyType: {
    fontFamily: fonts.INTER_500,
    fontSize: Size.calcAverage(12),
  },

  listDataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Size.calcAverage(12),
    flexWrap: 'wrap',
  },

  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: Size.calcHeight(1),
    borderBottomColor: colors.WHITE_300,
    paddingBottom: Size.calcHeight(14),
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Size.calcAverage(4),
  },

  textValue: {
    color: colors.GRAY_100,
    fontFamily: fonts.INTER_500,
    fontSize: Size.calcAverage(12),
  },
});

export default ManangeHouseholdRow;
