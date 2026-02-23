import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation, useQuery } from '@tanstack/react-query';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import {
  getPowerDicsoBillers,
  verifyPowerDisco,
  VerifyPowerDiscoReq,
  VerifyPowerDiscoResData,
} from '@src/api/power.api';
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

const schema = Joi.object<VerifyPowerDiscoReq>({
  Amount: Joi.string().required().max(100).label('Token amount'),
  MeterNumber: Joi.string().required().min(5).max(100).label('Meter number'),
  ItemId: Joi.string().required().label('Electric disco'),
});

interface Props {
  onDone: (val: VerifyPowerDiscoResData) => void;
}

const ElectricDiscoTokenFormSection = (props: Props): React.JSX.Element => {
  const { onDone } = props;
  const { handleSubmit, control, setValue } = useForm<VerifyPowerDiscoReq>({
    resolver: joiResolver(schema),
  });
  const { data: walletBalance } = useGetWalletBalance();
  const verifyPowerDiscoAPI = useMutation({ mutationFn: verifyPowerDisco });

  const {
    data: powerDicsoBillers,
    isFetching: isLoadingPowerDicsoBillers,
    refetch,
  } = useQuery({
    queryKey: ['getPowerDicsoBillers'],
    queryFn: async () => {
      const response = await getPowerDicsoBillers();
      if (response.ok && response?.data) {
        return response?.data?.data;
      } else {
        handleToastApiError(response);
        return null;
      }
    },
  });

  const { selectedProperty } = useAuthStore();

  const isLoading = verifyPowerDiscoAPI?.isPending;

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

    const response = await verifyPowerDiscoAPI?.mutateAsync({
      Amount,
      MeterNumber: data?.MeterNumber?.trim(),
      ItemId: Number(data?.ItemId),
      PropertyId: selectedProperty?.id,
    });

    if (response?.ok && response?.data?.data) {
      onDone({
        ...response?.data?.data,
        itemId: Number(data?.ItemId),
      });
    } else {
      handleToastApiError(response);
    }
    return;
  });

  return (
    <AppKeyboardAvoidingView>
      <View style={styles.container}>
        <View style={{ rowGap: Size.calcHeight(24) }}>
          <AppSelectInput
            control={control}
            refetch={refetch}
            disabled={isLoading}
            isLoading={isLoadingPowerDicsoBillers}
            data={
              powerDicsoBillers?.map(({ name, id }) => ({
                title: name,
                value: id?.toString?.(),
              })) || []
            }
            label="Select Electric DISCO"
            placeholder="Electric DISCO"
            name="ItemId"
          />

          <AppTextInput
            editable={!isLoading}
            placeholder="Meter Number"
            label="Meter Number"
            control={control}
            name="MeterNumber"
            keyboardType="number-pad"
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

export default ElectricDiscoTokenFormSection;
