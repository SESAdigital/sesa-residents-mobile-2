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
import { getStatusBarPadding } from '@src/utils';
import Size from '@src/utils/useResponsiveSize';

interface ScreenProps extends ViewProps {
  containerStyle?: ViewStyle;
  scrollable?: boolean;
}
// statusbarColor = colors.WHITE100,
//   statusbarStyle = 'dark-content',
const AppScreen = (props: ScreenProps): React.ReactNode => {
  const { children, style, containerStyle, scrollable } = props;

  return (
    <SafeAreaView style={[styles.screen, containerStyle]}>
      <StatusBar animated barStyle={'dark-content'} />

      {scrollable ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[styles.view, style]}
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
    backgroundColor: colors.WHITE_100,
    paddingTop: getStatusBarPadding(),
  },
  view: {
    flex: 1,
    paddingHorizontal: Size.calcWidth(21),
  },
});

export default AppScreen;
