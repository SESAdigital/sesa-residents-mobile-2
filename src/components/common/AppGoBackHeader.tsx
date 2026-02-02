import { StyleSheet, TouchableOpacity, View } from 'react-native';

import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';
import AppText from '../AppText';
import { MaterialSymbolsChevronLeft } from '../icons';
import { useAppNavigator } from '@src/navigation/AppNavigator';

interface Props {
  onBackPress?: () => void;
}

const AppGoBackHeader = ({ onBackPress }: Props): React.ReactNode => {
  const navigation = useAppNavigator();

  const onPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onPress} style={styles.headerButton}>
        <MaterialSymbolsChevronLeft
          height={Size.calcAverage(24)}
          width={Size.calcAverage(24)}
          color={colors.BLACK_100}
        />
        <AppText style={{ fontFamily: fonts.INTER_500 }}>Go Back</AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: Size.calcAverage(11),
    borderColor: colors.LIGHT_GRAY_200,
    borderBottomWidth: Size.calcHeight(1),
  },

  headerButton: {
    flexDirection: 'row',
    rowGap: Size.calcWidth(8),
    alignItems: 'center',
    padding: Size.calcAverage(10),
    marginRight: 'auto',
  },
});

export default AppGoBackHeader;
