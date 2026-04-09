import { StyleSheet, TouchableOpacity, View } from 'react-native';

import SampleAdImage from '@src/assets/images/sample-ad.png';
import AppImage from '@src/components/AppImage';
import Size from '@src/utils/useResponsiveSize';
import { openURL } from '@src/utils';
import appConfig from '@src/utils/appConfig';

const AdvertsSection = (): React.JSX.Element => {
  return (
    <View style={styles.imageContainer}>
      <TouchableOpacity
        onPress={() => openURL(`${appConfig.APP_WEBSITE_URL}/contact`)}
      >
        <AppImage
          style={styles.image}
          resizeMode="contain"
          source={SampleAdImage}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    aspectRatio: 16 / 9,
    resizeMode: 'contain',
    borderRadius: Size.calcAverage(8),
    overflow: 'hidden',
  },

  imageContainer: {
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(10),
  },
});

export default AdvertsSection;
