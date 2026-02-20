import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import colors from '@src/configs/colors';

interface ScreenProps extends ViewProps {
  containerStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  scrollable?: boolean;
  showDownInset?: boolean;
  hideTopInset?: boolean;
}
// statusbarColor = colors.WHITE100,
//   statusbarStyle = 'dark-content',
const AppScreen = (props: ScreenProps): React.JSX.Element => {
  const {
    children,
    style,
    containerStyle,
    scrollable,
    contentContainerStyle,
    showDownInset,
    hideTopInset,
  } = props;

  return (
    <SafeAreaView
      edges={{
        bottom: showDownInset ? 'additive' : 'off',
        right: 'additive',
        top: hideTopInset ? 'off' : 'additive',
        left: 'additive',
      }}
      style={[styles.screen, containerStyle]}
    >
      <StatusBar animated barStyle={'dark-content'} />

      {scrollable ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[styles.view, style]}
          contentContainerStyle={contentContainerStyle}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.view, style]}>{children}</View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.WHITE_200,
  },
  view: {
    flex: 1,
    // paddingHorizontal: Size.calcWidth(21),
  },
});

export default AppScreen;
