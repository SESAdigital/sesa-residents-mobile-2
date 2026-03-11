import { StyleSheet, View } from 'react-native';
import { Camera, CameraType } from 'react-native-camera-kit';
import { OnReadCodeData } from 'react-native-camera-kit/dist/CameraProps';

import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import CameraPermissionsLayout from '@src/components/custom/CameraPermissionsLayout';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { AppScreenProps } from '@src/navigation/AppNavigator';
import Size from '@src/utils/useResponsiveSize';

export interface ScanBarCodeScreenProps {
  onRead: (data: OnReadCodeData) => void;
  scanTitle?: string;
  headerTitle?: string;
}

type Props = AppScreenProps<'SCAN_BAR_CODE_SCREEN'>;

const ScanBarCodeScreen = (props: Props) => {
  const params = props?.route?.params;
  const {
    onRead,
    scanTitle = 'Position QR code in the box below',
    headerTitle = 'Scan QR-Code',
  } = params;

  return (
    <AppScreen showDownInset>
      <AppScreenHeader title={headerTitle} />

      <View style={styles.container}>
        <CameraPermissionsLayout>
          <AppText style={styles.text}>{scanTitle}</AppText>

          <Camera
            cameraType={CameraType.Back}
            scanBarcode={true}
            showFrame={true}
            laserColor={colors.BLUE_200}
            frameColor={colors.BLUE_500}
            onReadCode={onRead}
            style={styles.camera}
          />
        </CameraPermissionsLayout>
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  camera: {
    aspectRatio: '4/3',
    width: '90%',
    marginHorizontal: 'auto',
  },

  container: {
    backgroundColor: colors.GRAY_100,
    width: '100%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontFamily: fonts.INTER_500,
    color: colors.WHITE_100,
    textAlign: 'center',
    marginTop: Size.calcHeight(-200),
    marginBottom: Size.calcHeight(16),
  },
});

export default ScanBarCodeScreen;
