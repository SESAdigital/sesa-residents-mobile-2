import { LoginModeData, LoginModeType } from '@src/api/constants/default';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Mode {
  title: string;
  value: LoginModeType;
}

const modes: Mode[] = [
  {
    title: 'Email Address',
    value: LoginModeData.EmailAddress,
  },
  {
    title: 'Phone Number',
    value: LoginModeData.PhoneNumber,
  },
];

interface Props {
  selectedMode: LoginModeType;
  onSelectMode: (mode: LoginModeType) => void;
}

const LoginModeToggle = (props: Props): React.ReactNode => {
  const { selectedMode, onSelectMode } = props;

  return (
    <View style={styles.container}>
      {modes.map(mode => (
        <TouchableOpacity
          key={mode.value}
          onPress={() => onSelectMode(mode.value)}
          style={[
            styles.mode,
            selectedMode === mode.value && styles.selectedMode,
          ]}
        >
          <Text style={styles.modeText}>{mode.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.LIGHT_GRAY_500,
    padding: Size.calcAverage(4),
    borderRadius: 100,
  },
  mode: {
    width: '48.5%',
    padding: Size.calcAverage(5),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedMode: {
    backgroundColor: colors.WHITE_200,
    shadowColor: colors.LIGHT_GRAY_600,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modeText: {
    fontFamily: fonts.INTER_600,
  },
});

export default LoginModeToggle;
