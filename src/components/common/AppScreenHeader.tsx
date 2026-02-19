import { PropsWithChildren } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import Size from '@src/utils/useResponsiveSize';
import AppText from '../AppText';
import {
  MaterialSymbolsChevronLeftRounded,
  MaterialSymbolsCloseRounded,
} from '../icons';

interface Props extends PropsWithChildren {
  onBackPress?: () => void;
  title?: string;
  containerStyle?: StyleProp<ViewStyle>;
  icon?: 'back' | 'close';
  rightIcon?: React.JSX.Element;
}

const AppScreenHeader = (props: Props): React.JSX.Element => {
  const navigation = useAppNavigator();
  const { onBackPress, title, children, containerStyle, icon, rightIcon } =
    props;

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
      <View style={styles.contentContainer}>
        {title ? (
          <AppText style={styles.headerTitle}>{title}</AppText>
        ) : (
          children
        )}
      </View>
      {!!rightIcon && <View style={styles.rightItem}>{rightIcon}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: Size.calcWidth(40),
  },

  header: {
    paddingVertical: Size.calcHeight(10),
    borderColor: colors.LIGHT_GRAY_200,
    borderBottomWidth: Size.calcHeight(1),
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    paddingRight: Size.calcWidth(5),
    justifyContent: 'center',
    zIndex: 2,
    paddingLeft: Size.calcWidth(11),
  },

  headerTitle: {
    fontFamily: fonts.INTER_600,
    color: colors.BLACK_200,
    fontSize: Size.calcAverage(16),
    textAlign: 'center',
  },

  rightItem: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    paddingLeft: Size.calcWidth(5),
    justifyContent: 'center',
    zIndex: 2,
    paddingRight: Size.calcWidth(20),
  },
});

export default AppScreenHeader;
