import { StyleSheet, View } from 'react-native';

import AppScreen from '@src/components/AppScreen';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '@src/configs/colors';
import Size from '@src/utils/useResponsiveSize';

const MyQRCodeScreen = (): React.JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <AppScreenHeader
        icon="close"
        containerStyle={{ borderBottomWidth: 0 }}
        title="My QR Code"
      />
      <View style={{ paddingHorizontal: Size.calcWidth(24) }}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    backgroundColor: colors.BLUE_140,
    flex: 1,
  },
});

export default MyQRCodeScreen;
