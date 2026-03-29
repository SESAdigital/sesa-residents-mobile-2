import { useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import AppText from '@src/components/AppText';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';

const AppTopTabBar: React.FC<MaterialTopTabBarProps> = props => {
  const { state, descriptors, navigation } = props;
  const scrollViewRef = useRef<ScrollView>(null);

  // useEffect(() => {
  //   // Scroll to active tab whenever it changes
  //   const activeTab = state.routes[state.index];
  //   const activeTabRef = tabItemRefs.current[activeTab.key];

  //   if (activeTabRef && scrollViewRef.current) {
  //     activeTabRef?.measureLayout(
  //       scrollViewRef?.current?.getInnerViewNode(),
  //       // @ts-expect-error no type found
  //       (x, y, width, height) => {
  //         const screenWidth = Dimensions.get('window').width;
  //         const scrollToX = x - screenWidth / 2 + width / 2;

  //         scrollViewRef.current?.scrollTo({
  //           x: scrollToX,
  //           animated: true,
  //         });
  //       },
  //       () => {}, // error callback
  //     );
  //   }
  // }, [state.index]);

  useEffect(() => {
    const tabWidth = 100; // Approximate width of each pill (adjust as needed)
    const screenWidth = Dimensions.get('window').width;
    const scrollToX = state.index * tabWidth - screenWidth / 2 + tabWidth / 2;

    scrollViewRef.current?.scrollTo({
      x: scrollToX,
      animated: true,
    });
  }, [state.index]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.title !== undefined ? options.title : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              // ref={ref => (tabItemRefs.current[route.key] = ref)}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[
                styles.tabButton,
                isFocused ? styles.tabActive : styles.tabInactive,
              ]}
            >
              <AppText
                style={[
                  styles.tabText,
                  isFocused ? styles.tabActiveText : styles.tabInactiveText,
                ]}
              >
                {label}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: Size.calcHeight(1),
    borderTopWidth: Size.calcHeight(0.5),
    borderColor: colors.WHITE_300,
  },

  scrollContainer: {
    paddingHorizontal: Size.calcWidth(20),
    alignItems: 'center',
    gap: Size.calcAverage(4),
  },

  tabActive: {
    borderColor: colors.BLUE_200,
    borderBottomWidth: Size.calcHeight(2),
  },

  tabActiveText: {
    color: colors.BLUE_300,
  },

  tabButton: {
    paddingHorizontal: Size.calcWidth(16),
    paddingVertical: Size.calcHeight(14),
  },

  tabInactive: {
    borderColor: 'transparent',
    borderBottomWidth: Size.calcHeight(2),
  },

  tabText: {
    fontFamily: fonts.INTER_500,
    fontSize: Size.calcAverage(12),
  },

  tabInactiveText: {
    color: colors.GRAY_200,
  },
});

export default AppTopTabBar;
