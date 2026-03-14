import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { postPayBillInvoice } from '@src/api/bills.api';
import AppScreen from '@src/components/AppScreen';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import { useHandleTransactionRefresh } from '@src/hooks';
import AppLoadingModal from '@src/modals/AppLoadingModal';
import { AppScreenProps, useAppNavigator } from '@src/navigation/AppNavigator';
import WalletPinInput from '@src/screens/auth/components/WalletPinInput';
import { appToast } from '@src/utils/appToast';
import { handleToastApiError } from '@src/utils/handleErrors';
import PayInvoiceStep1 from './components/PayInvoiceStep1';
import routes from '@src/navigation/routes';
import { formatMoneyToTwoDecimals } from '@src/utils';

export interface PayInvoiceScreenProps {
  invoiceId: number;
  dueAmount: number;
  purpose: string;
}

type Props = AppScreenProps<'PAY_INVOICE_SCREEN'>;

const PayInvoiceScreen = ({ route }: Props): React.JSX.Element => {
  const [currentStep, setCurrentStep] = useState(1);
  const [confirmPin, setConfirmPin] = useState<string>('');
  const postPayBillInvoiceAPI = useMutation({ mutationFn: postPayBillInvoice });
  const params = route?.params;
  const { handleRefreshTransactionalData: handleRefreshTransactions } =
    useHandleTransactionRefresh();
  const navigation = useAppNavigator();
  const id = params?.invoiceId;
  const dueAmount = params?.dueAmount;

  const isLoading = postPayBillInvoiceAPI?.isPending;

  const handleDone = async (transactionPin: string) => {
    if (isLoading) return;

    if (!id) return appToast.Error('Invalid Invoice');

    const response = await postPayBillInvoiceAPI.mutateAsync({
      id,
      value: {
        transactionPin,
        amount: dueAmount,
      },
    });

    if (response?.ok) {
      handleRefreshTransactions();
      appToast.Success(response?.data?.message || 'Invoice paid successfully');
      navigation.replace(routes.TRANSACTION_SUCCESS_SCREEN, {
        title: 'Payment Successful',
        subTite:
          'We’ve received your payment and sent a transaction receipt to your email.',
        details: [
          {
            title: 'PURPOSE',
            value: params?.purpose,
          },
          {
            title: 'AMOUNT',
            value: formatMoneyToTwoDecimals({ amount: dueAmount }),
          },
          {
            title: 'PAYMENT METHOD',
            value: 'SESA Wallet',
          },
        ],
      });
    } else {
      handleToastApiError(response);
    }
    return;
  };

  const steps = [
    {
      title: 'Select Payment Method',
      component: <PayInvoiceStep1 onDone={() => setCurrentStep(2)} />,
    },
    {
      title: '',
      component: (
        <WalletPinInput
          pin={confirmPin}
          onDone={handleDone}
          onPinChange={val => setConfirmPin(val)}
          title="Enter wallet PIN"
          subtitle={`Amount Due: ${formatMoneyToTwoDecimals({
            amount: dueAmount,
          })}`}
        />
      ),
    },
  ];

  return (
    <AppScreen showDownInset>
      <AppScreenHeader
        containerStyle={{ borderBottomWidth: 0 }}
        title="Add Money"
      />
      {steps?.[currentStep - 1]?.component}
      <AppLoadingModal isLoading={isLoading} />
    </AppScreen>
  );
};

export default PayInvoiceScreen;
