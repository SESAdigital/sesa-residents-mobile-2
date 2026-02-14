import { useEffect, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import useDebounce from '@src/hooks/useDebouncer';
import Size from '@src/utils/useResponsiveSize';
import { MaterialSymbolsCloseRounded, MingcuteSearchLine } from '../icons';

interface Props extends TextInputProps {
  onSearchDone?: (value: string) => void;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const AppSearchInput = (props: Props): React.JSX.Element => {
  const { onSearchDone, containerStyle, ...otherProps } = props;

  const [value, setValue] = useState(props.defaultValue || '');

  const debouncedSearch = useDebounce(value, 500);

  useEffect(() => {
    onSearchDone?.(debouncedSearch);
  }, [debouncedSearch, onSearchDone]);

  const handleClear = () => {
    setValue('');
    onSearchDone?.('');
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <MingcuteSearchLine
        height={Size.calcAverage(20)}
        width={Size.calcAverage(20)}
        color={colors.GRAY_200}
      />
      <TextInput
        {...otherProps}
        style={styles.text}
        placeholderTextColor={colors.GRAY_200}
        onChangeText={e => setValue(e)}
        value={value}
        selectionColor={colors.BLUE_200}
        cursorColor={colors.BLUE_100}
      />
      {!!value && (
        <TouchableOpacity onPress={handleClear} style={styles.closeButton}>
          <MaterialSymbolsCloseRounded
            height={Size.calcAverage(20)}
            width={Size.calcAverage(20)}
            color={colors.BLUE_200}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Size.calcAverage(100),
    borderWidth: Size.calcAverage(1),
    borderColor: colors.LIGHT_GRAY_200,
    backgroundColor: colors.WHITE_300,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: Size.calcWidth(16),
    overflow: 'hidden',
  },

  closeButton: {
    paddingHorizontal: Size.calcWidth(10),
    paddingVertical: Size.calcHeight(6),
  },

  text: {
    flexGrow: 1,
    fontSize: Size.calcAverage(14),
    fontFamily: fonts.INTER_500,
    color: colors.BLACK_100,
    // height: Size.calcHeight(40),
    marginLeft: Size.calcWidth(4),
  },
});

export default AppSearchInput;
