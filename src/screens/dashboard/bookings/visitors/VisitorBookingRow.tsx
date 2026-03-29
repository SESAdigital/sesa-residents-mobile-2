import { StyleSheet, View } from 'react-native';

import { GetBookingsVistorResData } from '@src/api/bookings.api';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';
import AppText from '@src/components/AppText';
import GenericVisitorRow, {
  GenericVisitorRowLoader,
} from '@src/components/common/GenericVisitorRow';
import DuplicateLoader from '@src/components/DuplicateLoader';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';

export interface MappedVisitorBookingRowData {
  title: string;
  data: GetBookingsVistorResData[];
}

interface Props {
  val: MappedVisitorBookingRowData;
  onPress: (id: number) => void;
}

const VisitorBookingRow = ({ val, onPress }: Props): React.JSX.Element => {
  return (
    <View>
      <View style={styles.dateContainer}>
        <AppText style={styles.date}>{val?.title}</AppText>
      </View>
      {val?.data?.map((value, index) => (
        <GenericVisitorRow
          key={index}
          value={value}
          onPress={() => onPress(value?.id)}
        />
      ))}
    </View>
  );
};

export const VisitorBookingRowLoader = (): React.JSX.Element => {
  return (
    <View>
      <View style={styles.dateContainer}>
        <AppSkeletonLoader width={Size.calcWidth(100)} />
      </View>
      <DuplicateLoader loader={<GenericVisitorRowLoader />} />
    </View>
  );
};

const styles = StyleSheet.create({
  date: {
    fontSize: Size.calcAverage(12),
    fontFamily: fonts.INTER_500,
    color: colors.GRAY_100,
  },

  dateContainer: {
    borderTopWidth: Size.calcHeight(0.5),
    borderBottomWidth: Size.calcHeight(0.5),
    borderColor: colors.LIGHT_GRAY_200,
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(8),
  },
});

export default VisitorBookingRow;
