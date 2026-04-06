import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { GetHouseholdStaffResData } from '@src/api/household.api';
import AppAvatar from '@src/components/AppAvatar';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';
import AppText from '@src/components/AppText';
import { MaterialSymbolsAccountCircleOutline } from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';
import AccessCardStatusMapper from '../../manage-access-cards/components/AccessCardStatusMapper';

interface Props {
  onPress?: () => void;
  data: GetHouseholdStaffResData;
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  showWorkDays?: boolean;
}

const HouseholdStaffRow = (props: Props): React.JSX.Element => {
  const { data, onPress, containerStyle, contentContainerStyle, showWorkDays } =
    props;

  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      style={[styles.container, containerStyle]}
    >
      <View style={styles.iconContainer}>
        <AppAvatar
          firstWord={data?.firstName}
          imageURL={data?.photo}
          lastWord={data?.lastName}
        />
      </View>
      <View style={[styles.contentContainer, contentContainerStyle]}>
        <View style={styles.content}>
          <View style={styles.row2}>
            <AppText style={styles.contentTitle}>
              {data?.firstName + ' ' + data?.lastName}
            </AppText>

            <AccessCardStatusMapper
              status={data?.status}
              statusText={data?.statusText}
            />
          </View>

          <View style={styles.row}>
            <MaterialSymbolsAccountCircleOutline
              height={Size.calcAverage(16)}
              width={Size.calcAverage(16)}
              color={colors.GRAY_100}
            />
            <AppText style={styles.text}>{data?.code}</AppText>
          </View>

          {showWorkDays && (
            <AppText style={styles.text}>Work Days: {data?.period}</AppText>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const HouseholdStaffRowLoader = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <AppAvatar isLoading />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <AppSkeletonLoader width={Size.calcWidth(100)} />
          <View style={styles.row2}>
            <View style={styles.row}>
              <MaterialSymbolsAccountCircleOutline
                height={Size.calcAverage(16)}
                width={Size.calcAverage(16)}
                color={colors.GRAY_100}
              />
              <AppSkeletonLoader width={Size.calcWidth(100)} />
            </View>
          </View>
          <AppSkeletonLoader width={Size.calcWidth(100)} />
        </View>
      </View>
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
    flex: 1,
  },

  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.WHITE_300,
    borderBottomWidth: Size.calcHeight(1),
    paddingBottom: Size.calcHeight(20),
    flexShrink: 1,
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

  pendingText: {
    fontFamily: fonts.INTER_500,
    color: colors.GRAY_200,
    fontSize: Size.calcAverage(12),
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

export default HouseholdStaffRow;
