import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { GetHouseholdRFIDsResData } from '@src/api/household.api';
import AppAvatar from '@src/components/AppAvatar';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';
import AppText from '@src/components/AppText';
import {
  MaterialSymbolsAccountCircleOutline,
  MaterialSymbolsChevronRightRounded,
  MaterialSymbolsDirectionsCarOutlineRounded,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';
import AccessCardStatusMapper from '../../manage-access-cards/components/AccessCardStatusMapper';

interface Props {
  onPress?: () => void;
  data: GetHouseholdRFIDsResData;
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const RFIDRow = (props: Props): React.JSX.Element => {
  const { data, onPress, containerStyle, contentContainerStyle } = props;

  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      style={[styles.container, containerStyle]}
    >
      <View style={styles.iconContainer}>
        <AppAvatar
          firstWord={data?.typeDescription?.[0]}
          lastWord={data?.typeDescription?.[1]}
          size={Size.calcAverage(40)}
          imageURL={data?.photo}
          style={{ borderRadius: Size.calcAverage(8) }}
        />
      </View>
      <View style={[styles.content, contentContainerStyle]}>
        <View style={styles.row2}>
          <AppText style={styles.contentTitle}>{data?.typeDescription}</AppText>
          <AccessCardStatusMapper
            status={data?.status}
            statusText={data?.statusDescription}
          />
        </View>
        <View style={styles.row2}>
          <View style={styles.row}>
            <MaterialSymbolsDirectionsCarOutlineRounded
              height={Size.calcAverage(16)}
              width={Size.calcAverage(16)}
              color={colors.GRAY_100}
            />
            <AppText style={styles.text}>{data?.rfidMake}</AppText>
          </View>

          <View style={styles.row}>
            <MaterialSymbolsAccountCircleOutline
              height={Size.calcAverage(16)}
              width={Size.calcAverage(16)}
              color={colors.GRAY_100}
            />
            <AppText style={styles.text}>{data?.registrationNumber}</AppText>
          </View>
        </View>
        <AppText style={styles.text}>S/N: {data?.serialNumber}</AppText>
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

export const RFIDRowLoader = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <AppAvatar
          loadingRadius={Size.calcAverage(8)}
          size={Size.calcAverage(40)}
          isLoading
        />
      </View>
      <View style={styles.content}>
        <AppSkeletonLoader width={Size.calcWidth(100)} />
        <AppSkeletonLoader width={Size.calcWidth(150)} />
        <AppSkeletonLoader width={Size.calcWidth(50)} />
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

export default RFIDRow;
