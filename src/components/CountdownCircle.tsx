import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
  Easing,
  runOnJS,
  useAnimatedReaction,
} from 'react-native-reanimated';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface CountdownCircleProps {
  duration?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  onComplete?: () => void;
}

const CountdownCircle = ({
  duration = 5,
  size = Size.calcAverage(230),
  strokeWidth = 10,
  color = colors.GREEN_150,
  onComplete,
}: CountdownCircleProps) => {
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
    <View style={[styles.container, { width: size, height: size }]}>
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
  },
  textContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countDownText: {
    fontSize: Size.calcAverage(90),
    fontFamily: fonts.INTER_500,
    color: colors.BLUE_110,
    textAlign: 'center',
  },
});

export default CountdownCircle;
