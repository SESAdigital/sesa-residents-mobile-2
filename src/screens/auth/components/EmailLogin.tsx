import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import AppTextInput from '@src/components/forms/AppTextInput';
import SubmitButton from '@src/components/forms/SubmitButton';
import PasswordToggle from '@src/components/icons/PasswordToggle';
import Size from '@src/utils/useResponsiveSize';
import { LoginSchema } from '../LoginScreen';

interface Props {
  form: UseFormReturn<LoginSchema, any, LoginSchema>;
  onSubmit: () => void;
}

const EmailLogin = (props: Props): React.ReactNode => {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const {
    form: { control },
    onSubmit,
  } = props;

  const isLoading = false;

  return (
    <View style={styles.container}>
      <AppTextInput
        editable={!isLoading}
        placeholder="Email Address"
        label="Email Address"
        control={control}
        name="email"
        keyboardType="email-address"
      />
      <AppTextInput
        editable={!isLoading}
        placeholder="Password"
        label="Password"
        control={control}
        name="password"
        secureTextEntry={!isPasswordVisible}
        rightIcon={
          <PasswordToggle
            isVisible={!isPasswordVisible}
            onClick={() => setPasswordVisibility(value => !value)}
          />
        }
      />

      <View style={{ marginTop: Size.calcHeight(30) }}>
        <SubmitButton
          title="Continue"
          isLoading={isLoading}
          onPress={onSubmit}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    rowGap: Size.calcAverage(24),
    // paddingBottom: Size.calcHeight(20),
    flex: 1,
  },
});

export default EmailLogin;
