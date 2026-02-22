import { StyleSheet, View } from 'react-native';

import colors from '@src/configs/colors';
import Size from '@src/utils/useResponsiveSize';
import AppText from '../AppText';
import { RiInformationFill } from '../icons';

interface Props {
  title: string;
}

const InformationRow = ({ title }: Props): React.JSX.Element => {
  return (
    <View style={styles.row}>
      <RiInformationFill
        height={Size.calcAverage(20)}
        width={Size.calcAverage(20)}
        color={colors.BLACK_100}
      />
      <AppText style={styles.rowText}>{title?.trim?.()}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Size.calcAverage(8),
    backgroundColor: colors.WHITE_300,
    padding: Size.calcAverage(10),
  },

  rowText: {
    paddingHorizontal: Size.calcWidth(8),
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
  },
});

export default InformationRow;
