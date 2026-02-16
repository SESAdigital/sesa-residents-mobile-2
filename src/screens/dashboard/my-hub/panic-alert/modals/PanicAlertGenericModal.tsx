import { StyleSheet, View } from 'react-native';
import { Source } from 'react-native-fast-image';

import AppImage from '@src/components/AppImage';
import AppText from '@src/components/AppText';
import SubmitButton from '@src/components/forms/SubmitButton';
import colors from '@src/configs/colors';
import { useAppStateStore } from '@src/stores/appState.store';
import Size from '@src/utils/useResponsiveSize';
import fonts from '@src/configs/fonts';

interface Props {
  title: string;
  description: string;
  noButtonTitle?: string;
  yesButtonTitle: string;
  onNoButtonClick?: (() => void) | null;
  onYesButtonClick: () => void;
  icon: Source;
}

const PanicAlertGenericModal = (props: Props): React.JSX.Element => {
  const {
    description,
    icon,
    noButtonTitle = 'Cancel',
    onYesButtonClick,
    title,
    yesButtonTitle,
    onNoButtonClick,
  } = props;

  const { closeActiveModal } = useAppStateStore();

  const onCloseClick = () => {
    if (onNoButtonClick) {
      onNoButtonClick();
    } else {
      closeActiveModal();
    }
  };

  return (
    <View style={styles.container}>
      <AppImage source={icon} style={styles.icon} />
      <AppText style={styles.title}>{title}</AppText>
      <AppText style={styles.description}>{description}</AppText>

      <View style={styles.buttonContainer}>
        <SubmitButton title={yesButtonTitle} onPress={onYesButtonClick} />

        {onNoButtonClick !== null && (
          <SubmitButton
            onPress={onCloseClick}
            title={noButtonTitle}
            variant="SECONDARY"
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    rowGap: Size.calcHeight(20),
    paddingTop: Size.calcHeight(31),
  },

  container: {
    backgroundColor: colors.WHITE_100,
    borderRadius: Size.calcAverage(12),
    overflow: 'hidden',
    paddingVertical: Size.calcHeight(23),
    paddingHorizontal: Size.calcWidth(30),
  },

  description: {
    textAlign: 'center',
    color: colors.GRAY_100,
  },

  icon: {
    height: Size.calcAverage(50),
    width: Size.calcAverage(50),
    marginHorizontal: 'auto',
  },

  title: {
    paddingTop: Size.calcHeight(16),
    paddingBottom: Size.calcHeight(8),
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(16),
    textAlign: 'center',
  },
});

export default PanicAlertGenericModal;
