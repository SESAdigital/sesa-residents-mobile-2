import { JSX } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';
import AppImage from './AppImage';
import AppText from './AppText';
import AppSkeletonLoader from './AppSkeletonLoader';

export interface AppAvatarProps {
  imageURL?: string;
  firstWord?: string;
  lastWord?: string;
  alt?: string;
  style?: ViewStyle;
  size?: number;
  isLoading?: boolean;
  // isClickable?: boolean;
}

const AppAvatar = (props: AppAvatarProps): JSX.Element => {
  const { firstWord, imageURL, lastWord, style, isLoading, size } = props;

  const firstLetter = firstWord?.[0];
  const lastLetter = lastWord?.[0];

  const loadingStyle = [styles.dimension, size ? { height: size } : {}, style];

  if (isLoading) {
    return (
      <AppSkeletonLoader
        style={loadingStyle}
        borderRadius={size ? size / 2 : 100}
      >
        <View style={loadingStyle} />
      </AppSkeletonLoader>
    );
  }

  return (
    <View
      style={[
        styles.container,
        styles.dimension,
        size ? { height: size, borderRadius: size / 2 } : {},
        style,
      ]}
    >
      {imageURL ? (
        <AppImage
          // isClickable={isClickable}
          style={styles.image}
          source={{ uri: imageURL }}
        />
      ) : !firstLetter && !lastLetter ? (
        <AppText style={styles.text}>A</AppText>
      ) : (
        <AppText style={styles.text}>
          {!!firstLetter && firstLetter}
          {!!lastLetter && lastLetter}
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Size.calcAverage(4),
    borderRadius: Size.calcAverage(38 / 2),
    borderWidth: Size.calcAverage(2),
    backgroundColor: '#ECF3FF',
    borderColor: '#ECF3FF',
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  dimension: {
    height: Size.calcAverage(38),
    aspectRatio: 1,
    flexShrink: 0,
  },

  text: {
    textTransform: 'uppercase',
    fontSize: Size.calcAverage(14),
    color: colors.BLACK_200,
    fontFamily: fonts.INTER_500,
  },
});

export default AppAvatar;
