import { useState } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import {
  FlatList,
  NativeSyntheticEvent,
  StyleSheet,
  TargetedEvent,
  TouchableOpacity,
  View,
} from 'react-native';

import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import AppModalContainer from '@src/modals/AppModalContainer';
import { SelectInputData } from '@src/types/index';
import Size from '@src/utils/useResponsiveSize';
import AppText from '../AppText';
import AppCheckIcon from '../custom/AppCheckIcon';
import {
  MaterialSymbolsCloseRounded,
  MaterialSymbolsExpandMore,
} from '../icons';
import ErrorMessage from './ErrorMessage';
import SubmitButton from './SubmitButton';

interface AppSelectInputProps<TFieldValues extends FieldValues> {
  placeholder: string;
  label: string;
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  data: SelectInputData[];
  disabled?: boolean;
  shouldBackgroundClose?: boolean;
}

function AppSelectInput<TFieldValues extends FieldValues>(
  props: AppSelectInputProps<TFieldValues>,
) {
  const [isVisible, setVisibility] = useState(false);
  const {
    label,
    control,
    name,
    placeholder,
    data,
    disabled,
    shouldBackgroundClose = true,
  } = props;

  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  const handleBgClose = () => {
    if (!!shouldBackgroundClose && isVisible) {
      setVisibility(false);
    }
  };

  const selectedItem = data?.find(({ value }) => value === field?.value);

  return (
    <>
      <View>
        {!!field?.value && !!label && (
          <AppText style={styles.label}>{label}</AppText>
        )}
        <TouchableOpacity
          disabled={disabled}
          onPress={() => setVisibility(true)}
          style={[
            styles.container,
            !!error?.message && { borderColor: colors.RED_100 },
          ]}
        >
          <AppText
            style={[
              styles.text,
              !selectedItem?.title && { color: colors.GRAY_100 },
            ]}
          >
            {selectedItem?.title || placeholder}
          </AppText>

          <MaterialSymbolsExpandMore
            height={Size.calcAverage(20)}
            width={Size.calcAverage(20)}
            color={colors.GRAY_700}
            style={[isVisible && { transform: [{ rotate: '180deg' }] }]}
          />
        </TouchableOpacity>
        <ErrorMessage message={error?.message ?? null} />
      </View>

      <AppModalContainer
        isVisible={!disabled && isVisible}
        style={{ padding: 0 }}
        onClose={handleBgClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.modalCloseContainer}
              onPress={() => setVisibility(false)}
            >
              <MaterialSymbolsCloseRounded
                height={Size.calcAverage(28)}
                width={Size.calcAverage(28)}
                color={colors.BLUE_120}
              />
            </TouchableOpacity>
            <AppText style={styles.modalHeaderTitle}>{placeholder}</AppText>
          </View>

          <FlatList
            data={data}
            style={{ maxHeight: Size.getHeight() / 2 }}
            showsVerticalScrollIndicator
            renderItem={({ item, index }) => {
              const isSelected = item?.value === selectedItem?.value;
              return (
                <AppSelectInputRow
                  title={item?.title}
                  onBlur={field.onBlur}
                  isLast={index === data?.length - 1}
                  isSelected={isSelected}
                  onPress={() => {
                    field.onChange(isSelected ? '' : item?.value);
                    if (!isSelected) {
                      setVisibility(false);
                    }
                  }}
                />
              );
            }}
            keyExtractor={(_, index) => index?.toString()}
          />

          <View style={styles.modalFooter}>
            <SubmitButton
              onPress={() => setVisibility(false)}
              variant="SECONDARY"
              title="Close"
            />
          </View>
        </View>
      </AppModalContainer>
    </>
  );
}

export default AppSelectInput;

interface AppSelectInputRowProps {
  onPress: () => void;
  onBlur?: (e: NativeSyntheticEvent<TargetedEvent>) => void;
  isSelected: boolean;
  isLast: boolean;
  title: string;
}

function AppSelectInputRow(props: AppSelectInputRowProps) {
  const { onPress, onBlur, isSelected, isLast, title } = props;
  return (
    <TouchableOpacity
      onBlur={onBlur}
      onPress={onPress}
      style={[
        styles.item,
        isSelected && {
          backgroundColor: colors.LIGHT_GRAY_200,
        },
        isLast && { borderBottomWidth: 0 },
      ]}
    >
      <AppText style={styles.itemText}>{title}</AppText>
      <AppCheckIcon isChecked={isSelected} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    borderBottomColor: colors.LIGHT_GRAY_100,
    borderBottomWidth: Size.calcHeight(1),
    height: Size.calcHeight(46),
    marginTop: Size.calcHeight(1),
    flexDirection: 'row',
    gap: Size.calcAverage(5),
    alignItems: 'center',
  },

  dropdownMenuStyle: {
    backgroundColor: colors.WHITE_100,
    borderRadius: Size.calcAverage(8),
    paddingVertical: Size.calcHeight(10),
  },

  header: {
    textAlign: 'center',
    fontFamily: fonts.INTER_500,
    color: colors.GRAY_100,
    borderBottomWidth: Size.calcHeight(1),
    borderColor: colors.LIGHT_GRAY_300,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: Size.calcHeight(10),
    paddingHorizontal: Size.calcWidth(14),
  },

  item: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: Size.calcWidth(14),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Size.calcHeight(22),
    borderBottomWidth: Size.calcHeight(1),
    borderColor: colors.LIGHT_GRAY_300,
  },

  itemText: {
    fontFamily: fonts.INTER_500,
    color: colors.GRAY_400,
    maxWidth: Size.calcWidth(310),
    paddingRight: Size.calcWidth(10),
  },

  label: {
    fontFamily: fonts.INTER_500,
    fontSize: Size.calcAverage(12),
    color: colors.BLUE_100,
  },

  modalCloseContainer: {
    position: 'absolute',
    right: Size.calcWidth(21),
    padding: Size.calcAverage(5),
    top: Size.calcHeight(3),
    bottom: Size.calcHeight(3),
    justifyContent: 'center',
    zIndex: 2,
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

  modalHeader: {
    padding: Size.calcAverage(16),
    position: 'relative',
  },

  modalHeaderTitle: {
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(16),
    textAlign: 'center',
  },

  text: {
    flexGrow: 1,
    fontSize: Size.calcAverage(14),
    fontFamily: fonts.INTER_500,
    color: colors.BLACK_100,
  },
});
