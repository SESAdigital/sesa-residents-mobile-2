import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ImagePickerResponse } from 'react-native-image-picker';

import images from '@src/assets/images';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import AppActionsModal from '@src/modals/AppActionsModal';
import { useAppStateStore } from '@src/stores/appState.store';
import { AppImageType } from '@src/types/default';
import { defaultSelectImageOptions } from '@src/utils/imageSelect';
import Size from '@src/utils/useResponsiveSize';
import AppImage from '../AppImage';
import AppText from '../AppText';
import { MaterialSymbolsPhotoCameraRounded } from '../icons';
import ErrorMessage from './ErrorMessage';

interface Props {
  onDone: (val: AppImageType) => void;
  imageURL: string;
  errorMessage: string;
}

const ProfilePhotoPicker = (props: Props): React.JSX.Element => {
  const { imageURL, onDone, errorMessage } = props;
  const { setActiveModal } = useAppStateStore();

  const handleAdd = (res: ImagePickerResponse | null) => {
    const firstImage = res?.assets?.[0];
    if (firstImage) {
      onDone(firstImage);
    }
  };

  const actions = defaultSelectImageOptions({ handleAdd, itemsLeft: 1 });

  const handlePick = () => {
    setActiveModal({
      modalType: 'EMPTY_MODAL',
      shouldBackgroundClose: true,
      emptyModalComponent: <AppActionsModal actions={actions} />,
    });
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity onPress={handlePick} style={{ alignItems: 'center' }}>
        <View style={styles.imageDimensions}>
          <View style={styles.imageOverlay}>
            <MaterialSymbolsPhotoCameraRounded
              height={Size.calcAverage(24)}
              width={Size.calcAverage(24)}
              color={colors.WHITE_200}
            />
          </View>
          <AppImage
            source={{ uri: imageURL || images.avatarCircle }}
            style={styles.image}
          />
        </View>
        <AppText style={styles.text}>Set profile photo</AppText>
      </TouchableOpacity>
      <ErrorMessage style={{ textAlign: 'center' }} message={errorMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},

  imageDimensions: {
    aspectRatio: 1,
    width: Size.calcAverage(70),
    borderRadius: 100,
    position: 'relative',
    overflow: 'hidden',
  },

  image: {
    objectFit: 'cover',
    height: '100%',
    width: '100%',
  },

  imageOverlay: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.GRAY_800,
    position: 'absolute',
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: Size.calcAverage(12),
    fontFamily: fonts.INTER_500,
    color: colors.BLUE_200,
    paddingTop: Size.calcHeight(8),
    textAlign: 'center',
  },
});

export default ProfilePhotoPicker;
