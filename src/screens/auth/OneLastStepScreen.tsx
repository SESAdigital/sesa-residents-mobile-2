import { StyleSheet, View } from 'react-native';

import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import SubmitButton from '@src/components/forms/SubmitButton';
import {
  MaterialSymbolsLightbulb,
  MaterialSymbolsPayments,
  MaterialSymbolsReceiptLong,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
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
    icon: <MaterialSymbolsLightbulb {...iconProps} />,
    title: 'Purchasing power tokens.',
  },
  {
    icon: <MaterialSymbolsReceiptLong {...iconProps} />,
    title: 'Paying for Bills.',
  },
  {
    icon: <MaterialSymbolsPayments {...iconProps} />,
    title: 'Paying for Collections.',
  },
];

const OneLastStepScreen = (): React.JSX.Element => {
  const navigation = useAppNavigator();

  return (
    <AppScreen showDownInset style={{ backgroundColor: colors.WHITE_200 }}>
      <AppText style={styles.title}>One last step</AppText>
      <AppText style={styles.subTitle}>
        We require that you set up a 4-digit wallet PIN. This PIN will be used
        to authorize any debit on your SESA wallet when:
      </AppText>

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
          title="Set up wallet PIN"
          isLoading={false}
          onPress={() => navigation.navigate(routes.SET_UP_WALLET_PIN_SCREEN)}
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
    paddingBottom: Size.calcHeight(40),
  },

  title: {
    fontSize: Size.calcAverage(24),
    fontFamily: fonts.INTER_600,
    paddingBottom: Size.calcHeight(12),
    paddingTop: Size.calcHeight(54),
  },
});

export default OneLastStepScreen;
