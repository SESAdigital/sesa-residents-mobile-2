import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';
import AppText from '../AppText';

export type SubmitButtonVariants =
  | 'PRIMARY'
  | 'SECONDARY'
  | 'LIGHT_BLUE'
  | 'OUTLINE_BLUE'
  | 'DANGER'
  | 'DANGER_LIGHT'
  | 'SUCCESS';

export interface SubmitButtonProps {
  title: string | React.JSX.Element;
  onPress: () => void;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  variant?: SubmitButtonVariants;

  disabled?: boolean;
}

const SubmitButton = (props: SubmitButtonProps): React.JSX.Element => {
  const { isLoading, onPress, title, style, variant, disabled, titleStyle } =
    props;
  return (
    <TouchableOpacity
      disabled={isLoading || disabled}
      onPress={onPress}
      style={[
        styles.container,
        variant === 'SECONDARY' && styles.secondaryContainer,
        variant === 'LIGHT_BLUE' && { backgroundColor: colors.BLUE_600 },
        variant === 'DANGER' && { backgroundColor: colors.RED_100 },
        variant === 'DANGER_LIGHT' && { backgroundColor: colors.RED_300 },
        variant === 'OUTLINE_BLUE' && styles.outlineBlue,
        variant === 'SUCCESS' && { backgroundColor: colors.GREEN_100 },
        style,
        (isLoading || disabled) && styles.background,
      ]}
    >
      {typeof title === 'string' ? (
        <AppText
          style={[
            styles.text,
            variant === 'SECONDARY' && styles.secondaryText,
            variant === 'OUTLINE_BLUE' && { color: colors.BLUE_200 },
            variant === 'DANGER_LIGHT' && { color: colors.RED_100 },
            // variant === 'DANGER' && {color: colors.RED_100},
            titleStyle,
          ]}
        >
          {title}
        </AppText>
      ) : (
        title
      )}
      {isLoading && (
        <ActivityIndicator size={Size.calcHeight(23)} color={'#0556DB80'} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#002E6666',
  },

  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Size.calcHeight(18),
    backgroundColor: colors.BLUE_200,
    flexDirection: 'row',
    gap: Size.calcAverage(10),
    borderRadius: 1000,
  },

  outlineBlue: {
    backgroundColor: colors.TRANSPARENT_BLUE_100,
    borderColor: colors.BLUE_200,
    borderWidth: Size.calcAverage(1),
  },

  text: {
    color: colors.WHITE_200,
    fontFamily: fonts.INTER_500,
  },

  secondaryContainer: {
    backgroundColor: colors.WHITE_300,
  },

  secondaryText: {
    color: colors.BLACK_100,
  },
});

export default SubmitButton;
