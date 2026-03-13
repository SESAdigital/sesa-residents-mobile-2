import Size from '@src/utils/useResponsiveSize';
import { StyleSheet, View } from 'react-native';
import AppAvatar from '../AppAvatar';
import AppSkeletonLoader from '../AppSkeletonLoader';
import AppText from '../AppText';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';

interface BookingAccessByCardProps {
  name: string;
  isLoading: boolean;
  time: string;
  imageURL: string;
  title: string;
}

function BookingAccessByCard(props: BookingAccessByCardProps) {
  const { isLoading, name, time, title, imageURL } = props;

  const splitedName = name?.split(' ');
  return (
    <>
      <AppText style={styles.checkedInByText}>{title} </AppText>
      <View style={styles.checkedInByContainer}>
        <AppAvatar
          firstWord={splitedName?.[0]}
          lastWord={splitedName?.[1]}
          imageURL={imageURL}
          size={Size.calcAverage(32)}
          isLoading={isLoading}
        />

        <View
          style={
            isLoading
              ? { rowGap: Size.calcHeight(5) }
              : { rowGap: Size.calcHeight(2) }
          }
        >
          {isLoading ? (
            <AppSkeletonLoader width={Size.calcWidth(150)} />
          ) : (
            <AppText style={styles.vistorName}>{name}</AppText>
          )}

          {isLoading ? (
            <AppSkeletonLoader width={Size.calcWidth(100)} />
          ) : (
            <AppText style={styles.time}>{time}</AppText>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  checkedInByContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: Size.calcWidth(10),
  },

  checkedInByText: {
    color: colors.GRAY_300,
    fontSize: Size.calcAverage(12),
    fontFamily: fonts.INTER_500,
    paddingHorizontal: Size.calcWidth(10),
    paddingTop: Size.calcHeight(20),
    paddingBottom: Size.calcHeight(9),
  },

  time: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
  },

  vistorName: {
    fontFamily: fonts.INTER_500,
    color: colors.GRAY_400,
  },
});

export default BookingAccessByCard;
