import { Pressable, StyleSheet, View } from 'react-native';

import AppText from '@src/components/AppText';
import {
  MaterialSymbolsChevronRightRounded,
  RiInformationFill,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import Size from '@src/utils/useResponsiveSize';
import routes from '@src/navigation/routes';
import { useGetBillsMetrics } from '@src/hooks/useGetRequests';

type Status = 'SUCCESS' | 'INFO' | 'DANGER';

interface ComponentProp {
  message: string;
  status: Status;
}

const BillReminderBanner = (): React.ReactNode => {
  const navigation = useAppNavigator();
  const {
    isEstatePaymentOverdue,
    isLoading,
    unPaidEstatePaymentCount,
    earliestPaymentDueDay,
  } = useGetBillsMetrics();

  const getComponentProps = (): ComponentProp => {
    if (isEstatePaymentOverdue || earliestPaymentDueDay < 0) {
      return {
        status: 'DANGER',
        message: 'You have an overdue estate payment to pay.',
      };
    }

    if (earliestPaymentDueDay === 0) {
      return {
        status: 'SUCCESS',
        message: 'You have an estate payment due today',
      };
    }

    return {
      status: 'INFO',
      message: `You have an estate payment due in ${earliestPaymentDueDay} day${
        earliestPaymentDueDay > 1 ? 's' : ''
      }`,
    };
  };

  const { message, status } = getComponentProps();

  const { color, backgroundColor } = getColors(status);

  if (isLoading || unPaidEstatePaymentCount) return null;

  return (
    <Pressable
      onPress={() => navigation.navigate(routes.BILLS_AND_COLLECTIONS_SCREEN)}
      style={[styles.container, { backgroundColor }]}
    >
      <View style={styles.row}>
        <RiInformationFill
          height={Size.calcAverage(20)}
          width={Size.calcAverage(20)}
          color={color}
        />
        <AppText style={styles.text}>{message}</AppText>
      </View>
      <MaterialSymbolsChevronRightRounded
        height={Size.calcAverage(20)}
        width={Size.calcAverage(20)}
        color={colors.BLACK_100}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Size.calcHeight(8),
    paddingHorizontal: Size.calcWidth(21),
    flexDirection: 'row',
    backgroundColor: colors.BLUE_400,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  text: {
    color: colors.BLACK_100,
    fontFamily: fonts.INTER_500,
    fontSize: Size.calcAverage(14),
    paddingLeft: Size.calcWidth(4),
  },
});

export default BillReminderBanner;

function getColors(status: Status) {
  if (status === 'DANGER') {
    return {
      color: colors.RED_100,
      backgroundColor: colors.RED_300,
    };
  }

  if (status === 'SUCCESS') {
    return {
      color: colors.GREEN_600,
      backgroundColor: colors.GREEN_200,
    };
  }
  return {
    color: colors.BLUE_600,
    backgroundColor: colors.BLUE_400,
  };
}
