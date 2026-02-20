import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { formatMoneyValue, formatNumberInput } from '@src/utils';
import Size from '@src/utils/useResponsiveSize';
import AppText from '../AppText';
import ErrorMessage from './ErrorMessage';
import appConfig from '@src/utils/appConfig';

export interface AppTextInputWithoutValidationProps extends TextInputProps {
  placeholder: string;
  label: string;
  containerStyle?: ViewStyle;
  innerContainerStyle?: ViewStyle;
  description?: string;
  rightIcon?: React.JSX.Element;
  leftIcon?: React.JSX.Element;
  errorMessage?: string;
  isMoneyValue?: boolean;
}

const AppTextInputWithoutValidation = (
  props: AppTextInputWithoutValidationProps,
): React.JSX.Element => {
  const {
    label,
    containerStyle,
    innerContainerStyle,
    description,
    errorMessage,
    value,
    keyboardType,
    rightIcon,
    leftIcon,
    onChangeText,
    style,
    isMoneyValue,
    ...otherProps
  } = props;

  const onChange = (e: string) => {
    if (isMoneyValue) {
      onChangeText?.(formatMoneyValue(e));
    } else if (keyboardType === 'number-pad') {
      onChangeText?.(formatNumberInput(e));
    } else {
      onChangeText?.(e);
    }
  };

  return (
    <View style={containerStyle}>
      {!!value && !!label && <AppText style={styles.label}>{label}</AppText>}
      <View
        style={[
          styles.container,
          innerContainerStyle,
          !!errorMessage && { borderColor: colors.RED_100 },
        ]}
      >
        {isMoneyValue ? (
          <AppText>{appConfig.NAIRA_SYMBOL}</AppText>
        ) : leftIcon ? (
          leftIcon
        ) : null}
        <TextInput
          cursorColor={colors.BLUE_200}
          style={[styles.text, style]}
          placeholderTextColor={colors.GRAY_100}
          value={value}
          onChangeText={onChange}
          keyboardType={keyboardType}
          {...otherProps}
        />

        {rightIcon}
      </View>
      {!!description && (
        <AppText style={styles.description}>{description}</AppText>
      )}

      <ErrorMessage message={errorMessage || null} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    borderBottomColor: colors.LIGHT_GRAY_100,
    // borderBottomColor: colors.GRAY_100,
    borderBottomWidth: Size.calcHeight(1),
    height: Size.calcHeight(46),

    marginTop: Size.calcHeight(1),
    flexDirection: 'row',
    gap: Size.calcAverage(5),
    alignItems: 'center',
  },
  description: {
    fontSize: Size.calcAverage(10),
    color: colors.GRAY_100,
    paddingVertical: Size.calcHeight(4),
  },
  label: {
    fontFamily: fonts.INTER_500,
    fontSize: Size.calcAverage(12),
    color: colors.BLUE_100,
  },
  text: {
    flexGrow: 1,
    fontSize: Size.calcAverage(14),

    fontFamily: fonts.INTER_500,
    color: colors.BLACK_100,
  },
});

export default AppTextInputWithoutValidation;
