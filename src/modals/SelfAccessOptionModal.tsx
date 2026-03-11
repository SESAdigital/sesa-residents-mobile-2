import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

import {
  AccessEntryType,
  AccessEntryTypeData,
} from '@src/api/constants/default';
import AppText from '@src/components/AppText';
import AppModalHeader from '@src/components/common/AppModalHeader';
import {
  IonEnterOutline,
  IonExitOutline,
  MaterialSymbolsChevronRightRounded,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useAppStateStore } from '@src/stores/appState.store';
import Size from '@src/utils/useResponsiveSize';
import SubmitButton from '@src/components/forms/SubmitButton';

interface Option {
  title: string;
  value: AccessEntryType;
  description: string;
  Icon: (val: SvgProps) => React.JSX.Element;
}

const options: Option[] = [
  {
    title: 'Check-in',
    value: AccessEntryTypeData.CheckIn,
    description: 'Scan QR-code to enter your estate',
    Icon: IonEnterOutline,
  },
  {
    title: 'Check-out',
    value: AccessEntryTypeData.CheckOut,
    description: 'Scan QR-code to exit your estate',
    Icon: IonExitOutline,
  },
];

interface Props {
  onSelect: (val: AccessEntryType) => void;
}

const SelfAccessOptionModal = ({ onSelect }: Props): React.JSX.Element => {
  const { closeActiveModal } = useAppStateStore();

  return (
    <View style={styles.modalContainer}>
      <AppModalHeader
        title="Select Access Type"
        onBackPress={closeActiveModal}
      />
      {options?.map(({ Icon, description, title, value }, key) => (
        <TouchableOpacity
          key={key}
          onPress={() => {
            onSelect(value);
            closeActiveModal();
          }}
          style={styles.row}
        >
          <View style={styles.iconContainer}>
            <Icon
              height={Size.calcAverage(24)}
              width={Size.calcAverage(24)}
              color={colors.GRAY_100}
              style={[
                {
                  marginLeft: Size.calcWidth(-7),
                },
                key === 1 && {
                  transform: [{ rotate: '-180deg' }],
                },
              ]}
            />
          </View>
          <View style={styles.propertyInfo}>
            <AppText numberOfLines={1} style={styles.propertyName}>
              {title}
            </AppText>
            <AppText numberOfLines={1} style={styles.propertyAddress}>
              {description}
            </AppText>
          </View>
          <MaterialSymbolsChevronRightRounded
            color={colors.BLACK_100}
            height={Size.calcAverage(24)}
            width={Size.calcAverage(24)}
          />
        </TouchableOpacity>
      ))}
      <View style={styles.modalFooter}>
        <SubmitButton
          onPress={closeActiveModal}
          variant="SECONDARY"
          title="Close"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    height: Size.calcAverage(50),
    backgroundColor: colors.LIGHT_GRAY_200,
    borderRadius: Size.calcAverage(100),
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
  },

  modalContainer: {
    backgroundColor: colors.WHITE_100,
    borderTopLeftRadius: Size.calcAverage(12),
    borderTopRightRadius: Size.calcAverage(12),
    overflow: 'hidden',
  },

  modalFooter: {
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(18),
    borderTopColor: colors.WHITE_300,
    borderTopWidth: Size.calcHeight(2),
  },

  propertyAddress: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
  },

  propertyInfo: {
    flex: 1,
    paddingHorizontal: Size.calcWidth(10),
    rowGap: Size.calcHeight(5),
  },

  propertyName: {
    fontFamily: fonts.INTER_500,
    fontSize: Size.calcAverage(13),
  },

  row: {
    flexDirection: 'row',
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(12),
    alignItems: 'center',
    borderBottomColor: colors.WHITE_300,
    borderBottomWidth: Size.calcHeight(1),
  },
});

export default SelfAccessOptionModal;
