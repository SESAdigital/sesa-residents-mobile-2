import { useMutation } from '@tanstack/react-query';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { joiResolver } from '@hookform/resolvers/joi';
import {
  patchProfilePhoneNumber,
  PatchProfilePhoneNumberReq,
} from '@src/api/profile.api';
import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import AppKeyboardAvoidingView from '@src/components/custom/AppKeyboardAvoidingView';
import AppTextInput from '@src/components/forms/AppTextInput';
import colors from '@src/configs/colors';
import { useGetUserDetails } from '@src/hooks/useGetRequests';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import { appToast } from '@src/utils/appToast';
import { handleToastApiError } from '@src/utils/handleErrors';
import { joiSchemas } from '@src/utils/schema';
import Size from '@src/utils/useResponsiveSize';
import SubmitButton from '@src/components/forms/SubmitButton';
import InformationRow from '@src/components/common/InformationRow';
import AppLoadingModal from '@src/modals/AppLoadingModal';

const schema = Joi.object<PatchProfilePhoneNumberReq>({
  PhoneNumber: joiSchemas.phone.label('Phone number'),
});

const UpdatePhoneNumberScreen = (): React.JSX.Element => {
  const { details } = useGetUserDetails();
  const patchProfilePhoneNumberAPI = useMutation({
    mutationFn: patchProfilePhoneNumber,
  });
  const navigation = useAppNavigator();
  const { handleSubmit, control } = useForm<PatchProfilePhoneNumberReq>({
    resolver: joiResolver(schema),
    defaultValues: {
      PhoneNumber: details?.phone,
    },
  });

  const isLoading = patchProfilePhoneNumberAPI?.isPending;

  const onSubmit = handleSubmit(async data => {
    if (
      data?.PhoneNumber?.trim()?.toLowerCase() ==
      details?.phone?.trim()?.toLowerCase()
    ) {
      return appToast.Info('Phone number is the same as the old phone number');
    }

    const response = await patchProfilePhoneNumberAPI.mutateAsync(data);

    if (response?.ok) {
      appToast.Success(
        response?.data?.message || 'Phone number updated successfully',
      );
      navigation.goBack();
    } else {
      handleToastApiError(response);
    }

    return;
  });

  return (
    <AppScreen showDownInset>
      <AppLoadingModal isLoading={isLoading} title="Please wait..." />
      <AppScreenHeader title="Update phone number" />
      <AppText style={styles.screenTitle}>Enter new phone number</AppText>
      <AppKeyboardAvoidingView>
        <View style={styles.container}>
          <View style={{ rowGap: Size.calcHeight(13) }}>
            <AppTextInput
              editable={!isLoading}
              maxLength={11}
              placeholder="Phone Number"
              label="Phone Number"
              control={control}
              name="PhoneNumber"
              keyboardType="number-pad"
            />
            <InformationRow title="Ensure the provided phone number is correct, as it can also be used to login." />
          </View>

          <SubmitButton title="Save Changes" onPress={onSubmit} />
        </View>
      </AppKeyboardAvoidingView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '96%',
    justifyContent: 'space-between',
    paddingVertical: Size.calcHeight(32),
    paddingHorizontal: Size.calcWidth(21),
  },

  screenTitle: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
    borderBottomWidth: Size.calcHeight(1),
    borderBottomColor: colors.WHITE_300,
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(4),
  },
});

export default UpdatePhoneNumberScreen;
