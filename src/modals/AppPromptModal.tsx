import { JSX } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import AppText from '@src/components/AppText';
import SubmitButton from '@src/components/forms/SubmitButton';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useAppStateStore } from '@src/stores/appState.store';
import Size from '@src/utils/useResponsiveSize';

export interface AppPromptModalProps {
  title: string;
  description: string | JSX.Element;
  noButtonTitle: string;
  yesButtonTitle: string;
  onNoButtonClick?: () => void;
  onYesButtonClick: () => void;
  isInverse?: boolean;
}

const AppPromptModal = (props: AppPromptModalProps): React.ReactNode => {
  const {
    title,
    description,
    yesButtonTitle,
    onYesButtonClick,
    noButtonTitle,
    onNoButtonClick,
    isInverse,
  } = props;
  const { isAppModalLoading, closeActiveModal } = useAppStateStore();

  const onCloseClick = () => {
    if (onNoButtonClick) {
      onNoButtonClick();
    } else {
      closeActiveModal();
    }
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>{title}</AppText>

      <ScrollView
        showsVerticalScrollIndicator
        style={{ maxHeight: Size.getHeight() / 1.9 }}
      >
        <AppText style={styles.subtitle}>{description}</AppText>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <SubmitButton
          style={styles.button}
          title={noButtonTitle}
          variant="SECONDARY"
          isLoading={!!isInverse && isAppModalLoading}
          disabled={isAppModalLoading}
          onPress={onCloseClick}
        />

        <SubmitButton
          title={yesButtonTitle}
          style={styles.button}
          isLoading={!isInverse && isAppModalLoading}
          disabled={isAppModalLoading}
          onPress={onYesButtonClick}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '48%',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Size.calcHeight(25),
  },

  container: {
    backgroundColor: colors.WHITE_100,
    borderRadius: Size.calcAverage(12),
    overflow: 'hidden',
    paddingVertical: Size.calcHeight(34),
    paddingHorizontal: Size.calcWidth(21),
  },

  subtitle: {
    textAlign: 'center',
    color: colors.GRAY_100,
  },

  title: {
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(20),
    textAlign: 'center',
    paddingBottom: Size.calcHeight(8),
  },
});

export default AppPromptModal;
