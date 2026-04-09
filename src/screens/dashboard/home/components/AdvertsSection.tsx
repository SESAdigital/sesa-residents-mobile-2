import { StyleSheet, View } from 'react-native';

import SampleAdImage from '@src/assets/images/sample-ad.png';
import AppImage from '@src/components/AppImage';
import Size from '@src/utils/useResponsiveSize';

const AdvertsSection = (): React.JSX.Element => {



  return (
    <View style={styles.imageContainer}>

      <AppImage
        style={styles.image}
        resizeMode="contain"
        source={SampleAdImage}
      />
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
