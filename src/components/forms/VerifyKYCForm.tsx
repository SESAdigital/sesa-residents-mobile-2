import { Activity } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ID_TYPES, STATES } from '@src/api/constants/data';
import {
  KYCVerificationType,
  KYCVerificationTypeData,
} from '@src/api/constants/default';
import {
  KYCDetails,
  postUtilitiesKYC,
  PostUtilitiesKYCReq,
} from '@src/api/utilities.api';
import AppKeyboardAvoidingView from '@src/components/custom/AppKeyboardAvoidingView';
import AppDateInput from '@src/components/forms/AppDateInput';
import AppSelectInput from '@src/components/forms/AppSelectInput';
import AppTextInput from '@src/components/forms/AppTextInput';
import SubmitButton from '@src/components/forms/SubmitButton';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useGetFees } from '@src/hooks/useGetRequests';
import { useAppStateStore } from '@src/stores/appState.store';
import { formatMoneyToTwoDecimals, formatPhoneNumberPrefill } from '@src/utils';
import appConfig from '@src/utils/appConfig';
import { appToast } from '@src/utils/appToast';
import { handleToastApiError } from '@src/utils/handleErrors';
import Size from '@src/utils/useResponsiveSize';
import AppText from '../AppText';
import { useQueryClient } from '@tanstack/react-query';
import queryKeys from '@src/api/constants/queryKeys';

interface Props {
  onDone: (value: KYCDetails | null) => void;
  onBackClick: () => void;
  form: UseFormReturn<PostUtilitiesKYCReq, null, PostUtilitiesKYCReq>;
}

const VerifyKYCForm = (props: Props): React.JSX.Element => {
  const { onDone, onBackClick, form } = props;
  const {
    control,
    formState: { errors },
    setError,
    watch,
    handleSubmit,
    setValue,
  } = form;
  const { data: feesData } = useGetFees();
  const [dateOfBirth, idType] = watch(['dateOfBirth', 'idType']);
  const { setActiveModal, setIsAppModalLoading, closeActiveModal } =
    useAppStateStore();
  const stringId = idType?.toString();
  const queryClient = useQueryClient();

  const isVotersCard =
    stringId === KYCVerificationTypeData.VotersCard?.toString();

  const onBackendSubmit = async (data: PostUtilitiesKYCReq) => {
    const { idNumber, dateOfBirth, firstName, lastName, lga, state } = data;
    const numIdType = Number(idType) as KYCVerificationType;

    setIsAppModalLoading(true);
    const response = await postUtilitiesKYC({
      idNumber,
      idType: numIdType,
      ...(lga ? { lga: lga?.trim() } : {}),
      ...(dateOfBirth ? { dateOfBirth: dateOfBirth } : {}),
      ...(firstName ? { firstName: firstName?.trim() } : {}),
      ...(lastName ? { lastName: lastName?.trim() } : {}),
      ...(state ? { lastName: state } : {}),
    });
    setIsAppModalLoading(false);

    if (response?.ok && !!response?.data) {
      const formattedKYCDetails = {
        req: { idNumber, idType },
        res: {
          ...response?.data?.data,
          phoneNumber: formatPhoneNumberPrefill(
            response?.data?.data?.phoneNumber || '',
          ),
          photo:
            response?.data?.data?.photo === appConfig.NOT_AVAILABLE_PHOTO
              ? ''
              : response?.data?.data?.photo,
        },
      };
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_WALLET_BALANCE],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_WALLET_TRANSACTIONS],
      });
      closeActiveModal();
      onDone(formattedKYCDetails);
    } else {
      handleToastApiError(response);
    }
  };

  const onSubmit = handleSubmit(async data => {
    const isVerified = handleVerification(data, idType);

    if (!isVerified) return;

    setActiveModal({
      modalType: 'PROMT_MODAL',
      promptModal: {
        title: 'Run KYC verification?',
        description: `${formatMoneyToTwoDecimals({
          amount: feesData?.kycFee || 0,
        })} will be deducted from your wallet. Are you sure you want to continue?`,
        onYesButtonClick: () => onBackendSubmit(data),
        yesButtonTitle: 'Yes, I’m Sure',
        noButtonTitle: 'No, Cancel',
      },
    });
  });

  return (
    <AppKeyboardAvoidingView>
      {/* <AppLoadingModal isLoading={postUtilitiesKYCAPI?.isPending} /> */}
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <AppText style={{ fontFamily: fonts.INTER_600 }}>
            Select ID and enter required details
          </AppText>
          <AppText style={styles.subtitle}>
            Successful KYC will populate details in the next step.
          </AppText>
        </View>
        <AppSelectInput
          control={control}
          data={ID_TYPES}
          label="Select ID type"
          placeholder="Select ID type"
          name="idType"
        />

        <Activity mode={!!idType ? 'visible' : 'hidden'}>
          <AppTextInput
            placeholder="Enter ID Number"
            label="ID Number"
            control={control}
            name="idNumber"
          />

          <Activity
            mode={
              stringId === KYCVerificationTypeData.VotersCard?.toString() ||
              stringId === KYCVerificationTypeData.DriversLicense?.toString() ||
              stringId === KYCVerificationTypeData.IntlPassport?.toString()
                ? 'visible'
                : 'hidden'
            }
          >
            <View style={styles.row}>
              <Activity mode={isVotersCard ? 'visible' : 'hidden'}>
                <AppTextInput
                  placeholder="First Name"
                  label="First Name"
                  control={control}
                  name="firstName"
                  containerStyle={{ width: '47%' }}
                />
              </Activity>

              <AppTextInput
                placeholder="Last Name"
                label="Last Name"
                control={control}
                name="lastName"
                containerStyle={{ width: !isVotersCard ? '100%' : '47%' }}
              />
            </View>

            <Activity
              mode={
                stringId === KYCVerificationTypeData.IntlPassport?.toString()
                  ? 'hidden'
                  : 'visible'
              }
            >
              <AppDateInput
                label="Date of Birth"
                mode="date"
                isOptional
                maximumDate={new Date()}
                value={dateOfBirth || ''}
                errorMessage={errors?.dateOfBirth?.message || ''}
                setValue={value => {
                  if (errors?.dateOfBirth?.message)
                    setError('dateOfBirth', { message: undefined });
                  setValue('dateOfBirth', value);
                }}
                placeholder="Date of Birth (Optional)"
              />
            </Activity>
            <Activity mode={isVotersCard ? 'visible' : 'hidden'}>
              <AppSelectInput
                control={control}
                data={STATES}
                label="State"
                placeholder="Select State"
                name="state"
              />

              <AppTextInput
                placeholder="Local Govt. Area"
                label="Local Govt. Area"
                control={control}
                name="lga"
              />
            </Activity>
          </Activity>
        </Activity>
      </ScrollView>

      <View style={styles.footer}>
        <SubmitButton
          variant="SECONDARY"
          style={{ width: '47%' }}
          title="Cancel"
          onPress={onBackClick}
        />
        <SubmitButton
          title="Continue"
          style={{ width: '47%' }}
          onPress={onSubmit}
        />
      </View>
    </AppKeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Size.calcWidth(21),
    rowGap: Size.calcHeight(26),
    paddingTop: Size.calcHeight(26),
    paddingBottom: Size.calcHeight(52),
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

  subtitle: {
    fontFamily: fonts.INTER_400,
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
    paddingTop: Size.calcHeight(4),
  },
});

export default VerifyKYCForm;

function handleVerification(
  data: PostUtilitiesKYCReq,
  idType: number,
): boolean {
  if (!idType) {
    appToast.Error('Invalid id type');
    return false;
  }

  const idNo = Number(idType);

  if (isNaN(idNo)) return false;

  if (idNo == KYCVerificationTypeData.VotersCard) {
    if (!data?.firstName) {
      appToast.Warning('First name is required');
      return false;
    }
    if (!data?.lastName) {
      appToast.Warning('Last name is required');
      return false;
    }
    if (!data?.dateOfBirth) {
      appToast.Warning('Date of birth is required');
      return false;
    }
    if (!data?.lga) {
      appToast.Warning('LGA is required');
      return false;
    }
    if (!data?.state) {
      appToast.Warning('State is required');
      return false;
    }
  }

  if (idNo == KYCVerificationTypeData.IntlPassport) {
    if (!data?.lastName) {
      appToast.Warning('Last name is required');
      return false;
    }
  }
  if (idNo == KYCVerificationTypeData.DriversLicense) {
    if (!data?.lastName) {
      appToast.Warning('Last name is required');
      return false;
    }
    if (!data?.dateOfBirth) {
      appToast.Warning('Date of birth is required');
      return false;
    }
  }

  return true;
}
