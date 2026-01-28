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
  isLoading?: boolean;
  // isClickable?: boolean;
}

const AppAvatar = (props: AppAvatarProps): JSX.Element => {
  const { firstWord, imageURL, lastWord, style, isLoading } = props;

  const firstLetter = firstWord?.[0];
  const lastLetter = lastWord?.[0];

  if (isLoading) {
    return (
      <AppSkeletonLoader borderRadius={100}>
        <View style={styles.dimension} />
      </AppSkeletonLoader>
    );
  }

  return (
    <View style={[styles.container, styles.dimension, style]}>
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
    borderRadius: Size.calcAverage(44 / 2),
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
    height: Size.calcAverage(44),
    width: Size.calcAverage(44),
  },

  text: {
    textTransform: 'uppercase',
    fontSize: Size.calcAverage(14),
    color: colors.BLACK_200,
    fontFamily: fonts.INTER_500,
  },
});

export default AppAvatar;
