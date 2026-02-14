import LinearGradient from 'react-native-linear-gradient';

import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';
import AppText from '../AppText';

const ComingSoonGradient = (): React.JSX.Element => {
  return (
    // <View>
    <LinearGradient
      colors={['rgba(127, 30, 254, 0.79)', '#4238B6']}
      locations={[0.105, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <AppText
        style={{
          color: colors.WHITE_100,
          textAlign: 'center',
          padding: Size.calcAverage(8.5),
          fontFamily: fonts.INTER_600,
          fontSize: Size.calcAverage(12),
        }}
      >
        Coming Soon
      </AppText>
    </LinearGradient>
    // </View>
  );
};

export default ComingSoonGradient;
