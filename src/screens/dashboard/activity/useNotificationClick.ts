import { NotificationTypeData } from '@src/api/constants/default';
import { GetNotificationsResData } from '@src/api/notifications.api';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import { copyTextToClipboard } from '@src/utils';

export const useNotificationClick = () => {
  const navigtion = useAppNavigator();

  const handleTokenCopy = (message: string) => {
    const rawToken1 = message?.split(':')?.[1];
    const rawToken2 = rawToken1?.split('|')?.[0];
    const token = rawToken2?.trim?.();
    copyTextToClipboard({
      successText: 'Token Copied Successfully',
      text: token,
    });
  };

  const handleNewWalkInVisitoryClick = (val: GetNotificationsResData) => {
    if (val?.notificationType === NotificationTypeData.NEW_WALK_IN_VISITOR) {
      navigtion.navigate(routes.NEW_WALK_IN_VISITOR_ACTIVITY_SCREEN, {
        id: val?.id,
      });
    }
  };

  const handleNotificationClick = (val: GetNotificationsResData) => {
    if (val?.notificationType === NotificationTypeData.TOKEN_PURCHASE) {
      handleTokenCopy(val?.message);
    }

    if (val?.notificationType === NotificationTypeData.NEW_WALK_IN_VISITOR) {
      handleNewWalkInVisitoryClick(val);
    }
  };

  return { handleNotificationClick };
};
