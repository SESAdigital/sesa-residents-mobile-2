import { Modal, StyleSheet, View } from 'react-native';

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
}

const AppModal = (): React.ReactNode => {
  const { activeModal, closeActiveModal } = useAppStateStore();
  // const handleOutPress = () => {
  //   if (activeModal?.shouldBackgroundClose) closeActiveModal();
  // };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={!!activeModal}
      onRequestClose={
        !!activeModal?.shouldBackgroundClose
          ? closeActiveModal
          : activeModal?.onRequestClose
      }
    >
      <View style={styles.container}>
        {/* <Pressable onPress={() => {}} style={styles.inner}> */}
        <View style={styles.inner}>
          {activeModal?.modalType === 'EMPTY_MODAL' &&
            !!activeModal?.emptyModalComponent &&
            activeModal?.emptyModalComponent}

          {/* {activeModal?.modalType === 'PROMT_MODAL' &&
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
            )} */}
        </View>
      </View>
      {/* </Pressable> */}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.GRAY_300,
    // backgroundColor: 'red',
    flex: 1,
    justifyContent: 'center',
  },
  inner: {
    // marginHorizontal: 'auto',
    padding: Size.calcAverage(20),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

export default AppModal;
