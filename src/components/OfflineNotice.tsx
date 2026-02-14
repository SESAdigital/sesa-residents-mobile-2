import { useNetInfo } from '@react-native-community/netinfo';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';
import AppText from './AppText';

const OfflineNotice = (): React.ReactNode => {
  const netInfo = useNetInfo();

  if (netInfo?.type !== 'unknown' && netInfo?.isInternetReachable === false)
    return (
      <SafeAreaView style={styles.container}>
        <AppText style={styles.text}>No Internet Connection</AppText>
      </SafeAreaView>
    );

  return null;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.RED_100,
    elevation: 2,
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    paddingVertical: Size.calcHeight(20),
    paddingBottom: Size.calcHeight(10),
  },
  text: {
    color: colors.WHITE_100,
    fontFamily: fonts.INTER_500,
  },
});

export default OfflineNotice;
