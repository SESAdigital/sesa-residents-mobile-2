import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

import { ElectricityMeterType } from '@src/api/constants/default';
import { VerifyPowerEstateReq } from '@src/api/power.api';
import Size from '@src/utils/useResponsiveSize';
import AppSelectInput from '@src/components/forms/AppSelectInput';
import AppTextInput from '@src/components/forms/AppTextInput';

const schema = Joi.object<VerifyPowerEstateReq>({
  Amount: Joi.string().required().max(100),
  MeterNumber: Joi.string().required().max(100),
  MeterType: Joi.number<ElectricityMeterType>().required(),
});

const EstateTokenFormSection = (): React.JSX.Element => {
  const { handleSubmit, control, watch, getValues, setValue } =
    useForm<VerifyPowerEstateReq>({
      resolver: joiResolver(schema),
    });

  const onSubmit = handleSubmit(() => {});

  const isLoading = false;

  return (
    <View style={styles.container}>
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
        data={[...Array(100)]?.map((_, index) => ({
          title: index.toString(),
          value: index.toString(),
        }))}
        label="Meter Type"
        placeholder="Select Door"
        name="MeterType"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Size.calcWidth(21),
  },
});

export default EstateTokenFormSection;
