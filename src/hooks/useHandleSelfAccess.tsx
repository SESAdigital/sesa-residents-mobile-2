import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';
import { OnReadCodeData } from 'react-native-camera-kit/dist/CameraProps';

import { AccessEntryType } from '@src/api/constants/default';
import { getVerifyDoorCode, postOpenDoor } from '@src/api/profile.api';
import AppLoadingModal from '@src/modals/AppLoadingModal';
import SelfAccessOptionModal from '@src/modals/SelfAccessOptionModal';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import { useAppStateStore } from '@src/stores/appState.store';
import { appToast } from '@src/utils/appToast';
import { handleToastApiError } from '@src/utils/handleErrors';

export const useHandleSelfAccess = () => {
  const { setActiveModal } = useAppStateStore();
  const navigation = useAppNavigator();
  const isScanning = useRef(false);
  const getVerifyDoorCodeAPI = useMutation({ mutationFn: getVerifyDoorCode });
  const postOpenDoorAPI = useMutation({ mutationFn: postOpenDoor });

  const isLoading =
    getVerifyDoorCodeAPI?.isPending || postOpenDoorAPI?.isPending;

  const handleOpenDoor = async (doorId: string, option: AccessEntryType) => {
    const response = await postOpenDoorAPI.mutateAsync({
      doorId,
      accessEntryType: option,
    });

    if (response?.ok) {
      appToast.Success(response?.data?.message || 'Door opened successfully');
    } else {
      handleToastApiError(response);
    }
  };

  const handleVerifyDoor = async (code: number, option: AccessEntryType) => {
    const codeValue = code?.toString?.();
    const response = await getVerifyDoorCodeAPI.mutateAsync(codeValue);

    if (response?.ok) {
      appToast.Success(
        response?.data?.message || 'Door code verified successfully',
      );
      handleOpenDoor(codeValue, option);
    } else {
      handleToastApiError(response);
    }
  };

  const onQrCodeScan = (result: OnReadCodeData, option: AccessEntryType) => {
    if (isScanning.current) return;

    const codeString = result?.nativeEvent?.codeStringValue;
    const codeValue = Number(codeString);

    isScanning.current = true;

    if (!isNaN(codeValue)) {
      appToast.Success(`Code scanned successfully ${codeValue} `);
      navigation.goBack();
      handleVerifyDoor(codeValue, option);
    } else {
      setTimeout(() => {
        isScanning.current = false;
      }, 3000);
      const message = `Invalid code scanned ${codeString}`;
      appToast.Info(message);
    }
  };

  const handleOptionSelect = (option: AccessEntryType) => {
    isScanning.current = false;
    navigation.navigate(routes.SCAN_BAR_CODE_SCREEN, {
      onRead: val => onQrCodeScan(val, option),
    });
  };

  const handleSelfAccessClick = () => {
    setActiveModal({
      modalType: 'EMPTY_MODAL',
      containerStyle: { padding: 0 },
      shouldBackgroundClose: true,
      emptyModalComponent: (
        <SelfAccessOptionModal onSelect={handleOptionSelect} />
      ),
    });
  };

  const SelfAccessLoading = () => {
    return <AppLoadingModal isLoading={isLoading} />;
  };

  return { handleSelfAccessClick, SelfAccessLoading };
};
