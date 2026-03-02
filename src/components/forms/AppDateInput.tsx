import { useState } from 'react';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

import ErrorMessage from './ErrorMessage';
import AppText from '../AppText';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';
import { checkInvalidDate, dayJSFormatter } from '@src/utils/time';
import {
  MaterialSymbolsCalendarToday,
  MaterialSymbolsSchedule,
} from '../icons';

interface Props {
  errorMessage: string;
  label: string;
  value: string | Date;
  placeholder: string;
  setValue: (value: string) => void;
  mode: 'date' | 'time' | 'datetime' | 'countdown';
  minimumDate?: Date;
  description?: string;
}

const AppDateInput = (props: Props): React.ReactNode => {
  const {
    errorMessage,
    label,
    value,
    placeholder,
    setValue,
    minimumDate,
    mode,
    description,
  } = props;
  const [show, setShow] = useState(false);

  const onChange = (_: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setValue(checkInvalidDate(selectedDate?.toISOString?.()));
    }
    setShow(Platform.OS === 'ios');
  };

  return (
    <View style={{ flex: 1 }}>
      {value && !!label && <AppText style={styles.label}>{label}</AppText>}
      <TouchableOpacity onPress={() => setShow(true)}>
        <View
          style={[
            styles.container,

            !!errorMessage && { borderColor: colors.RED_100 },
          ]}
        >
          {/* <View style={{flex: 1}}> */}
          {mode === 'date' ? (
            <AppText
              style={[styles.text, !value && { color: colors.GRAY_100 }]}
            >
              {value ? dayJSFormatter(value, 'MMM D, YYYY') : placeholder}
            </AppText>
          ) : (
            <AppText
              style={[styles.text, !value && { color: colors.GRAY_100 }]}
            >
              {value ? dayJSFormatter(value, 'hh:mm A', true) : placeholder}
            </AppText>
          )}
          <>
            {mode === 'date' ? (
              <MaterialSymbolsCalendarToday
                height={Size.calcAverage(20)}
                width={Size.calcAverage(20)}
                color={colors.GRAY_100}
              />
            ) : (
              <MaterialSymbolsSchedule
                height={Size.calcAverage(20)}
                width={Size.calcAverage(20)}
                color={colors.GRAY_100}
              />
            )}
          </>
        </View>
      </TouchableOpacity>

      {!!description && (
        <AppText style={styles.description}>{description}</AppText>
      )}
      <ErrorMessage message={errorMessage} />

      {show && (
        <DateTimePicker
          value={new Date(value)}
          mode={mode}
          minimumDate={minimumDate}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChange}
        />
      )}

      {/* <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(selectedDate) => {
          setOpen(false);
          setDate(selectedDate);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      /> */}
    </View>
  );
};

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

  description: {
    paddingTop: Size.calcHeight(8),
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
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

export default AppDateInput;
