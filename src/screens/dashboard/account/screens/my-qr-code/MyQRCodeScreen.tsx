import AppLogoIcon from '@src/assets/logo/logo-icon.png';
import { StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import AppText from '@src/components/AppText';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import AppProfilePicture from '@src/components/custom/AppProfilePicture';
import {
  MaterialSymbolsAccountCircle,
  MaterialSymbolsCall,
  MaterialSymbolsMail,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import { useGetUserDetails } from '@src/hooks/useGetRequests';
import Size from '@src/utils/useResponsiveSize';
import { SafeAreaView } from 'react-native-safe-area-context';

const MyQRCodeScreen = (): React.JSX.Element => {
  const { details } = useGetUserDetails();

  return (
    <SafeAreaView style={styles.container}>
      <AppScreenHeader
        icon="close"
        containerStyle={styles.header}
        title="My QR Code"
      />
      <View style={styles.contentContainer}>
        <View style={styles.mainContainer}>
          <View style={styles.profileContainer}>
            <AppProfilePicture size={Size.calcAverage(54)} />
            <View style={styles.content}>
              <AppText>
                {details?.firstName} {details?.lastName}
              </AppText>
              <View style={styles.row}>
                <View style={styles.row2}>
                  <MaterialSymbolsAccountCircle
                    height={Size.calcAverage(14)}
                    width={Size.calcAverage(14)}
                    color={colors.GRAY_100}
                  />
                  <AppText style={styles.text}>{details?.code}</AppText>
                </View>
                <View style={styles.row2}>
                  <MaterialSymbolsCall
                    height={Size.calcAverage(12)}
                    width={Size.calcAverage(12)}
                    color={colors.GRAY_100}
                  />
                  <AppText style={styles.text}>{details?.phone}</AppText>
                </View>
              </View>
              <View style={styles.row2}>
                <MaterialSymbolsMail
                  height={Size.calcAverage(12)}
                  width={Size.calcAverage(12)}
                  color={colors.GRAY_100}
                />
                <AppText style={styles.text}>{details?.email}</AppText>
              </View>
            </View>
          </View>

          <View style={styles.qrCodeContainer}>
            <QRCode
              size={Size.calcAverage(225)}
              logo={AppLogoIcon}
              value={details?.code || ''}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    backgroundColor: colors.BLUE_140,
    flex: 1,
  },

  content: {
    paddingLeft: Size.calcWidth(12),
    flexShrink: 1,
    rowGap: Size.calcHeight(6),
  },

  contentContainer: {
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(20),
  },

  header: {
    borderBottomWidth: 0,
    paddingVertical: Size.calcHeight(21),
  },

  mainContainer: {
    backgroundColor: colors.WHITE_200,
    borderRadius: Size.calcAverage(12),
    shadowColor: colors.BLUE_170,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Size.calcWidth(21),
    borderBottomWidth: Size.calcHeight(1),
    borderBottomColor: colors.LIGHT_GRAY_200,
  },

  qrCodeContainer: {
    alignItems: 'center',
    paddingVertical: Size.calcHeight(60),
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

  text: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
  },
});

export default MyQRCodeScreen;
