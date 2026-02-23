import { JSX } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { useAppStateStore } from '@src/stores/appState.store';
import AppModalContainer from './AppModalContainer';
import AppPromptModal, { AppPromptModalProps } from './AppPromptModal';
import AppInformationModal, {
  AppInformationModalProps,
} from './AppInformationModal';

export interface AppModalProps {
  modalType:
    | 'EMPTY_MODAL'
    | 'PROMT_MODAL'
    | 'INFORMATION_MODAL'
    | 'REASON_MODAL';
  shouldBackgroundClose?: boolean;
  emptyModalComponent?: JSX.Element;
  promptModal?: AppPromptModalProps;
  informationModal?: AppInformationModalProps;
  onRequestClose?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const AppModal = (): React.JSX.Element => {
  const { activeModal, closeActiveModal } = useAppStateStore();

  const onClose = () => {
    if (activeModal?.shouldBackgroundClose) {
      closeActiveModal();
    } else {
      activeModal?.onRequestClose?.();
    }
  };

  return (
    <AppModalContainer isVisible={!!activeModal} onClose={onClose}>
      {activeModal?.modalType === 'EMPTY_MODAL' &&
        !!activeModal?.emptyModalComponent &&
        activeModal?.emptyModalComponent}

      {activeModal?.modalType === 'PROMT_MODAL' &&
        !!activeModal?.promptModal && (
          <AppPromptModal {...activeModal.promptModal} />
        )}

      {activeModal?.modalType === 'INFORMATION_MODAL' &&
        !!activeModal?.informationModal && (
          <AppInformationModal {...activeModal.informationModal} />
        )}
    </AppModalContainer>
  );
};

export default AppModal;
