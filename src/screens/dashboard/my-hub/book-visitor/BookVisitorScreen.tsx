import { useQueryClient } from '@tanstack/react-query';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { postBookVisitor, PostBookVisitorReq } from '@src/api/visitors.api';
import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import InformationRow from '@src/components/common/InformationRow';
import SwitchPropertyRow from '@src/components/common/SwitchPropertyRow';
import AppDateInput from '@src/components/forms/AppDateInput';
import AppPhoneInput from '@src/components/forms/AppPhoneInput';
import AppTextInput from '@src/components/forms/AppTextInput';
import SubmitButton from '@src/components/forms/SubmitButton';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import { useAppStateStore } from '@src/stores/appState.store';
import { useAuthStore } from '@src/stores/auth.store';
import { appToast } from '@src/utils/appToast';
import { handleToastApiError } from '@src/utils/handleErrors';
import { joiSchemas } from '@src/utils/schema';
import Size from '@src/utils/useResponsiveSize';
import queryKeys from '@src/api/constants/queryKeys';

const schema = Joi.object<PostBookVisitorReq>({
  fullName: joiSchemas.name.label('Full name'),
  phoneNumber: joiSchemas.phone.label('Phone number'),
  dateOfVisitation: Joi.string().required().label('Date of visitation'),
});

const BookVisitorScreen = (): React.JSX.Element => {
  const { setActiveModal, closeActiveModal, setIsAppModalLoading } =
    useAppStateStore();
  const queryClient = useQueryClient();
  const { selectedProperty } = useAuthStore();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setError,
    setValue,
  } = useForm<PostBookVisitorReq>({
    resolver: joiResolver(schema),
    defaultValues: {
      dateOfVisitation: new Date().toISOString(),
    },
  });
  const navigation = useAppNavigator();
  const dateOfVisitation = watch('dateOfVisitation');

  const handleBook = async (data: PostBookVisitorReq) => {
    const formattedData: PostBookVisitorReq = {
      dateOfVisitation: data?.dateOfVisitation,
      fullName: data?.fullName?.trim(),
      phoneNumber: data?.phoneNumber?.trim(),
      propertyUnitId: selectedProperty?.id!,
    };

    setIsAppModalLoading(true);
    const response = await postBookVisitor(formattedData);
    setIsAppModalLoading(false);

    if (response.ok && response?.data) {
      queryClient.resetQueries({ queryKey: [queryKeys.GET_VISITOR_BOOKINGS] });
      closeActiveModal();
      navigation.replace(
        routes.BOOK_VISITOR_SUCCESS_SCREEN,
        response?.data?.data,
      );
    } else {
      handleToastApiError(response);
    }
  };

  const onSubmit = handleSubmit(data => {
    if (!selectedProperty?.id)
      return appToast.Warning('Invalid property selected.');

    setActiveModal({
      modalType: 'PROMT_MODAL',
      promptModal: {
        title: 'Are you sure?',
        description:
          'You are about to book a new visitor. Are you sure you want to continue?',
        noButtonTitle: 'Cancel',
        yesButtonTitle: "Yes, I'm Sure",
        onYesButtonClick: () => handleBook(data),
      },
    });
    return;
  });

  return (
    <AppScreen showDownInset style={styles.container}>
      <AppScreenHeader>
        <View>
          <AppText style={styles.headerTitle}>Book Visitor</AppText>
          <SwitchPropertyRow />
        </View>
      </AppScreenHeader>

      <View style={styles.formContainer}>
        <View style={styles.formContent}>
          <AppTextInput
            placeholder="Full Name"
            label="Full Name"
            control={control}
            name="fullName"
          />

          <AppPhoneInput
            placeholder="Phone Number"
            label="Phone Number"
            control={control}
            name="phoneNumber"
          />

          <AppDateInput
            errorMessage={errors?.dateOfVisitation?.message || ''}
            label="Date of Visitation"
            mode="date"
            description="Access code expires at midnight of this date"
            minimumDate={new Date()}
            value={dateOfVisitation}
            setValue={value => {
              if (errors?.dateOfVisitation?.message)
                setError('dateOfVisitation', { message: undefined });
              setValue('dateOfVisitation', value);
            }}
            placeholder="Start Date"
          />
        </View>

        <View style={{ rowGap: Size.calcHeight(24) }}>
          <InformationRow title="We will generate an access code for you to share with this visitor." />
          <SubmitButton title="Continue" onPress={onSubmit} />
        </View>
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },

  formContainer: {
    paddingHorizontal: Size.calcWidth(21),
    justifyContent: 'space-between',
    flex: 1,
    paddingBottom: Size.calcHeight(30),
  },

  formContent: {
    rowGap: Size.calcHeight(30),
    paddingTop: Size.calcHeight(30),
  },

  headerTitle: {
    fontFamily: fonts.INTER_600,
    textAlign: 'center',
    fontSize: Size.calcAverage(16),
    color: colors.BLACK_200,
    paddingBottom: Size.calcHeight(2),
  },
});

export default BookVisitorScreen;
