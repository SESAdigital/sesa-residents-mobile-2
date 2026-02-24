import { Activity, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import {
  postPurchaseDiscoPower,
  postPurchaseEstatePower,
  PostPurchaseRes,
  VerifyPowerDiscoResData,
} from '@src/api/power.api';
import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import { MaterialSymbolsContentCopyOutline } from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import useBackHandler from '@src/hooks/useBackHandler';
import { useGetWalletBalance } from '@src/hooks/useGetRequests';
import AppLoadingModal from '@src/modals/AppLoadingModal';
import { AppScreenProps } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import WalletPinInput from '@src/screens/auth/components/WalletPinInput';
import { copyTextToClipboard, formatMoneyToTwoDecimals } from '@src/utils';
import { appToast } from '@src/utils/appToast';
import { handleToastApiError } from '@src/utils/handleErrors';
import { dayJSFormatter } from '@src/utils/time';
import Size from '@src/utils/useResponsiveSize';
import { useMutation } from '@tanstack/react-query';
import { ApiResponse } from 'apisauce';
import ConfirmPurchaseSection from './sections/ConfirmPurchaseSection';
import ElectricDiscoTokenFormSection from './sections/ElectricDiscoTokenFormSection';
import EstateTokenFormSection from './sections/EstateTokenFormSection';

type Props = AppScreenProps<'BUY_POWER_FORM_SCREEN'>;

const BuyPowerFormScreen = (props: Props): React.JSX.Element => {
  const { navigation, route } = props;
  const screenType = route?.params?.screenType;
  const [currentStep, setCurrentStep] = useState(BuyTokenSteps.TOKEN_FORM_STEP);
  const { data } = useGetWalletBalance();
  const [verifiedData, setVerifiedData] =
    useState<VerifyPowerDiscoResData | null>(null);
  const [pin, setPin] = useState('');
  const postPurchaseDiscoPowerAPI = useMutation({
    mutationFn: postPurchaseDiscoPower,
  });
  const postPurchaseEstatePowerAPI = useMutation({
    mutationFn: postPurchaseEstatePower,
  });

  const isEstate = screenType === 'Estate token';

  const isLoading =
    postPurchaseDiscoPowerAPI?.isPending ||
    postPurchaseEstatePowerAPI?.isPending;

  const onBackPress = () => {
    if (isLoading) return;

    if (currentStep === BuyTokenSteps.TOKEN_FORM_STEP) {
      navigation.goBack();
    } else {
      setCurrentStep(val => val - 1);
    }
  };

  useBackHandler(onBackPress, currentStep);

  const handleSubmit = async () => {
    if (!verifiedData) return appToast.Warning('Invalid verified data.');

    let response: ApiResponse<PostPurchaseRes, PostPurchaseRes> | null = null;

    const genericData = {
      amount: verifiedData?.amount,
      meterNumber: verifiedData?.meterNumber,
      transactionPin: pin,
    };

    if (isEstate) {
      response = await postPurchaseEstatePowerAPI?.mutateAsync({
        ...genericData,
        meterType: verifiedData?.meterType,
      });
    } else {
      response = await postPurchaseDiscoPowerAPI?.mutateAsync({
        ...genericData,
        itemId: verifiedData?.itemId,
      });
    }

    if (response?.ok) {
      const resData = response?.data?.data;
      const token = resData?.token;
      appToast.Success(response?.data?.message || 'Purchase successful');
      navigation.replace(routes.TRANSACTION_SUCCESS_SCREEN, {
        title: 'Token Purchased',
        details: [
          {
            title: 'TRANSACTION REFERENCE',
            value: resData?.transacationRefrence || '',
          },
          {
            title: 'PURPOSE',
            value: resData?.purpose || '',
          },
          {
            title: 'Amount',
            value: formatMoneyToTwoDecimals({ amount: resData?.amount || 0 }),
          },
          {
            title: 'TOKEN',
            value: (
              <View style={styles.tokenContainer}>
                <AppText style={styles.tokenText}>{token}</AppText>
                {!!token && (
                  <TouchableOpacity
                    onPress={() =>
                      copyTextToClipboard({
                        text: token,
                        successText: 'Token Copied Successfully',
                        errorText: 'Failed to copy token to clipboard',
                      })
                    }
                    style={styles.copyButton}
                  >
                    <MaterialSymbolsContentCopyOutline
                      height={Size.calcAverage(14)}
                      width={Size.calcAverage(14)}
                      color={colors.BLUE_200}
                    />
                    <AppText style={styles.copyText}>Copy</AppText>
                  </TouchableOpacity>
                )}
              </View>
            ),
          },
          {
            title: 'TRANSACTION DATE',
            value: dayJSFormatter(
              resData?.transactionDate || '',
              'MMMM D, YYYY h:mm A',
            ),
          },
        ],
      });
    } else {
      handleToastApiError(response);
    }
    return;
  };

  const handleFirstStepDone = (val: VerifyPowerDiscoResData) => {
    setVerifiedData(val);
    setCurrentStep(BuyTokenSteps.CONFIRMATION_STEP);
  };

  const steps = [
    {
      title: screenType,
      subtitle: 'Enter details below',
      component: !screenType ? (
        <></>
      ) : isEstate ? (
        <EstateTokenFormSection onDone={handleFirstStepDone} />
      ) : (
        <ElectricDiscoTokenFormSection onDone={handleFirstStepDone} />
      ),
    },
    {
      title: 'Confirm Purchase',
      subtitle: 'Confirm details below',
      component: (
        <ConfirmPurchaseSection
          data={verifiedData}
          onConfirm={() => setCurrentStep(BuyTokenSteps.INPUT_PIN_STEP)}
        />
      ),
    },
    {
      title: '',
      subtitle: '',
      component: (
        <View style={styles.pinContainer}>
          <WalletPinInput
            pin={pin}
            onDone={handleSubmit}
            onPinChange={val => setPin(val)}
            title="Enter wallet PIN"
            subtitle={`Amount Due: ${formatMoneyToTwoDecimals({
              amount: verifiedData?.totalAmountToPay || 0,
            })}`}
          />
        </View>
      ),
    },
  ];

  const currentStepDetail = steps[currentStep - 1];

  return (
    <AppScreen>
      <AppLoadingModal isLoading={isLoading} title="Please wait..." />
      <AppScreenHeader
        onBackPress={onBackPress}
        title={currentStepDetail?.title}
      >
        <View style={{ height: Size.calcHeight(23) }} />
      </AppScreenHeader>
      {currentStep !== BuyTokenSteps.INPUT_PIN_STEP && (
        <View style={styles.bannerContainer}>
          <AppText style={styles.bannerText}>
            {currentStepDetail?.subtitle}
          </AppText>
          <AppText style={styles.bannerText}>
            Balance: {data?.formattedAmount}
          </AppText>
        </View>
      )}
      {steps?.map((step, index) => (
        <Activity
          key={index}
          mode={currentStep === index + 1 ? 'visible' : 'hidden'}
        >
          {step?.component}
        </Activity>
      ))}
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Size.calcHeight(6),
    paddingHorizontal: Size.calcWidth(21),
    backgroundColor: colors.WHITE_300,
  },

  bannerText: {
    color: colors.GRAY_100,
    fontSize: Size.calcAverage(12),
  },

  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: Size.calcWidth(4),
  },

  copyText: {
    fontFamily: fonts.INTER_500,
    fontSize: Size.calcWidth(13),
    color: colors.BLUE_200,
  },

  pinContainer: {
    flex: 1,
    paddingBottom: Size.calcHeight(40),
  },

  tokenContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  tokenText: {
    fontFamily: fonts.INTER_500,
    paddingRight: Size.calcWidth(10),
  },
});

export default BuyPowerFormScreen;

enum BuyTokenSteps {
  TOKEN_FORM_STEP = 1,
  CONFIRMATION_STEP,
  INPUT_PIN_STEP,
}
