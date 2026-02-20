import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';

import AppText from '@src/components/AppText';
import { MaterialSymbolsBackspace } from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';
import appConfig from '@src/utils/appConfig';

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

interface Props {
  pin: string;
  onPinChange: (pin: string) => void;
  title: string;
  subtitle: string;
  onDone: (val: string) => void;
  pinLength?: number;
  titleStyles?: TextStyle;
  showValues?: boolean;
  subtitleStyles?: TextStyle;
}

const WalletPinInput = (props: Props): React.JSX.Element => {
  const {
    pin,
    onPinChange,
    title,
    onDone,
    subtitle,
    pinLength = appConfig.APP_PIN_LENGTH,
    subtitleStyles,
    titleStyles,
    showValues,
  } = props;

  const handleKeyPress = (val: PadValue) => {
    if (val == null) return;

    Vibration.vibrate(5000);

    if (val === 'DELETE') {
      if (pin) onPinChange(pin?.slice(0, -1));
      return;
    }

    if (pin?.length < pinLength) {
      const mutatedVal = pin + val;
      onPinChange(mutatedVal);
      if (pin?.length > pinLength - 2) onDone(mutatedVal);
    }
  };

  return (
    <>
      <AppText style={[styles.title, titleStyles]}>{title}</AppText>
      <AppText style={[styles.subtitle, subtitleStyles]}>{subtitle}</AppText>

      <View style={styles.indicatorLayout}>
        {[...Array(pinLength)]?.map((_, idx) => (
          <View
            key={idx}
            style={[
              styles.indicatorContainer,
              { width: `${getChildWidth(pinLength)}%` },
            ]}
          >
            {!!pin && pin?.length > idx ? (
              showValues ? (
                <AppText style={styles.indicatorText}>{pin?.[idx]}</AppText>
              ) : (
                <View style={styles.indicator} />
              )
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
    </>
  );
};

const styles = StyleSheet.create({
  indicator: {
    height: Size.calcAverage(13),
    aspectRatio: 1 / 1,
    marginLeft: Size.calcWidth(-2),
    backgroundColor: colors.BLACK_100,
    borderRadius: Size.calcAverage(13),
  },

  indicatorContainer: {
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

  indicatorText: {
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(24),
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

  subtitle: {
    paddingHorizontal: Size.calcWidth(21),
    textAlign: 'center',
  },

  title: {
    textAlign: 'center',
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(24),
    paddingTop: Size.calcHeight(50),
    paddingBottom: Size.calcHeight(12),
    paddingHorizontal: Size.calcWidth(21),
  },
});

export default WalletPinInput;

const BASE_CHILDREN = 4;
const BASE_WIDTH = 21;

function getChildWidth(childrenCount: number): number {
  if (childrenCount <= 0) return BASE_WIDTH;

  const totalWidth = BASE_CHILDREN * BASE_WIDTH;
  return totalWidth / childrenCount;
}
