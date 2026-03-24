import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { GetNotificationsResData } from '@src/api/notifications.api';
import AppAvatar from '@src/components/AppAvatar';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';
import AppText from '@src/components/AppText';
import SubmitButton from '@src/components/forms/SubmitButton';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { formatRelativeTime } from '@src/utils/time';
import Size from '@src/utils/useResponsiveSize';
import { useLayoutEffect } from 'react';
import { notificationMapper } from '../notificationMapper';

interface Props {
  data: GetNotificationsResData;
  onViewClick: () => void;
  onPushUnReadId: (id: number) => void;
}

const NotificationRow = (props: Props): React.JSX.Element => {
  const { data, onViewClick, onPushUnReadId } = props;
  const { Icon, iconColor, iconBgColor, buttonTitle, buttonVariant } =
    notificationMapper(data?.notificationType);

  useLayoutEffect(() => {
    if (!data?.isRead) {
      onPushUnReadId(data?.id);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.iconRow}>
        <View style={[styles.dot, data?.isRead && { opacity: 0 }]} />
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: iconBgColor || colors.WHITE_300 },
          ]}
        >
          <Icon
            color={iconColor}
            height={Size.calcAverage(20)}
            width={Size.calcAverage(20)}
          />
        </View>
      </View>

      <TouchableOpacity
        disabled={!buttonTitle}
        onPress={onViewClick}
        style={styles.mainContainer}
      >
        <AppText style={styles.title}>{data?.title}</AppText>
        <AppText style={styles.description}>{data?.message}</AppText>
        <AppText style={styles.time}>
          {formatRelativeTime(data?.timeCreated || '')}
        </AppText>
        {!!buttonTitle && (
          <SubmitButton
            title={buttonTitle}
            variant={buttonVariant}
            style={styles.button}
            onPress={onViewClick}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export const NotificationRowLoader = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.iconRow}>
        <AppAvatar isLoading />
      </View>

      <View style={styles.mainContainer}>
        <AppSkeletonLoader width={Size.calcWidth(100)} />
        <AppSkeletonLoader
          style={styles.description}
          width={Size.calcWidth(150)}
        />
        <AppSkeletonLoader width={Size.calcWidth(50)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: Size.calcHeight(8),
    marginTop: Size.calcHeight(12),
    maxWidth: '90%',
    marginHorizontal: 'auto',
    width: '100%',
  },

  container: {
    flexDirection: 'row',
    paddingHorizontal: Size.calcWidth(21),
    paddingTop: Size.calcHeight(14),
  },

  dot: {
    height: Size.calcAverage(8),
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: colors.BLUE_200,
    marginLeft: Size.calcWidth(-16),
  },

  description: {
    paddingTop: Size.calcHeight(5),
    paddingBottom: Size.calcHeight(7),
    fontSize: Size.calcAverage(12),
  },

  iconContainer: {
    height: Size.calcAverage(40),
    width: Size.calcAverage(40),
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconRow: {
    flexDirection: 'row',
    flexShrink: 0,
    columnGap: Size.calcWidth(8.5),
    marginBottom: 'auto',
    alignItems: 'center',
    paddingTop: Size.calcHeight(5),
    paddingRight: Size.calcWidth(12),
  },

  mainContainer: {
    flexShrink: 1,
    borderBottomWidth: Size.calcHeight(1),
    borderBottomColor: colors.WHITE_300,
    paddingBottom: Size.calcHeight(14),
    width: '100%',
  },

  time: {
    color: colors.GRAY_200,
    fontSize: Size.calcAverage(12),
  },

  title: {
    fontFamily: fonts.INTER_500,
    color: colors.BLACK_300,
  },
});
export default NotificationRow;
