import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import {
  MaterialSymbolsBackspace,
  MaterialSymbolsChevronLeft,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';

type PadValue = number | 'DELETE' | null;
interface PadDetail {
  title: React.ReactNode;
  value: PadValue;
}

const padNumbers: PadDetail[][] = [
  [
    { title: 1, value: 1 },
    { title: 2, value: 2 },
    { title: 3, value: 3 },
  ],
  [
    { title: 4, value: 4 },
    { title: 5, value: 5 },
    { title: 6, value: 6 },
  ],
  [
    { title: 7, value: 7 },
    { title: 8, value: 8 },
    { title: 9, value: 9 },
  ],
  [
    { title: '', value: null },
    { title: 0, value: 0 },
    {
      title: (
        <MaterialSymbolsBackspace
          height={Size.calcAverage(28)}
          width={Size.calcAverage(28)}
          color={colors.RED_100}
        />
      ),
      value: 'DELETE',
    },
  ],
];

const SetupWalletPinScreen = (): React.ReactNode => {
  const [pin, setPin] = useState<string>('');

  console.log(pin);

  const handleKeyPress = (val: PadValue) => {
    if (val == null) return;

    if (val == 'DELETE') {
      if (!!pin) setPin(pin?.slice(0, -1));
      return;
    }

    if (pin?.length < 4) {
      setPin(pin + val);
    }
  };

  return (
    <AppScreen showDownInset style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <MaterialSymbolsChevronLeft
            height={Size.calcAverage(24)}
            width={Size.calcAverage(24)}
            color={colors.BLACK_100}
          />
          <AppText style={{ fontFamily: fonts.INTER_500 }}>Go Back</AppText>
        </TouchableOpacity>
      </View>

      <AppText style={styles.title}>Set up your wallet PIN</AppText>
      <AppText style={{ textAlign: 'center' }}>
        Enter your 4-digit PIN below.
      </AppText>

      <View style={styles.indicatorLayout}>
        {[...Array(4)]?.map((_, idx) => (
          <View key={idx} style={styles.indicatorContainer}>
            {!!pin && pin?.length > idx ? (
              <View style={styles.indicator} />
            ) : null}
          </View>
        ))}
      </View>

      <View style={styles.keypadLayout}>
        {padNumbers?.map((row, key) => (
          <View key={key} style={styles.keypadRow}>
            {row?.map((val, idx) => (
              <TouchableOpacity
                onPress={() => handleKeyPress(val?.value)}
                style={styles.keypad}
                key={idx}
              >
                <AppText style={styles.keypadText}>{val?.title}</AppText>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE_200,
    paddingHorizontal: 0,
  },

  header: {
    padding: Size.calcAverage(11),
    borderColor: colors.LIGHT_GRAY_200,
    borderBottomWidth: Size.calcHeight(1),
  },

  headerButton: {
    flexDirection: 'row',
    rowGap: Size.calcWidth(8),
    alignItems: 'center',
    padding: Size.calcAverage(10),
    marginRight: 'auto',
  },

  indicator: {
    height: Size.calcAverage(13),
    aspectRatio: 1 / 1,
    backgroundColor: colors.BLACK_100,
    borderRadius: Size.calcAverage(13),
  },

  indicatorContainer: {
    width: '21%',
    aspectRatio: 1 / 1,
    borderBottomWidth: Size.calcHeight(1),
    borderBottomColor: colors.GRAY_200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  indicatorLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Size.calcAverage(21),
  },

  keypad: {
    width: '33.25%',
    aspectRatio: 4 / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },

  keypadLayout: {
    width: '100%',
    aspectRatio: 1 / 1,
    marginTop: 'auto',
    maxWidth: '91%',
    marginHorizontal: 'auto',
    borderTopWidth: Size.calcHeight(1),
    borderColor: colors.WHITE_300,
  },

  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  keypadText: {
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(28),
  },

  title: {
    textAlign: 'center',
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(24),
    paddingTop: Size.calcHeight(50),
    paddingBottom: Size.calcHeight(12),
  },
});

export default SetupWalletPinScreen;
