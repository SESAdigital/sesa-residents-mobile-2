import { PropsWithChildren } from 'react';
import { ActivityIndicator, Button, StyleSheet, View } from 'react-native';
import { RESULTS } from 'react-native-permissions';

import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useCameraPermission } from '@src/hooks/usePermissions';
import Size from '@src/utils/useResponsiveSize';
import AppText from '../AppText';

const CameraPermissionsLayout = ({ children }: PropsWithChildren) => {
  const { status, loading, error, requestPermission } = useCameraPermission();

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <AppText style={styles.text}>Error: {error}</AppText>
        <Button title="Retry" onPress={requestPermission} />
      </View>
    );
  }

  if (status === RESULTS.GRANTED) {
    return children;
  }

  return (
    <View style={styles.container}>
      <AppText style={styles.text}>Camera permission not granted</AppText>
      <Button title="Request Permission" onPress={requestPermission} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontFamily: fonts.INTER_500,
    color: colors.WHITE_100,
    textAlign: 'center',
    marginTop: Size.calcHeight(-200),
    marginBottom: Size.calcHeight(16),
  },
});

export default CameraPermissionsLayout;
