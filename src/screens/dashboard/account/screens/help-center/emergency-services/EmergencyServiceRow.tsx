import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { GetEmergencyServicesResData } from '@src/api/helpCenter.api';
import AppAvatar from '@src/components/AppAvatar';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';
import AppText from '@src/components/AppText';
import {
  MaterialSymbolsCall,
  MaterialSymbolsChevronRightRounded,
  MaterialSymbolsLocationOn,
  MaterialSymbolsMail,
  MaterialSymbolsMoreHoriz,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';

interface Props {
  onPress: () => void;
  data: GetEmergencyServicesResData;
}

const EmergencyServiceRow = (props: Props): React.JSX.Element => {
  const { onPress, data } = props;
  const firstName = data?.name?.split(' ')[0];
  const lastName = data?.name?.split(' ')[1];

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <AppAvatar
        firstWord={firstName}
        lastWord={lastName}
        style={styles.profileImage}
      />
      <View style={styles.profileContainer}>
        <View style={styles.profileDetails}>
          <AppText style={styles.profileName}>{data?.name}</AppText>

          <View style={styles.row}>
            <View style={styles.row2}>
              <MaterialSymbolsCall
                height={Size.calcAverage(12)}
                width={Size.calcAverage(12)}
                color={colors.GRAY_100}
              />
              <AppText numberOfLines={1} style={styles.profileText}>
                {data?.phoneNumbers?.[0]}
              </AppText>
            </View>
            <View style={styles.row2}>
              <MaterialSymbolsLocationOn
                height={Size.calcAverage(12)}
                width={Size.calcAverage(12)}
                color={colors.GRAY_100}
              />
              <AppText numberOfLines={1} style={styles.profileText}>
                {data?.stateName}
              </AppText>
            </View>
          </View>

          <View style={styles.row2}>
            <MaterialSymbolsMail
              height={Size.calcAverage(14)}
              width={Size.calcAverage(14)}
              color={colors.GRAY_100}
            />
            <AppText style={styles.profileText}>{data?.email}</AppText>
          </View>
        </View>

        <MaterialSymbolsChevronRightRounded
          color={colors.GRAY_200}
          height={Size.calcAverage(24)}
          width={Size.calcAverage(24)}
        />
      </View>
    </TouchableOpacity>
  );
};

export const EmergencyServiceRowLoader = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <AppAvatar isLoading style={styles.profileImage} />
      <View style={styles.profileContainer}>
        <View style={styles.profileDetails}>
          <AppSkeletonLoader width={Size.calcWidth(200)} />

          <View style={styles.row}>
            <View style={styles.row2}>
              <MaterialSymbolsCall
                height={Size.calcAverage(12)}
                width={Size.calcAverage(12)}
                color={colors.GRAY_100}
              />
              <AppSkeletonLoader width={Size.calcWidth(80)} />
            </View>
            <View style={styles.row2}>
              <MaterialSymbolsLocationOn
                height={Size.calcAverage(14)}
                width={Size.calcAverage(14)}
                color={colors.GRAY_100}
              />
              <AppSkeletonLoader width={Size.calcWidth(80)} />
            </View>
          </View>

          <View style={styles.row2}>
            <MaterialSymbolsMail
              height={Size.calcAverage(14)}
              width={Size.calcAverage(14)}
              color={colors.GRAY_100}
            />
            <AppSkeletonLoader width={Size.calcWidth(150)} />
          </View>
        </View>

        <MaterialSymbolsMoreHoriz
          color={colors.GRAY_200}
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
    paddingTop: Size.calcHeight(12),
  },

  profileContainer: {
    flexDirection: 'row',
    borderBottomWidth: Size.calcWidth(1),
    alignItems: 'center',
    flex: 1,
    paddingBottom: Size.calcHeight(12),
    borderColor: colors.WHITE_300,
  },

  profileDetails: {
    rowGap: Size.calcHeight(6),
    flex: 1,
    paddingRight: Size.calcWidth(12),
  },

  profileImage: {
    height: Size.calcAverage(40),
    width: Size.calcAverage(40),
    borderRadius: Size.calcAverage(40),
  },

  profileName: {
    fontFamily: fonts.INTER_500,
    color: colors.BLACK_300,
  },

  profileText: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
  },

  row: {
    flexDirection: 'row',
    columnGap: Size.calcWidth(8),
    alignItems: 'center',
    rowGap: Size.calcHeight(6),
    flexWrap: 'wrap',
  },

  row2: {
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: Size.calcWidth(4),
  },
});
export default EmergencyServiceRow;
