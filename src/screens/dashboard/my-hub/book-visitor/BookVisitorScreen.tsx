import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { PostBookVisitorReq } from '@src/api/visitors.api';
import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import SwitchPropertyRow from '@src/components/common/SwitchPropertyRow';
import AppPhoneInput from '@src/components/forms/AppPhoneInput';
import AppTextInput from '@src/components/forms/AppTextInput';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { joiSchemas } from '@src/utils/schema';
import Size from '@src/utils/useResponsiveSize';

const schema = Joi.object<PostBookVisitorReq>({
  propertyUnitId: Joi.number().required(),
  fullName: Joi.string().required(),
  phoneNumber: joiSchemas.phone,
  dateOfVisitation: Joi.string().required(),
});

const BookVisitorScreen = (): React.JSX.Element => {
  const { handleSubmit, reset, control, watch, getValues, setValue } =
    useForm<PostBookVisitorReq>({
      resolver: joiResolver(schema),
    });

  return (
    <AppScreen style={styles.container}>
      <AppScreenHeader>
        <View>
          <AppText style={styles.headerTitle}>Book Visitor</AppText>
          <SwitchPropertyRow />
        </View>
      </AppScreenHeader>

      <View style={styles.formContainer}>
        <View style={{ rowGap: Size.calcHeight(26) }}>
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
