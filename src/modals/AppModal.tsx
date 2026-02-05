import {
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import colors from '@src/configs/colors';
import { useAppStateStore } from '@src/stores/appState.store';
import Size from '@src/utils/useResponsiveSize';
import { JSX } from 'react';

export interface AppModalProps {
  modalType:
    | 'EMPTY_MODAL'
    | 'PROMT_MODAL'
    | 'SINGLE_PROMPT_MODAL'
    | 'REASON_MODAL';
  shouldBackgroundClose?: boolean;
  emptyModalComponent?: JSX.Element;
  // promptModal?: AppPromptModalProps;
  // singlePromptModal?: SinglePromptModalProps;
  // reasonModal?: AppReasonModalProps;
  onRequestClose?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const AppModal = (): React.ReactNode => {
  const { activeModal, closeActiveModal } = useAppStateStore();
  // const handleOutPress = () => {
  //   if (activeModal?.shouldBackgroundClose) closeActiveModal();
  // };

  const onClose = () => {
    if (activeModal?.shouldBackgroundClose) {
      closeActiveModal();
    } else {
      activeModal?.onRequestClose?.();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={!!activeModal}
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={[styles.container, activeModal?.containerStyle]}>
        {activeModal?.modalType === 'EMPTY_MODAL' &&
          !!activeModal?.emptyModalComponent &&
          activeModal?.emptyModalComponent}
      </View>
      {/* <View style={styles.container}>
         <Pressable onPress={() => {}} style={styles.inner}>
        <View style={styles.inner}>
          {activeModal?.modalType === 'EMPTY_MODAL' &&
            !!activeModal?.emptyModalComponent &&
            activeModal?.emptyModalComponent}

          {activeModal?.modalType === 'PROMT_MODAL' &&
            !!activeModal?.promptModal && (
              <AppPromptModal {...activeModal.promptModal} />
            )}

          {activeModal?.modalType === 'SINGLE_PROMPT_MODAL' &&
            !!activeModal?.singlePromptModal && (
              <SinglePromptModal {...activeModal.singlePromptModal} />
            )}
          {activeModal?.modalType === 'REASON_MODAL' &&
            !!activeModal?.reasonModal && (
              <AppReasonModal {...activeModal.reasonModal} />
            )} 
        </View>
      </View>   */}
      {/* </Pressable> */}
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.GRAY_800,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: Size.calcAverage(20),
  },
});

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     backgroundColor: colors.GRAY_300,
//     // backgroundColor: 'red',
//     flex: 1,
//     justifyContent: 'center',
//   },
//   inner: {
//     // marginHorizontal: 'auto',
//     padding: Size.calcAverage(20),
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '100%',
//   },
// });

export default AppModal;
