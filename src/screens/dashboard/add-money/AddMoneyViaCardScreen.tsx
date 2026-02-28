import { joiResolver } from '@hookform/resolvers/joi';
import { useQueryClient } from '@tanstack/react-query';
import Joi from 'joi';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { usePaystack } from 'react-native-paystack-webview';
import { PaystackTransactionResponse } from 'react-native-paystack-webview/production/lib/types';

import queryKeys from '@src/api/constants/queryKeys';
import {
  postWalletCompleteCardTopUp,
  postWalletInitiateCardTopUp,
  PostWalletInitiateCardTopUpReq,
} from '@src/api/wallets.api';
import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import QuickAmounts from '@src/components/common/QuickAmounts';
import AppTextInput from '@src/components/forms/AppTextInput';
import SubmitButton from '@src/components/forms/SubmitButton';
import { PaystackIcon } from '@src/components/icons/custom';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useGetUserDetails } from '@src/hooks/useGetRequests';
import AppLoadingModal from '@src/modals/AppLoadingModal';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import { useAppStateStore } from '@src/stores/appState.store';
import {
  formatMoneyToTwoDecimals,
  formatMoneyValueIntoNumber,
} from '@src/utils';
import { appToast } from '@src/utils/appToast';
import { handleToastApiError } from '@src/utils/handleErrors';
import Size from '@src/utils/useResponsiveSize';
import AddMoneyBanner from './components/AddMoneyBanner';

const schema = Joi.object<PostWalletInitiateCardTopUpReq>({
  amount: Joi.string().required().max(100),
});

const minimumDepoosit = 1_000;

const AddMoneyViaCardScreen = (): React.JSX.Element => {
  const { handleSubmit, control, setValue, reset } =
    useForm<PostWalletInitiateCardTopUpReq>({
      resolver: joiResolver(schema),
    });
  const queryClient = useQueryClient();
  const [isVerifying, setIsVerifying] = useState(false);
  const { setActiveModal, setIsAppModalLoading, closeActiveModal } =
    useAppStateStore();
  const { details } = useGetUserDetails();
  const { popup } = usePaystack();
  const navigation = useAppNavigator();
  const handleDepositConfirmation = async (
    res: PaystackTransactionResponse,
    amount: number,
  ) => {
    setIsVerifying(true);
    const response = await postWalletCompleteCardTopUp({
      transactionReference: res?.reference,
    });
    setIsVerifying(false);

    if (response?.ok) {
      reset?.();
      queryClient.resetQueries({ queryKey: [queryKeys.GET_WALLET_BALANCE] });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_WALLET_TRANSACTIONS],
      });
      // appToast.Success(response?.data?.message || 'Payment successful');
      navigation.navigate(routes.TRANSACTION_SUCCESS_SCREEN, {
        title: 'Wallet Funded',

        details: [
          {
            title: 'TRANSACTION REFERENCE',
            value: res?.reference,
          },
          {
            title: 'PURPOSE',
            value: 'Wallet Funding',
          },
          {
            title: 'AMOUNT',
            value: formatMoneyToTwoDecimals({ amount }),
          },
          {
            title: 'PAYMENT METHOD',
            value: 'Online - Paystack',
          },
        ],
      });
    } else {
      handleToastApiError(response);
    }
  };

  const handlePaystackPayment = (amount: number, reference: string) => {
    popup.checkout({
      email: details?.email || '',
      amount,
      reference,
      onSuccess: val => handleDepositConfirmation(val, amount),
      onCancel: () => appToast.Info('Payment cancelled by user'),
      // FUTURE ERORR LOGGING
      onError: err =>
        appToast.Warning(
          `An erorr occured while loading payment provider, try again: ${err}`,
        ),
    });
  };

  const handleDone = async (amount: number) => {
    setIsAppModalLoading(true);
    const response = await postWalletInitiateCardTopUp({ amount });
    setIsAppModalLoading(false);
    if (response?.ok && response?.data?.data) {
      closeActiveModal();
      handlePaystackPayment(amount, response?.data?.data);
    } else {
      handleToastApiError(response);
    }
  };

  const onSubmit = handleSubmit(async data => {
    const amount = formatMoneyValueIntoNumber(data?.amount?.toString());
    if (amount < minimumDepoosit) {
      return appToast.Info(`Minimum deposit amount is ${minimumDepoosit}`);
    }

    if (!details?.email) {
      return appToast.Warning('User email not found.');
    }

    setActiveModal({
      modalType: 'PROMT_MODAL',
      promptModal: {
        title: 'Add money?',
        description:
          'You will be redirected to a 3rd party provider to complete your transaction.',
        onYesButtonClick: () => handleDone(amount),
        yesButtonTitle: 'Yes, continue',
        noButtonTitle: 'Cancel',
      },
    });

    return;
  });

  return (
    <AppScreen>
      <AppLoadingModal title="Verifying transaction" isLoading={isVerifying} />
      <AppScreenHeader title="Fund Via Card" />
      <AddMoneyBanner title="Enter funding amount" />

      <View style={styles.container}>
        <View style={{ rowGap: Size.calcHeight(24) }}>
          <AppTextInput
            placeholder="0.00"
            label="Amount"
            control={control}
            isMoneyValue
            name="amount"
            keyboardType="numeric"
          />
          <QuickAmounts onSelect={val => setValue('amount', val)} />
        </View>

        <View>
          <View style={styles.row}>
            <AppText style={styles.powerText}>Powered by</AppText>
            <PaystackIcon size={Size.calcAverage(12)} color="#0BA4DB" />
            <AppText style={styles.powerText}>Paystack</AppText>
          </View>
          <SubmitButton title="Continue" onPress={onSubmit} />
        </View>
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Size.calcHeight(26),
    paddingHorizontal: Size.calcWidth(21),
    justifyContent: 'space-between',
    height: '80%',
  },

  powerText: {
    fontFamily: fonts.INTER_500,
    color: colors.GRAY_100,
  },

  row: {
    flexDirection: 'row',
    paddingBottom: Size.calcHeight(16),
    columnGap: Size.calcWidth(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddMoneyViaCardScreen;
// <Paystack

//                 billingEmail={profile?.email}
//                 activityIndicatorColor="green"
//                 onCancel={(e) => {
//                      console.log(e);
//                      showErrorMessage("Sorry, the payment process could not be completed", "Payment failed", { confirmLabel: "Ok, got it" })
//                      router.back();
//                 }}
//                 onSuccess={(res) => {
//                      if (res?.transactionRef) {
//                           //@ts-ignore
//                           dispatch(completeCardPayment(res?.transactionRef?.reference ?? "", {
//                                onErrors(_, ex) {
//                                     //@ts-ignore
//                                     showErrorMessage(ex?.response?.data?.message ?? "We encountered an error processing your transaction. Please try again.", "Payment failed", { confirmLabel: "Ok, got it" })
//                                     router.back();
//                                },
//                                onComplete() {
//                                     dispatch(setPaymentForm({}))
//                                     dispatch(fetchWalletBalance())
//                                     dispatch(fetchUnreadCount())
//                                     dispatch(setPaymentResult({
//                                          amount: paymentForm?.amount,
//                                          paymentMethodText: "Online - Paystack",
//                                          purpose: "Wallet Funding",
//                                          //@ts-ignore
//                                          transactionRef: res.transactionRef?.reference ?? "No reference",
//                                     } as IPaymentResult))
//                                     router.replace("/wallet/wallet-funded")
//                                }
//                           }))
//                      }
//                 }}
//                 autoStart={(profile?.email) ? true : false}
//            />
