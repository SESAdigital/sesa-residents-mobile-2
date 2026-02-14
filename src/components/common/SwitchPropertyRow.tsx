import { StyleSheet, TouchableOpacity, View } from 'react-native';

import colors from '@src/configs/colors';
import Size from '@src/utils/useResponsiveSize';
import AppText from '../AppText';
import { MaterialSymbolsArrowDropDown } from '../icons';
import fonts from '@src/configs/fonts';
import { useAppStateStore } from '@src/stores/appState.store';
import { useAuthStore } from '@src/stores/auth.store';
import SwitchPropertyModal from '@src/modals/SwitchPropertyModal';
import { useGetProperties } from '@src/hooks/useGetRequests';

const SwitchPropertyRow = (): React.ReactNode => {
  const { setActiveModal } = useAppStateStore();
  const { selectedProperty } = useAuthStore();
  useGetProperties();

  const handleSwitch = () => {
    setActiveModal({
      modalType: 'EMPTY_MODAL',
      emptyModalComponent: <SwitchPropertyModal />,
      shouldBackgroundClose: true,
    });
  };

  return (
    <View style={styles.row}>
      <AppText numberOfLines={1} style={styles.address}>
        {selectedProperty?.propertyAddress}
      </AppText>
      <View style={styles.divider} />

      <TouchableOpacity onPress={handleSwitch} style={styles.row}>
        <AppText style={styles.switchPropertyText}>Switch Property</AppText>
        <MaterialSymbolsArrowDropDown
          height={Size.calcAverage(20)}
          width={Size.calcAverage(20)}
          color={colors.BLUE_200}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  address: {
    color: colors.GRAY_100,
    fontSize: Size.calcAverage(12),
    maxWidth: Size.calcWidth(150),
  },

  divider: {
    height: Size.calcAverage(14),
    backgroundColor: colors.GRAY_200,
    width: Size.calcWidth(1),
    marginHorizontal: Size.calcWidth(6),
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  switchPropertyText: {
    color: colors.BLUE_200,
    fontSize: Size.calcAverage(12),
    fontFamily: fonts.INTER_600,
  },
});

export default SwitchPropertyRow;
