import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import OnboardingHeroImage from '@src/assets/images/onboarding-hero.png';
import AppImage from '@src/components/AppImage';
import AppText from '@src/components/AppText';
import SubmitButton from '@src/components/forms/SubmitButton';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';
import routes from '@src/navigation/routes';

const OnboardingScreen1 = (): React.ReactNode => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <AppImage
        source={OnboardingHeroImage}
        resizeMode="cover"
        style={{ flex: 1 }}
      />
      <View style={styles.contentContainer}>
        <AppText style={styles.title}>
          You deserve a better living experience.
        </AppText>
        <AppText style={styles.subTitle}>
          Access everything you need to have a better living experience in your
          estate or gated-community.
        </AppText>
        <SubmitButton
          title="Get Started"
          isLoading={false}
          onPress={() => navigation.navigate(routes.ONBOARDING_SCREEN_2)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE_200,
  },

  contentContainer: {
    paddingHorizontal: Size.calcWidth(21),
    paddingTop: Size.calcHeight(43),
    paddingBottom: Size.calcHeight(150),
  },

  subTitle: {
    color: colors.GRAY_100,
    textAlign: 'center',
    maxWidth: Size.calcWidth(399),
    marginHorizontal: 'auto',
    paddingBottom: Size.calcHeight(46),
    paddingTop: Size.calcHeight(12),
  },

  title: {
    fontSize: Size.calcAverage(24),
    fontFamily: fonts.INTER_600,
    textAlign: 'center',
    maxWidth: Size.calcWidth(300),
    marginHorizontal: 'auto',
  },
});

export default OnboardingScreen1;
