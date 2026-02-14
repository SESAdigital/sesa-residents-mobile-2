import { StyleSheet, View } from 'react-native';

import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import SubmitButton from '@src/components/forms/SubmitButton';
import {
  MaterialSymbolsDomainAdd,
  MaterialSymbolsMail,
  MaterialSymbolsPersonAdd,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useGetCurrentLocation } from '@src/hooks/useCurrentLocation';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import Size from '@src/utils/useResponsiveSize';

const iconProps = {
  color: colors.BLACK_100,
  height: Size.calcAverage(23),
  width: Size.calcAverage(23),
};

const data = [
  {
    icon: <MaterialSymbolsDomainAdd {...iconProps} />,
    title: 'You reside in a SESA powered estate or gated-community.',
  },
  {
    icon: <MaterialSymbolsPersonAdd {...iconProps} />,
    title: 'You have been onboarded by your estate manager.',
  },
  {
    icon: <MaterialSymbolsMail {...iconProps} />,
    title:
      'You have access to your associated email - your login details will be sent there.',
  },
];

const OnboardingScreen2 = (): React.JSX.Element => {
  const navigation = useAppNavigator();
  useGetCurrentLocation();

  return (
    <AppScreen showDownInset style={{ backgroundColor: colors.WHITE_200 }}>
      <AppText style={styles.title}>Before you get started</AppText>
      <AppText style={styles.subTitle}>Be sure of the following</AppText>

      <View style={styles.contentWrapper}>
        {data.map((item, index) => (
          <View style={styles.contentContainer} key={index}>
            {item?.icon}
            <AppText style={styles.contentTitle}>{item?.title}</AppText>
          </View>
        ))}
      </View>

      <View style={styles.buttonWrapper}>
        <SubmitButton
          title="I don’t have my login credentials"
          isLoading={false}
          onPress={() => navigation.navigate(routes.RETRIEVE_ACCOUNT_SCREEN)}
        />
        <SubmitButton
          title="I have my login credentials"
          isLoading={false}
          variant="SECONDARY"
          onPress={() => navigation.navigate(routes.LOGIN_SCREEN)}
        />
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    marginTop: 'auto',
    paddingBottom: Size.calcHeight(52),
    rowGap: Size.calcHeight(24),
  },

  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  contentTitle: {
    paddingLeft: Size.calcWidth(16),
    flexShrink: 1,
  },

  contentWrapper: {
    backgroundColor: colors.WHITE_300,
    borderRadius: Size.calcAverage(8),
    paddingVertical: Size.calcHeight(24),
    paddingHorizontal: Size.calcWidth(18),
    rowGap: Size.calcHeight(18),
  },

  subTitle: {
    fontFamily: fonts.INTER_600,
    paddingBottom: Size.calcHeight(40),
  },

  title: {
    fontSize: Size.calcAverage(24),
    fontFamily: fonts.INTER_600,
    paddingBottom: Size.calcHeight(12),
    paddingTop: Size.calcHeight(54),
  },
});

export default OnboardingScreen2;
