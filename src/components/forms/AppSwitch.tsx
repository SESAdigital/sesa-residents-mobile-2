import React, { useEffect, useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import colors from '@src/configs/colors';
import Size from '@src/utils/useResponsiveSize';

interface Props {
  isEnabled: boolean;
  onValueChange: (value: boolean) => void;
  size?: number;
}

const AppSwitch = (props: Props): React.JSX.Element => {
  const { isEnabled, onValueChange, size = 25 } = props;

  const translateX = useSharedValue(isEnabled ? 1 : 0);
  const scale = useSharedValue(1);

  useEffect(() => {
    translateX.value = withTiming(isEnabled ? 1 : 0, { duration: 250 });
  }, [isEnabled, translateX]);

  const scaling = useMemo(() => {
    const s = Size.calcAverage(size);
    const outerPadding = s * 0.05;
    const borderWidth = s * 0.05;
    const outerBorderRadius = s * 0.67;
    const innerWidth = s * 1.8;
    const innerHeight = s;
    const innerBorderRadius = s * 0.6;
    const innerPadding = s * 0.1;
    const knobSize = s * 0.73;

    const travelDistance = innerWidth - knobSize - innerPadding * 2;

    return {
      outerPadding,
      borderWidth,
      outerBorderRadius,
      innerWidth,
      innerHeight,
      innerBorderRadius,
      innerPadding,
      knobSize,
      travelDistance,
    };
  }, [size]);

  const animatedKnobStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value * scaling.travelDistance,
        },
        {
          scale: scale.value,
        },
      ],
    };
  });

  const color1 = colors.LIGHT_GRAY_400;
  const color2 = colors.BLUE_200;
  const color3 = colors.BLUE_200;

  //   const color1 = colors.LIGHT_GRAY_400;
  // const color2 = colors.GREEN_600;
  // const color3 = colors.GREEN_400;

  const animatedOuterStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      translateX.value,
      [0, 1],
      [color1, color2],
    );
    return {
      borderColor,
    };
  });

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    const opacity = 1 - translateX.value;
    return {
      opacity,
    };
  });

  //   const handlePressIn = () => {
  //     scale.value = withSpring(0.9, { damping: 10, stiffness: 200 });
  //   };

  //   const handlePressOut = () => {
  //     scale.value = withSpring(1, { damping: 10, stiffness: 200 });
  //   };

  return (
    <Pressable
      onPress={() => onValueChange(!isEnabled)}
      //   onPressIn={handlePressIn}
      //   onPressOut={handlePressOut}
      style={styles.pressable}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      accessibilityRole="switch"
      accessibilityState={{ checked: isEnabled }}
    >
      <Animated.View
        style={[
          styles.outerContainer,
          {
            padding: scaling.outerPadding,
            borderRadius: scaling.outerBorderRadius,
            borderWidth: scaling.borderWidth,
          },
          animatedOuterStyle,
        ]}
      >
        <View
          style={[
            styles.innerContainer,
            {
              width: scaling.innerWidth,
              height: scaling.innerHeight,
              borderRadius: scaling.innerBorderRadius,
              paddingHorizontal: scaling.innerPadding,
            },
          ]}
        >
          <LinearGradient
            colors={[color3, color2]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
          <Animated.View
            style={[styles.backgroundOverlay, animatedBackgroundStyle]}
          />
          <Animated.View
            style={[
              styles.knob,
              {
                width: scaling.knobSize,
                height: scaling.knobSize,
                borderRadius: scaling.knobSize / 2,
              },
              animatedKnobStyle,
            ]}
          />
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    alignSelf: 'flex-start',
  },
  outerContainer: {
    backgroundColor: colors.WHITE_100,
  },
  innerContainer: {
    justifyContent: 'center',
    overflow: 'hidden',
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.WHITE_100,
  },
  knob: {
    backgroundColor: colors.WHITE_100,
    elevation: 4,
    shadowColor: colors.BLACK_200,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    zIndex: 1,
  },
});

export default AppSwitch;
