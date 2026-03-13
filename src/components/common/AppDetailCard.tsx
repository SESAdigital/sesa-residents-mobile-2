import { StyleSheet, View } from 'react-native';

import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';
import AppText from '../AppText';
import AppSkeletonLoader from '../AppSkeletonLoader';

export type AppDetailCardDetailItem = {
  title: string;
  value: string;
  skipLoading?: boolean;
  isCopy?: boolean;
}[][];

interface Props {
  detailList: AppDetailCardDetailItem;
  isLoading?: boolean;
}

const AppDetailCard = ({ detailList, isLoading }: Props): React.JSX.Element => {
  return (
    <View style={styles.detailContainer}>
      {detailList.map((item, firstIndex) => (
        <View style={styles.detailItemRow} key={firstIndex}>
          {item?.map((detail, secondIndex) => {
            if (!isLoading && !detail?.value) return null;
            if (isLoading && detail?.skipLoading) return null;
            return (
              <View style={styles.detailItem} key={secondIndex}>
                <View
                  style={[
                    { width: '100%' },
                    isLoading && { rowGap: Size.calcHeight(5) },
                  ]}
                >
                  <AppText style={styles.detailItemTitle}>
                    {detail?.title}
                  </AppText>
                  {isLoading ? (
                    <AppSkeletonLoader width="45%" />
                  ) : (
                    <AppText style={styles.detailItemValue}>
                      {detail?.value || '--'}
                    </AppText>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    borderWidth: Size.calcAverage(1),
    borderColor: colors.WHITE_300,
    shadowColor: colors.GRAY_600,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    backgroundColor: colors.WHITE_200,
    borderRadius: Size.calcAverage(12),
  },

  detailItem: {
    paddingHorizontal: Size.calcWidth(20),
    paddingVertical: Size.calcHeight(15),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRightWidth: Size.calcWidth(1),
    borderColor: colors.WHITE_300,
  },

  detailItemRow: {
    borderBottomWidth: Size.calcHeight(1),
    borderColor: colors.WHITE_300,
    flexDirection: 'row',
  },

  detailItemTitle: {
    color: colors.GRAY_300,
    fontSize: Size.calcAverage(12),
  },

  detailItemValue: {
    fontFamily: fonts.INTER_500,
  },
});

export default AppDetailCard;
