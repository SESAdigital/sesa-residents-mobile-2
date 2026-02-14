import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { PropsWithChildren } from 'react';

import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';
import AppText from '../AppText';
import {
  MaterialSymbolsChevronLeftRounded,
  MaterialSymbolsCloseRounded,
} from '../icons';
import { useAppNavigator } from '@src/navigation/AppNavigator';

interface Props extends PropsWithChildren {
  onBackPress?: () => void;
  title?: string;
  containerStyle?: StyleProp<ViewStyle>;
  icon?: 'back' | 'close';
}

const AppScreenHeader = (props: Props): React.JSX.Element => {
  const navigation = useAppNavigator();
  const { onBackPress, title, children, containerStyle, icon } = props;

  const onPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };
  return (
    <View style={[styles.header, containerStyle]}>
      <TouchableOpacity onPress={onPress} style={styles.headerButton}>
        {icon === 'close' ? (
          <MaterialSymbolsCloseRounded
            height={Size.calcAverage(24)}
            width={Size.calcAverage(24)}
            color={colors.BLACK_100}
          />
        ) : (
          <MaterialSymbolsChevronLeftRounded
            height={Size.calcAverage(32)}
            width={Size.calcAverage(32)}
            color={colors.BLACK_100}
          />
        )}
      </TouchableOpacity>
      {title ? <AppText style={styles.headerTitle}>{title}</AppText> : children}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: Size.calcAverage(10),
    borderColor: colors.LIGHT_GRAY_200,
    borderBottomWidth: Size.calcHeight(1),
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerButton: {
    position: 'absolute',
    left: 2,
    top: 0,
    bottom: 0,
    paddingHorizontal: Size.calcWidth(5),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },

  headerTitle: {
    fontFamily: fonts.INTER_600,
    color: colors.BLACK_200,
    fontSize: Size.calcAverage(16),
    textAlign: 'center',
  },
});

export default AppScreenHeader;
