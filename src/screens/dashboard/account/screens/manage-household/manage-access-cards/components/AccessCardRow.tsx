import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { GetHouseholdAccessCardsResData } from '@src/api/household.api';
import AppText from '@src/components/AppText';
import {
  MaterialSymbolsAccountCircle,
  MaterialSymbolsCall,
  MaterialSymbolsChevronRightRounded,
  MaterialSymbolsLightBadgeOutlineRounded,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';
import AccessCardStatusMapper from './AccessCardStatusMapper';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';

interface Props {
  onPress?: () => void;
  data: GetHouseholdAccessCardsResData;
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const AccessCardRow = (props: Props): React.JSX.Element => {
  const { data, onPress, containerStyle, contentContainerStyle } = props;

  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      style={[styles.container, containerStyle]}
    >
      <View style={styles.iconContainer}>
        <MaterialSymbolsLightBadgeOutlineRounded
          height={Size.calcAverage(24)}
          width={Size.calcAverage(24)}
          color={colors.GRAY_100}
        />
      </View>
      <View style={[styles.content, contentContainerStyle]}>
        <View style={styles.row2}>
          <AppText style={styles.contentTitle}>{data?.serialNumber}</AppText>
          <AccessCardStatusMapper
            status={data?.status}
            statusText={data?.statusDescription}
          />
        </View>
        <View style={styles.row2}>
          <View style={styles.row}>
            <MaterialSymbolsAccountCircle
              height={Size.calcAverage(16)}
              width={Size.calcAverage(16)}
              color={colors.GRAY_100}
            />
            <AppText style={styles.text}>{data?.holderName}</AppText>
          </View>

          <View style={styles.row}>
            <MaterialSymbolsCall
              height={Size.calcAverage(16)}
              width={Size.calcAverage(16)}
              color={colors.GRAY_100}
            />
            <AppText style={styles.text}>{data?.phoneNumber}</AppText>
          </View>
        </View>
      </View>
      {!!onPress && (
        <MaterialSymbolsChevronRightRounded
          height={Size.calcAverage(24)}
          width={Size.calcAverage(24)}
          color={colors.GRAY_100}
        />
      )}
    </TouchableOpacity>
  );
};

export const AccessCardRowLoader = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialSymbolsLightBadgeOutlineRounded
          height={Size.calcAverage(24)}
          width={Size.calcAverage(24)}
          color={colors.GRAY_100}
        />
      </View>
      <View style={styles.content}>
        <AppSkeletonLoader width={Size.calcWidth(100)} />
        <AppSkeletonLoader width={Size.calcWidth(150)} />
      </View>
      <MaterialSymbolsChevronRightRounded
        height={Size.calcAverage(24)}
        width={Size.calcAverage(24)}
        color={colors.GRAY_100}
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

  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: Size.calcAverage(8),
  },

  text: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
  },
});

export default AccessCardRow;
