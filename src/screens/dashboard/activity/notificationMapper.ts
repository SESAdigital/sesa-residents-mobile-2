import { SvgProps } from 'react-native-svg';

import {
  NotificationType,
  NotificationTypeData,
} from '@src/api/constants/default';
import { SubmitButtonVariants } from '@src/components/forms/SubmitButton';
import {
  MaterialSymbolsAccountCircle,
  MaterialSymbolsBadgeRounded,
  MaterialSymbolsBallotRounded,
  MaterialSymbolsCheckCircleRounded,
  MaterialSymbolsDirectionsCarRounded,
  MaterialSymbolsDirectionsWalkRounded,
  MaterialSymbolsEmojiObjects,
  MaterialSymbolsEngineeringRounded,
  MaterialSymbolsHowToVoteRounded,
  MaterialSymbolsNotificationsActiveRounded,
  MaterialSymbolsPayments,
  MaterialSymbolsSupervisorAccountRounded,
  MaterialSymbolsWallet,
} from '@src/components/icons';
import { SESAHomeIcon } from '@src/components/icons/custom';
import colors from '@src/configs/colors';

interface NotificationRowMapper {
  Icon: (val: SvgProps) => React.JSX.Element;
  iconColor: string;
  iconBgColor?: string;
  buttonTitle?: string;
  buttonVariant?: SubmitButtonVariants;
}

const modifiedBillOrCollection: NotificationType[] = [
  NotificationTypeData.COLLECTION_DELETED,
  NotificationTypeData.BILL_DELETED,
]; // TODO ASK ABOUT THIS IN BLUE

console.warn(modifiedBillOrCollection);

const deletedBillOrCollection: NotificationType[] = [
  NotificationTypeData.COLLECTION_DELETED,
  NotificationTypeData.BILL_DELETED,
];

const redSiteWorker: NotificationType[] = [
  NotificationTypeData.SITEWORKER_DECLINED,
  NotificationTypeData.SITE_WORKER_CHECK_OUT,
];

const greenSiteworker: NotificationType[] = [
  NotificationTypeData.SITEWORKER_APPROVED,
  NotificationTypeData.SITE_WORKER_CHECK_IN,
];

const redAccessCard: NotificationType[] = [
  NotificationTypeData.ACCESS_CARD_CHECK_OUT,
  NotificationTypeData.ACCESS_CARD_DEACTIVATED,
  NotificationTypeData.ACCESS_CARD_DELETED,
];

const greenAccessCard: NotificationType[] = [
  NotificationTypeData.ACCESS_CARD_CHECK_IN,
  NotificationTypeData.ACCESS_CARD_ACTIVATED,
  NotificationTypeData.ACCESS_CARD_ADDED,
];

export function notificationMapper(
  type: NotificationType,
): NotificationRowMapper {
  if (type === NotificationTypeData.NEW_WALK_IN_VISITOR) {
    return {
      Icon: MaterialSymbolsDirectionsWalkRounded,
      iconColor: colors.BLACK_100,
      buttonTitle: 'View Request',
    };
  }

  if (type === NotificationTypeData.PAYMENT_COMPLETED) {
    return {
      Icon: MaterialSymbolsCheckCircleRounded,
      iconColor: colors.GREEN_600,
    };
  }

  if (type === NotificationTypeData.NEW_COLLECTION) {
    return {
      Icon: MaterialSymbolsPayments,
      iconColor: colors.GREEN_100,
      buttonTitle: 'View & pay collection',
    };
  }
  if (type === NotificationTypeData.NEW_BILL) {
    return {
      Icon: MaterialSymbolsPayments,
      iconColor: colors.GREEN_100,
      buttonTitle: 'View & pay bill',
    };
  }

  if (deletedBillOrCollection.includes(type)) {
    return {
      Icon: MaterialSymbolsPayments,
      iconColor: colors.RED_700,
    };
  }

  if (type === NotificationTypeData.WALLET_FUNDED) {
    return {
      Icon: MaterialSymbolsWallet,
      iconColor: colors.GREEN_600,
    };
  }

  if (type === NotificationTypeData.WALLET_DEBIT) {
    return {
      Icon: MaterialSymbolsWallet,
      iconColor: colors.RED_700,
    };
  }

  if (type === NotificationTypeData.NEW_ELECTION) {
    return {
      Icon: MaterialSymbolsHowToVoteRounded,
      iconColor: colors.BLUE_180,
      buttonTitle: 'Vote now',
    };
  }

  if (type === NotificationTypeData.NEW_POLL) {
    return {
      Icon: MaterialSymbolsBallotRounded,
      iconColor: colors.BLACK_100,
      buttonTitle: 'Vote now',
    };
  }

  if (type === NotificationTypeData.ANNOUNCEMENT) {
    return {
      Icon: SESAHomeIcon,
      iconColor: colors.BLUE_200,
      buttonTitle: 'View announcement',
      buttonVariant: 'SECONDARY',
    };
  }

  if (type === NotificationTypeData.VISITOR_CHECK_IN) {
    return {
      Icon: MaterialSymbolsAccountCircle,
      iconColor: colors.GREEN_600,
    };
  }

  if (type === NotificationTypeData.VISITOR_CHECK_OUT) {
    return {
      Icon: MaterialSymbolsAccountCircle,
      iconColor: colors.RED_700,
    };
  }

  if (type === NotificationTypeData.MTAG_CHECK_IN) {
    return {
      Icon: MaterialSymbolsDirectionsCarRounded,
      iconColor: colors.GREEN_600,
    };
  }

  if (type === NotificationTypeData.MTAG_CHECK_OUT) {
    return {
      Icon: MaterialSymbolsDirectionsCarRounded,
      iconColor: colors.RED_700,
    };
  }

  if (greenAccessCard.includes(type)) {
    return {
      Icon: MaterialSymbolsBadgeRounded,
      iconColor: colors.GREEN_600,
    };
  }

  if (redAccessCard.includes(type)) {
    return {
      Icon: MaterialSymbolsBadgeRounded,
      iconColor: colors.RED_700,
    };
  }

  if (greenSiteworker.includes(type)) {
    return {
      Icon: MaterialSymbolsEngineeringRounded,
      iconColor: colors.GREEN_600,
    };
  }

  if (redSiteWorker.includes(type)) {
    return {
      Icon: MaterialSymbolsEngineeringRounded,
      iconColor: colors.RED_700,
    };
  }

  if (type === NotificationTypeData.PANIC_ALERT_RESOLVED) {
    return {
      Icon: MaterialSymbolsNotificationsActiveRounded,
      iconColor: colors.GREEN_600,
    };
  }

  if (type === NotificationTypeData.PANIC_ALERT_TRIGGERED) {
    return {
      Icon: MaterialSymbolsNotificationsActiveRounded,
      iconColor: colors.RED_700,
    };
  }

  if (type === NotificationTypeData.TOKEN_PURCHASE) {
    return {
      Icon: MaterialSymbolsEmojiObjects,
      iconColor: colors.YELLOW_300,
      //   iconBgColor: colors.YELLOW_600,
      buttonTitle: 'Copy Token',
      buttonVariant: 'SECONDARY',
    };
  }

  if (type === NotificationTypeData.GROUP_ACCESS_CHECK_IN) {
    return {
      Icon: MaterialSymbolsSupervisorAccountRounded,
      iconColor: colors.GREEN_600,
    };
  }

  return {
    Icon: SESAHomeIcon,
    iconColor: colors.BLACK_100,
  };
}
