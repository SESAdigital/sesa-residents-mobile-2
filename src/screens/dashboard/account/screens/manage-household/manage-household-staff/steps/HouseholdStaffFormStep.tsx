import { UseFormReturn } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ALL_GENDER_TYPES } from '@src/api/constants/data';
import { PostCreateHouseholdStaffReq } from '@src/api/household.api';
import AppKeyboardAvoidingView from '@src/components/custom/AppKeyboardAvoidingView';
import AppDateInput from '@src/components/forms/AppDateInput';
import AppPhoneInput from '@src/components/forms/AppPhoneInput';
import AppSelectInput from '@src/components/forms/AppSelectInput';
import AppTextInput from '@src/components/forms/AppTextInput';
import ProfilePhotoPicker from '@src/components/forms/ProfilePhotoPicker';
import SubmitButton from '@src/components/forms/SubmitButton';
import colors from '@src/configs/colors';
import { AppImageType } from '@src/types/default';
import Size from '@src/utils/useResponsiveSize';

interface Props {
  onDone: () => void;
  onBackClick: () => void;
  form: UseFormReturn<
    PostCreateHouseholdStaffReq,
    any,
    PostCreateHouseholdStaffReq
  >;
}

const HouseholdStaffFormStep = (props: Props): React.JSX.Element => {
  const { form, onDone, onBackClick } = props;

  const {
    control,
    formState: { errors },
    setError,
    watch,
    handleSubmit,
    setValue,
  } = form;

  const [Photo, DateOfBirth] = watch(['Photo', 'DateOfBirth']);

  const handleImageSelect = (res: AppImageType) => {
    if (errors?.Photo?.message) setError('Photo', { message: undefined });
    setValue('Photo', res);
  };
  return (
    <AppKeyboardAvoidingView>
      <ScrollView contentContainerStyle={styles.container}>
        <ProfilePhotoPicker
          errorMessage={errors?.Photo?.message || ''}
          onDone={handleImageSelect}
          imageURL={Photo?.uri || ''}
        />

        <View style={styles.row}>
          <AppTextInput
            placeholder="First Name"
            label="First Name"
            control={control}
            name="FirstName"
            containerStyle={{ width: '47%' }}
          />
          <AppTextInput
            placeholder="Last Name"
            label="Last Name"
            control={control}
            name="LastName"
            containerStyle={{ width: '47%' }}
          />
        </View>

        <AppTextInput
          placeholder="Email Address"
          label="Email Address"
          control={control}
          name="Email"
          keyboardType="email-address"
        />

        <AppPhoneInput
          placeholder="Phone Number"
          label="Phone Number"
          control={control}
          name="PhoneNumber"
        />

        <AppSelectInput
          control={control}
          data={ALL_GENDER_TYPES}
          label="Select Gender"
          placeholder="Select Gender"
          name="Gender"
        />

        <AppDateInput
          label="Date of Birth (Optional)"
          mode="date"
          isOptional
          maximumDate={new Date()}
          value={DateOfBirth}
          errorMessage={errors?.DateOfBirth?.message || ''}
          setValue={value => {
            if (errors?.DateOfBirth?.message)
              setError('DateOfBirth', { message: undefined });
            setValue('DateOfBirth', value);
          }}
          placeholder="Date of Birth (Optional)"
        />

        <AppTextInput
          placeholder="Home Address"
          label="Home Address"
          control={control}
          name="HomeAddress"
        />
      </ScrollView>

      <View style={styles.footer}>
        <SubmitButton
          variant="SECONDARY"
          style={{ width: '47%' }}
          title="Go Back"
          onPress={onBackClick}
        />
        <SubmitButton
          title="Continue"
          style={{ width: '47%' }}
          onPress={handleSubmit(onDone)}
        />
      </View>
    </AppKeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Size.calcWidth(21),
    rowGap: Size.calcHeight(26),
    paddingVertical: Size.calcHeight(26),
  },

  footer: {
    paddingTop: Size.calcHeight(16),
    paddingBottom: Size.calcHeight(16 * 3),
    borderTopColor: colors.WHITE_300,
    borderTopWidth: Size.calcAverage(1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Size.calcWidth(21),
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default HouseholdStaffFormStep;
