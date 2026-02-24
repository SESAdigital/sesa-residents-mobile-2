import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import AppAvatar from '@src/components/AppAvatar';
import AppText from '@src/components/AppText';
import {
  MaterialSymbolsAccountCircle,
  MaterialSymbolsCall,
  MaterialSymbolsMail,
  MaterialSymbolsQrCode,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useGetUserDetails } from '@src/hooks/useGetRequests';
import Size from '@src/utils/useResponsiveSize';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
}

const ProfileDetailsRow = (props: Props): React.JSX.Element => {
  const { containerStyle } = props;
  const { details } = useGetUserDetails();
  const navigation = useAppNavigator();

  return (
    <View style={[styles.row, containerStyle]}>
      <View style={styles.profileContainer}>
        <AppAvatar
          firstWord={details?.firstName}
          imageURL={details?.photo}
          lastWord={details?.lastName}
          style={styles.profileImage}
        />
        <View style={styles.profileDetails}>
          <AppText style={styles.profileName}>
            {details?.firstName} {details?.lastName}
          </AppText>

          <View style={styles.row}>
            <View style={styles.row2}>
              <MaterialSymbolsAccountCircle
                height={Size.calcAverage(14)}
                width={Size.calcAverage(14)}
                color={colors.GRAY_100}
              />
              <AppText style={styles.profileText}>{details?.code}</AppText>
            </View>
            <View style={styles.row2}>
              <MaterialSymbolsCall
                height={Size.calcAverage(12)}
                width={Size.calcAverage(12)}
                color={colors.GRAY_100}
              />
              <AppText style={styles.profileText}>{details?.phone}</AppText>
            </View>
          </View>
          <View style={styles.row2}>
            <MaterialSymbolsMail
              height={Size.calcAverage(14)}
              width={Size.calcAverage(14)}
              color={colors.GRAY_100}
            />
            <AppText style={styles.profileText}>{details?.email}</AppText>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate(routes.MY_QR_CODE_SCREEN)}
      >
        <MaterialSymbolsQrCode
          color={colors.BLUE_600}
          height={Size.calcAverage(24)}
          width={Size.calcAverage(24)}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  profileDetails: {
    rowGap: Size.calcHeight(6),
    paddingHorizontal: Size.calcWidth(12),
  },

  profileImage: {
    height: Size.calcAverage(56),
    width: Size.calcAverage(56),
    borderRadius: Size.calcAverage(56),
  },

  profileName: {
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(16),
    color: colors.BLACK_300,
  },

  profileText: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
  },

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    columnGap: Size.calcWidth(12),
  },

  row2: {
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: Size.calcWidth(4),
  },
});

export default ProfileDetailsRow;
