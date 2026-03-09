import { useState } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { SelectInputData } from '@src/types/default';
import Size from '@src/utils/useResponsiveSize';
import AppText from '../AppText';
import AppActivityIndicator from '../custom/AppActivityIndicator';
import { MaterialSymbolsExpandMore } from '../icons';
import AppSelectModal from './AppSelectModal';
import ErrorMessage from './ErrorMessage';

interface AppSelectInputProps<TFieldValues extends FieldValues> {
  placeholder: string;
  label: string;
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  data: SelectInputData[];
  disabled?: boolean;
  isLoading?: boolean;
  refetch?: () => void;
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
    isLoading,
    refetch,
    shouldBackgroundClose = true,
  } = props;

  const isDisabled = !!disabled;

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

  const handleTrigger = () => {
    if (!data || data?.length === 0) {
      refetch?.();
    }

    setVisibility(true);
  };

  const selectedItem = data?.find(({ value }) => value === field?.value);

  return (
    <>
      <View>
        {!!field?.value && !!label && (
          <AppText style={styles.label}>{label}</AppText>
        )}
        <TouchableOpacity
          disabled={isDisabled}
          onPress={handleTrigger}
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

          {isLoading ? (
            <AppActivityIndicator size="small" />
          ) : (
            <MaterialSymbolsExpandMore
              height={Size.calcAverage(20)}
              width={Size.calcAverage(20)}
              color={colors.GRAY_700}
              style={[isVisible && { transform: [{ rotate: '180deg' }] }]}
            />
          )}
        </TouchableOpacity>
        <ErrorMessage message={error?.message ?? null} />
      </View>

      <AppSelectModal
        handleBgClose={handleBgClose}
        isVisible={!isDisabled && isVisible}
        onClose={() => setVisibility(false)}
        placeholder={placeholder}
        selectedItem={selectedItem?.value || null}
        data={data}
        onChange={field.onChange}
        onBlur={field.onBlur}
      />
    </>
  );
}

export default AppSelectInput;

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

  label: {
    fontFamily: fonts.INTER_500,
    fontSize: Size.calcAverage(12),
    color: colors.BLUE_100,
  },

  text: {
    flexGrow: 1,
    fontSize: Size.calcAverage(14),
    fontFamily: fonts.INTER_500,
    color: colors.BLACK_100,
  },
});
