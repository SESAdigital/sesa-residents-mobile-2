import { StyleSheet, View } from 'react-native';

import AppText from '@src/components/AppText';
import SubmitButton from '@src/components/forms/SubmitButton';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useAppStateStore } from '@src/stores/appState.store';
import Size from '@src/utils/useResponsiveSize';

export interface AppInformationModalProps {
  title: string;
  description: string | React.JSX.Element;
  buttonTitle?: string;
}

const AppInformationModal = (
  props: AppInformationModalProps,
): React.JSX.Element => {
  const { closeActiveModal } = useAppStateStore();

  const { title, description, buttonTitle } = props;
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>{title}</AppText>
      <AppText style={styles.text}>{description}</AppText>
      <SubmitButton
        title={buttonTitle || 'Okay, got it'}
        onPress={closeActiveModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE_100,
    paddingVertical: Size.calcHeight(26),
    paddingHorizontal: Size.calcWidth(21),
    borderRadius: Size.calcAverage(12),
  },

  text: {
    textAlign: 'center',
    color: colors.GRAY_100,
    paddingBottom: Size.calcHeight(46),
    maxWidth: Size.calcWidth(285),
    marginHorizontal: 'auto',
  },

  title: {
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(20),
    textAlign: 'center',
    paddingBottom: Size.calcHeight(8),
  },
});

export default AppInformationModal;
