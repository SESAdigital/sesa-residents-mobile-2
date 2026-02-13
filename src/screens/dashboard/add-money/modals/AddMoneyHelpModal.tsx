import { StyleSheet, TouchableOpacity, View } from 'react-native';

import AppText from '@src/components/AppText';
import AppModalHeader from '@src/components/common/AppModalHeader';
import SubmitButton from '@src/components/forms/SubmitButton';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useAppStateStore } from '@src/stores/appState.store';
import { openURL } from '@src/utils';
import appConfig from '@src/utils/appConfig';
import Size from '@src/utils/useResponsiveSize';

const AddMoneyHelpModal = (): React.ReactNode => {
  const { closeActiveModal } = useAppStateStore();
  return (
    <View style={styles.container}>
      <AppModalHeader title="Need help?" onBackPress={closeActiveModal} />

      <View style={styles.outerContainer}>
        <TouchableOpacity
          onPress={() => openURL(`mailto:${appConfig.APP_SUPPORT_EMAIL}`)}
          style={styles.content}
        >
          <AppText style={styles.emailText}>Send us an email</AppText>
          <AppText style={[styles.emailText, { color: colors.BLUE_200 }]}>
            {appConfig.APP_SUPPORT_EMAIL}
          </AppText>
        </TouchableOpacity>

        <SubmitButton
          title="Close"
          variant="SECONDARY"
          onPress={closeActiveModal}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE_100,
    borderRadius: Size.calcAverage(12),
    overflow: 'hidden',
  },

  content: {
    marginHorizontal: 'auto',
    alignItems: 'center',
    marginTop: Size.calcHeight(21),
    marginBottom: Size.calcHeight(42),
  },

  emailText: {
    fontFamily: fonts.INTER_500,
  },

  outerContainer: {
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(30),
  },
});

export default AddMoneyHelpModal;
