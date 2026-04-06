import { UseFormReturn } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { PostEventReq } from '@src/api/events.api';
import AppText from '@src/components/AppText';
import AppMultiLineTextInput from '@src/components/forms/AppMultiLineTextInput';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';

interface Props {
  form: UseFormReturn<PostEventReq, any, PostEventReq>;
}

const EventMessageStep = ({ form }: Props): React.JSX.Element => {
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <View style={styles.container}>
      <AppText style={{ fontFamily: fonts.INTER_600 }}>
        Message to security guards (Optional)
      </AppText>
      <AppText style={styles.subtitle}>
        This message will be displayed to the security guards as a message or
        instruction when they check-in your guests.
      </AppText>

      <AppMultiLineTextInput
        placeholder="Leave a message"
        label=""
        control={control}
        name="SecurityGuardMessage"
      />

      <AppText
        style={{ fontFamily: fonts.INTER_600, paddingTop: Size.calcHeight(50) }}
      >
        Message to estate manager (Optional)
      </AppText>
      <AppText style={styles.subtitle}>
        Add any message or information that will aid the estate manager in
        approving your event request.
      </AppText>
      <AppMultiLineTextInput
        placeholder="Leave a message"
        label=""
        name="EstateManagerMessage"
        control={control}
        errorMessage={errors?.EstateManagerMessage?.message}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(16),
  },

  subtitle: {
    paddingBottom: Size.calcHeight(25),
    paddingTop: Size.calcHeight(4),
  },
});

export default EventMessageStep;
