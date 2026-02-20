import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation } from '@tanstack/react-query';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { ALL_METER_TYPES } from '@src/api/constants/data';
import { ElectricityMeterType } from '@src/api/constants/default';
import { verifyPowerEstate, VerifyPowerEstateReq } from '@src/api/power.api';
import QuickAmounts from '@src/components/common/QuickAmounts';
import AppKeyboardAvoidingView from '@src/components/custom/AppKeyboardAvoidingView';
import AppSelectInput from '@src/components/forms/AppSelectInput';
import AppTextInput from '@src/components/forms/AppTextInput';
import SubmitButton from '@src/components/forms/SubmitButton';
import { COMMON_ERRORS } from '@src/configs/common-errors';
import { useGetWalletBalance } from '@src/hooks/useGetRequests';
import { useAuthStore } from '@src/stores/auth.store';
import { formatMoneyValueIntoNumber } from '@src/utils';
import appConfig from '@src/utils/appConfig';
import { appToast } from '@src/utils/appToast';
import { handleToastApiError } from '@src/utils/handleErrors';
import Size from '@src/utils/useResponsiveSize';

const schema = Joi.object<VerifyPowerEstateReq>({
  Amount: Joi.string().required().max(100).label('Token amount'),
  MeterNumber: Joi.string().required().min(5).max(100).label('Meter number'),
  MeterType: Joi.string().required().label('Meter type'),
});

interface Props {
  onDone: () => void;
}

const EstateTokenFormSection = ({ onDone }: Props): React.JSX.Element => {
  const { handleSubmit, control, setValue } = useForm<VerifyPowerEstateReq>({
    resolver: joiResolver(schema),
  });
  const { data: walletBalance } = useGetWalletBalance();
  const verifyPowerEstateAPI = useMutation({ mutationFn: verifyPowerEstate });

  const { selectedProperty } = useAuthStore();

  const isLoading = verifyPowerEstateAPI?.isPending;

  const onSubmit = handleSubmit(async data => {
    if (isLoading) return;
    if (!selectedProperty?.id)
      return appToast.Info('Invalid property selected.');

    const Amount = formatMoneyValueIntoNumber(data?.Amount?.toString());

    if (!walletBalance?.amount)
      return appToast.Warning(COMMON_ERRORS.UNABLE_TO_GET_WALLET_BALANCE);

    if (Amount > walletBalance?.amount) {
      return appToast.Info(
        `You don't have enough balance to purchase this amount.`,
      );
    }

    if (Amount < appConfig.APP_MIMIMUM_ELECTRICITY_PURCHAGE_AMOUNT) {
      return appToast.Info(
        `${appConfig.APP_MIMIMUM_ELECTRICITY_PURCHAGE_AMOUNT} is the minimum amount to purchase.`,
      );
    }

    const reponse = await verifyPowerEstateAPI?.mutateAsync({
      Amount,
      MeterNumber: data?.MeterNumber?.trim(),
      MeterType: Number(data?.MeterType) as ElectricityMeterType,
      PropertyId: selectedProperty?.id,
    });

    if (reponse?.ok) {
      onDone();
    } else {
      handleToastApiError(reponse);
      onDone();
    }
    return;
  });

  return (
    <AppKeyboardAvoidingView>
      <View style={styles.container}>
        <View style={{ rowGap: Size.calcHeight(24) }}>
          <AppTextInput
            editable={!isLoading}
            placeholder="Meter Number"
            label="Meter Number"
            control={control}
            name="MeterNumber"
            keyboardType="number-pad"
          />

          <AppSelectInput
            control={control}
            disabled={isLoading}
            data={ALL_METER_TYPES}
            label="Meter Type"
            placeholder="Select meter type"
            name="MeterType"
          />
          <AppTextInput
            editable={!isLoading}
            placeholder="Token Amount"
            label={`Token Amount(${appConfig.NAIRA_SYMBOL})`}
            control={control}
            isMoneyValue
            name="Amount"
            keyboardType="numeric"
          />

          <QuickAmounts onSelect={amount => setValue('Amount', amount)} />
        </View>

        <SubmitButton
          isLoading={isLoading}
          title="Continue"
          onPress={onSubmit}
        />
      </View>
    </AppKeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Size.calcWidth(21),
    height: '92%',
    paddingVertical: Size.calcHeight(25),
    justifyContent: 'space-between',
  },
});

export default EstateTokenFormSection;
