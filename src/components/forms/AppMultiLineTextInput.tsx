import { FieldValues } from 'react-hook-form';

import colors from '@src/configs/colors';
import Size from '@src/utils/useResponsiveSize';
import AppTextInput, { AppTextInputProps } from './AppTextInput';

function AppMultiLineTextInput<TFieldValues extends FieldValues>(
  props: AppTextInputProps<TFieldValues>,
) {
  const { containerStyle, innerContainerStyle, style, ...otherProps } = props;

  return (
    <AppTextInput
      {...otherProps}
      multiline
      innerContainerStyle={{
        height: 'auto',
        backgroundColor: colors.WHITE_300,
        minHeight: Size.calcHeight(100),
        borderBottomWidth: Size.calcHeight(1),
        borderRadius: Size.calcAverage(4),
        overflow: 'hidden',
        padding: Size.calcAverage(3),
        borderBottomColor: colors.LIGHT_GRAY_100,
        ...innerContainerStyle,
      }}
      style={{ maxHeight: Size.calcHeight(170), ...style }}
    />
  );
}

export default AppMultiLineTextInput;
