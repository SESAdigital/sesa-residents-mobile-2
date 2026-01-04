import { StyleSheet, View } from 'react-native';

import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import {
  MaterialSymbolsDomainAdd,
  MaterialSymbolsMail,
  MaterialSymbolsPersonAdd,
} from '@src/components/icons';
import Size from '@src/utils/useResponsiveSize';
import fonts from '@src/configs/fonts';

const data = [
  {
    icon: <MaterialSymbolsDomainAdd />,
    title: 'You reside in a SESA powered estate or gated-community.',
  },
  {
    icon: <MaterialSymbolsPersonAdd />,
    title: 'You have been onboarded by your estate manager.',
  },
  {
    icon: <MaterialSymbolsMail />,
    title:
      'You have access to your associated email - your login details will be sent there.',
  },
];

const OnboardingScreen2 = (): React.ReactNode => {
  return (
    <AppScreen style={styles.container}>
      <AppText style={styles.title}>Before you get started</AppText>
      <AppText style={styles.subTitle}>Be sure of the following</AppText>

      <View>
        {data.map((item, index) => (
          <View key={index}>
            <View>{item.icon}</View>
            <AppText>{item.title}</AppText>
          </View>
        ))}
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {},

  subTitle: {},

  title: {
    fontSize: Size.calcAverage(24),
    fontFamily: fonts.INTER_600,
    textAlign: 'center',
    marginHorizontal: 'auto',
  },
});

export default OnboardingScreen2;
