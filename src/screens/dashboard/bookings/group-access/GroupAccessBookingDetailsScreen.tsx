import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import {
  getSingleGroupAccessBooking,
  patchCancelGroupAccessBooking,
} from '@src/api/bookings.api';
import queryKeys from '@src/api/constants/queryKeys';
import AppAvatar from '@src/components/AppAvatar';
import AppScreen from '@src/components/AppScreen';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';
import AppText from '@src/components/AppText';
import AppDetailCard, {
  AppDetailCardDetailItem,
} from '@src/components/common/AppDetailCard';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import SubmitButton from '@src/components/forms/SubmitButton';
import { MaterialSymbolsChevronRightRounded } from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { AppScreenProps, useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import { useAppStateStore } from '@src/stores/appState.store';
import { appToast } from '@src/utils/appToast';
import { handleToastApiError } from '@src/utils/handleErrors';
import { dayJSFormatter } from '@src/utils/time';
import Size from '@src/utils/useResponsiveSize';
import GroupAccessBookingStatus from './components/GroupAccessBookingStatus';
import { EventStatusTypeData } from '@src/api/constants/default';

type Props = AppScreenProps<'GROUP_ACCESS_BOOKING_DETAILS_SCREEN'>;

const GroupAccessBookingDetailsScreen = (props: Props): React.JSX.Element => {
  const paramId = props?.route?.params?.id;
  const { closeActiveModal, setActiveModal, setIsAppModalLoading } =
    useAppStateStore();
  const queryClient = useQueryClient();
  const navigation = useAppNavigator();
  const queryKey = [queryKeys.GET_GROUP_ACCESS_BOOKINGS, 'single', paramId];

  const refetch = () => queryClient.resetQueries({ queryKey });

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await getSingleGroupAccessBooking(paramId);
      if (response.ok) {
        return response?.data?.data;
      } else {
        handleToastApiError(response);
        return null;
      }
    },
    enabled: !!paramId && !isNaN(paramId),
  });

  const detailList: AppDetailCardDetailItem = [
    [
      {
        title: 'ACCESS DATE',
        value: dayJSFormatter({
          value: data?.startTime || '',
          format: 'MMMM D, YYYY',
          shouldNotLocalize: true,
        }),
      },
    ],
    [
      {
        title: 'PROPERTY ADDRESS',
        value: data?.propertyAddress || '',
      },
    ],
    [
      {
        title: 'PROPERTY NAME',
        value: data?.propertyName || '',
      },
    ],
    [
      {
        title: 'CHECK-IN PERIOD',
        value: data?.isAllDay ? 'All Day' : '',
      },
    ],
    [
      {
        title: 'Start Time',
        value: dayJSFormatter({
          value: data?.startTime || '',
          format: 'hh:mm A',
          shouldNotLocalize: true,
        }),
      },
      {
        title: 'End Time',
        value: dayJSFormatter({
          value: data?.endTime || '',
          format: 'hh:mm A',
          shouldNotLocalize: true,
        }),
      },
    ],
    [
      {
        title: 'Repeat Every',
        value: data?.repeatDays?.join(', ') || '',
      },
    ],
  ];

  const onGroupAccessCancel = async () => {
    setIsAppModalLoading(true);
    const response = await patchCancelGroupAccessBooking(data?.id!);
    setIsAppModalLoading(false);

    if (response?.ok) {
      queryClient.resetQueries({
        queryKey: [queryKeys.GET_GROUP_ACCESS_BOOKINGS],
      });
      appToast.Success(
        response?.data?.message || 'Group access cancelled successfully',
      );
      closeActiveModal();
    } else {
      handleToastApiError(response);
    }
    return;
  };

  const handleCancelGroupAccess = () => {
    if (!data?.id) return appToast.Warning('Invalid Group Access details');

    return setActiveModal({
      shouldBackgroundClose: true,
      modalType: 'PROMT_MODAL',
      promptModal: {
        title: 'Cancel Group Access?',
        description:
          'You are about to cancel this group access booking. Are you sure you want to continue?',
        yesButtonTitle: 'No, Keep',
        isInverse: true,
        noButtonProps: {
          titleStyle: {
            color: colors.RED_100,
          },
        },
        noButtonTitle: 'Yes, I’m sure',
        onYesButtonClick: onGroupAccessCancel,
      },
    });
  };

  const handleView = () => {
    if (!data?.id) return appToast.Warning('Invalid Group Access details');

    return navigation.navigate(routes.ATTENDEE_LIST_SCREEN, {
      id: data?.id,
      type: 'GROUP_ACCESS',
      title: data?.code,
      subtitle: data?.isAllDay
        ? `All Day`
        : `Check-in ends: ${dayJSFormatter({
            value: data?.endTime || '',
            format: 'hh:mm A',
            shouldNotLocalize: true,
          })}`,
      date: dayJSFormatter({
        value: data?.startTime || '',
        format: 'MMM D, YYYY',
        shouldNotLocalize: true,
      }),
    });
  };

  return (
    <AppScreen showDownInset>
      <AppScreenHeader title="Group Access Details" />
      <ScrollView
        refreshControl={
          <AppRefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        contentContainerStyle={styles.container}
      >
        <View style={styles.header}>
          <AppAvatar
            firstWord={data?.code?.[0]}
            lastWord={data?.code?.[1]}
            isLoading={isLoading}
          />
          {isLoading ? (
            <View style={styles.name}>
              <AppSkeletonLoader width={Size.calcWidth(150)} />
            </View>
          ) : (
            <AppText style={styles.name}>{data?.code}</AppText>
          )}
        </View>

        <TouchableOpacity
          onPress={handleView}
          style={styles.statsButton}
          disabled={isLoading}
        >
          {isLoading ? (
            <AppSkeletonLoader width={Size.getWidth() / 2.8} />
          ) : (
            <GroupAccessBookingStatus
              endTime={data?.endTime || ''}
              startDate={data?.startTime || ''}
              isAllDay={data?.isAllDay || false}
            />
          )}
          {isLoading ? (
            <AppSkeletonLoader width={Size.getWidth() / 2.8} />
          ) : (
            <View style={styles.stats}>
              <AppText style={styles.statsText}>
                {data?.checkInCounts?.toLocaleString() || 0} Check-ins
              </AppText>
              <MaterialSymbolsChevronRightRounded
                color={colors.BLACK_100}
                height={Size.calcAverage(20)}
                width={Size.calcAverage(20)}
              />
            </View>
          )}
        </TouchableOpacity>

        <AppDetailCard isLoading={isLoading} detailList={detailList} />
      </ScrollView>
      {(data?.status === EventStatusTypeData.New ||
        data?.status === EventStatusTypeData.Active) && (
        <View style={styles.footer}>
          <SubmitButton
            variant="DANGER_LIGHT"
            title="Cancel Group Access"
            onPress={handleCancelGroupAccess}
          />
        </View>
      )}
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Size.calcHeight(21),
    paddingHorizontal: Size.calcWidth(21),
  },

  footer: {
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(16),
    borderTopWidth: Size.calcHeight(1),
    borderTopColor: colors.WHITE_300,
  },

  header: {
    alignItems: 'center',
    paddingBottom: Size.calcHeight(20),
  },

  name: {
    paddingTop: Size.calcHeight(16),
    fontSize: Size.calcAverage(16),
    fontFamily: fonts.INTER_600,
    textAlign: 'center',
  },

  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    rowGap: Size.calcWidth(2),
  },

  statsButton: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Size.calcAverage(5),
    marginBottom: Size.calcHeight(20),
    borderWidth: Size.calcAverage(1),
    borderColor: colors.WHITE_300,
    shadowColor: colors.GRAY_600,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    backgroundColor: colors.WHITE_200,
    borderRadius: Size.calcAverage(12),
    paddingVertical: Size.calcHeight(12),
    paddingHorizontal: Size.calcWidth(21),
  },

  statsText: {
    fontFamily: fonts.INTER_500,
    color: colors.GRAY_400,
    fontSize: Size.calcAverage(12),
  },
});

export default GroupAccessBookingDetailsScreen;
