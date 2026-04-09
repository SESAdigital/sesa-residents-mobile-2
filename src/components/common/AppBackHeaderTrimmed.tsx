import { StyleSheet, TouchableOpacity, View } from 'react-native';

import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';
import AppText from '../AppText';
import { MaterialSymbolsChevronLeftRounded } from '../icons';
import { useAppNavigator } from '@src/navigation/AppNavigator';

interface Props {
  onBackPress?: () => void;
}

const AppBackHeaderTrimmed = (props: Props): React.JSX.Element => {
  const { onBackPress } = props;
  const navigation = useAppNavigator();

  const onPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.headerButtonTrimmed}>
        <MaterialSymbolsChevronLeftRounded
          height={Size.calcAverage(35)}
          width={Size.calcAverage(35)}
          color={colors.BLACK_100}
        />
        <AppText style={{ fontFamily: fonts.INTER_500 }}>Go Back</AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerButtonTrimmed: {
    padding: 0,
    flexDirection: 'row',
    rowGap: Size.calcWidth(8),
    alignItems: 'center',
    marginRight: 'auto',
    marginLeft: Size.calcWidth(-12),
    paddingRight: Size.calcWidth(10),
    paddingVertical: Size.calcHeight(5),
  },
});

export default AppBackHeaderTrimmed;
