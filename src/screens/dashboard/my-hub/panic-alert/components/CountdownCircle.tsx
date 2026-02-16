import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedReaction,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { runOnJS } from 'react-native-worklets';

import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface CountdownCircleProps {
  duration: number;
  size: number;
  strokeWidth: number;
  color: string;
  onComplete: () => void;
}

const CountdownCircle = (props: CountdownCircleProps) => {
  const { duration, size, strokeWidth, color, onComplete } = props;

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = useSharedValue(1);
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    progress.value = withTiming(
      0,
      {
        duration: duration * 1000,
        easing: Easing.linear,
      },
      finished => {
        if (finished && onComplete) {
          runOnJS(onComplete)();
        }
      },
    );
  }, [duration, onComplete, progress]);

  useAnimatedReaction(
    () => Math.ceil(progress.value * duration),
    (current, previous) => {
      if (current !== previous) {
        runOnJS(setTimeLeft)(current);
      }
    },
  );

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: circumference * (1 - progress.value),
    };
  });

  return (
    <View
      style={[
        styles.container,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.WHITE_300}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Animated Progress Circle */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeLinecap="round"
          animatedProps={animatedProps}
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={styles.textContainer}>
        <AnimatedTextInput
          style={styles.countDownText}
          editable={false}
          value={`${timeLeft}`}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE_200,
    marginHorizontal: 'auto',
  },
  textContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countDownText: {
    fontSize: Size.calcAverage(70),
    fontFamily: fonts.INTER_500,
    color: colors.BLUE_110,
    textAlign: 'center',
  },
});

export default CountdownCircle;
