import {Control, FieldValues, Path, useController} from 'react-hook-form';

import AppTextInputWithoutValidation, {
  AppTextInputWithoutValidationProps,
} from './AppTextInputWithoutValidation';

export interface AppTextInputProps<TFieldValues extends FieldValues>
  extends AppTextInputWithoutValidationProps {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
}

function AppTextInput<TFieldValues extends FieldValues>(
  props: AppTextInputProps<TFieldValues>,
) {
  const {
    name,
    control,

    ...otherProps
  } = props;

  const {
    field,
    fieldState: {error},
  } = useController({
    control,
    name,
  });

  return (
    <AppTextInputWithoutValidation
      errorMessage={error?.message}
      onBlur={field.onBlur}
      onChangeText={field.onChange}
      value={field.value}
      {...otherProps}
    />
    // <View style={containerStyle}>
    //   {!!field?.value && !!label && (
    //     <AppText style={styles.label}>{label}</AppText>
    //   )}
    //   <View
    //     style={[
    //       styles.container,
    //       innerContainerStyle,
    //       !!error?.message && {borderColor: colors.RED_100},
    //     ]}>
    //     <TextInput
    //       cursorColor={colors.BLUE_100}
    //       style={styles.text}
    //       placeholderTextColor={colors.GRAY_100}
    //       onChangeText={onChange}
    //       onBlur={field.onBlur}
    //       value={field.value}
    //       keyboardType={keyboardType}
    //       {...otherProps}
    //     />

    //     {rightIcon}
    //   </View>
    //   {!!description && (
    //     <AppText style={styles.description}>{description}</AppText>
    //   )}

    //   <ErrorMessage message={error?.message ?? null} />
    // </View>
  );
}

export default AppTextInput;
