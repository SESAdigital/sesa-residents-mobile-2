import { StyleSheet, View } from 'react-native';

import UnavailableIcon from '@src/assets/images/icons/unavailable-icon.png';
import AppImage from '@src/components/AppImage';
import AppText from '@src/components/AppText';
import SubmitButton from '@src/components/forms/SubmitButton';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useAppStateStore } from '@src/stores/appState.store';
import Size from '@src/utils/useResponsiveSize';

interface Props {
  title: string;
  description: string;
  buttonTitle: string;
  secondaryButtonTitle: string;
  onButtonPress: () => void;
}

const AppRestrictedModal = (props: Props): React.JSX.Element => {
  const {
    buttonTitle,
    description,
    onButtonPress,
    title,
    secondaryButtonTitle,
  } = props;
  const { closeActiveModal } = useAppStateStore();

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <AppImage style={styles.image} source={UnavailableIcon} />
        <AppText style={styles.title}>{title}</AppText>
        <AppText style={styles.description}>{description}</AppText>
        <View style={styles.footer}>
          <SubmitButton
            onPress={onButtonPress}
            style={{ width: '100%' }}
            title={buttonTitle}
          />
          <SubmitButton
            onPress={closeActiveModal}
            variant="SECONDARY"
            style={{ width: '100%' }}
            title={secondaryButtonTitle}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE_100,
    borderRadius: Size.calcAverage(12),
    overflow: 'hidden',
    alignItems: 'center',
    paddingVertical: Size.calcHeight(30),
  },

  contentContainer: {
    width: '100%',
    maxWidth: Size.calcWidth(300),
    alignItems: 'center',
  },

  description: {
    color: colors.GRAY_100,
    textAlign: 'center',
    marginHorizontal: 'auto',
    paddingTop: Size.calcHeight(8),
  },

  footer: {
    rowGap: Size.calcHeight(20),
    paddingTop: Size.calcHeight(31),
    width: '100%',
  },

  image: {
    aspectRatio: 1,
    height: Size.calcAverage(60),
  },

  title: {
    paddingTop: Size.calcHeight(8),
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(16),
  },
});

export default AppRestrictedModal;
