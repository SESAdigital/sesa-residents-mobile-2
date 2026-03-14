import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import {
  getSingleEventsBooking,
  patchCancelEventBooking,
} from '@src/api/bookings.api';
import { EventStatusTypeData } from '@src/api/constants/default';
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
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { AppScreenProps, useAppNavigator } from '@src/navigation/AppNavigator';
import { useAppStateStore } from '@src/stores/appState.store';
import { appToast } from '@src/utils/appToast';
import { handleToastApiError } from '@src/utils/handleErrors';
import { dayJSFormatter } from '@src/utils/time';
import Size from '@src/utils/useResponsiveSize';
import EventBookingStatus from './components/EventBookingStatus';
import { MaterialSymbolsChevronRightRounded } from '@src/components/icons';
import routes from '@src/navigation/routes';

type Props = AppScreenProps<'EVENT_BOOKING_DETAILS_SCREEN'>;

const EventBookingDetailsScreen = (props: Props): React.JSX.Element => {
  const paramId = props?.route?.params?.id;
  const { closeActiveModal, setActiveModal, setIsAppModalLoading } =
    useAppStateStore();
  const queryClient = useQueryClient();
  const navigation = useAppNavigator();
  const queryKey = [queryKeys.GET_EVENT_BOOKINGS, 'single', paramId];

  const refetch = () => queryClient.resetQueries({ queryKey });

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await getSingleEventsBooking(paramId);
      if (response.ok) {
        return response?.data?.data;
      } else {
        handleToastApiError(response);
        return null;
      }
    },
    enabled: !!paramId && !isNaN(paramId),
  });

  const splitedName = data?.name?.split(' ');

  const detailList: AppDetailCardDetailItem = [
    [
      {
        title: 'EVENT NAME',
        value: data?.name || '',
      },
    ],
    [
      {
        title: 'EVENT LOCATION',
        value: data?.eventAddress || '',
      },
    ],
    [
      {
        title: 'EVENT TYPE',
        value: data?.eventTypeText || '',
      },
    ],
    [
      {
        title: 'EVENT STARTS',
        value: dayJSFormatter({
          value: data?.startTime || '',
          format: 'MMMM D, YYYY h:mm A',
          shouldNotLocalize: true,
        }),
      },
      {
        title: 'EVENT ENDS',
        value: dayJSFormatter({
          value: data?.endTime || '',
          format: 'MMMM D, YYYY h:mm A',
          shouldNotLocalize: true,
        }),
      },
    ],

    [
      {
        title: 'EXPECTED GUESTS',
        value: `${
          data?.guestsCount
            ? `${data?.guestsCount} ${
                data?.isDailyLimit ? `(Daily Limit)` : ''
              }`
            : ''
        }`,
      },
      {
        title: 'EVENT CODE',
        value: data?.code || '',
      },
    ],
  ];

  const onEventCancel = async () => {
    setIsAppModalLoading(true);
    const response = await patchCancelEventBooking(data?.id!);
    setIsAppModalLoading(false);

    if (response?.ok) {
      queryClient.resetQueries({
        queryKey: [queryKeys.GET_EVENT_BOOKINGS],
      });
      appToast.Success(
        response?.data?.message || 'Event cancelled successfully',
      );
      closeActiveModal();
    } else {
      handleToastApiError(response);
    }
    return;
  };

  const handleCancelEvent = () => {
    if (!data?.id) return appToast.Warning('Invalid Event details');

    return setActiveModal({
      shouldBackgroundClose: true,
      modalType: 'PROMT_MODAL',
      promptModal: {
        title: 'Cancel event?',
        description:
          'You are about to cancel this event booking. Are you sure you want to continue?',
        yesButtonTitle: 'No, Keep',
        isInverse: true,
        noButtonProps: {
          titleStyle: {
            color: colors.RED_100,
          },
        },
        noButtonTitle: 'Yes, I’m sure',
        onYesButtonClick: onEventCancel,
      },
    });
  };

  const handleView = () => {
    if (!data?.id) return appToast.Warning('Invalid Event details');

    return navigation.navigate(routes.ATTENDEE_LIST_SCREEN, {
      id: data?.id,
      type: 'EVENT',
      title: 'Event Attendees',
      subtitle: data?.name || '',
      date: dayJSFormatter({
        value: data?.startTime || '',
        format: 'MMM D, YYYY',
        shouldNotLocalize: true,
      }),
    });
  };

  return (
    <AppScreen showDownInset>
      <AppScreenHeader title="Event Details" />
      <ScrollView
        refreshControl={
          <AppRefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        contentContainerStyle={styles.container}
      >
        <View style={styles.header}>
          <AppAvatar
            firstWord={splitedName?.[0]}
            lastWord={splitedName?.[1]}
            imageURL={data?.images?.[0]}
            size={Size.calcAverage(150)}
            style={{ borderRadius: Size.calcAverage(8) }}
            loadingRadius={Size.calcAverage(8)}
            isLoading={isLoading}
          />
          {isLoading ? (
            <View style={styles.name}>
              <AppSkeletonLoader width={Size.calcWidth(150)} />
            </View>
          ) : (
            <AppText style={styles.name}>{data?.name}</AppText>
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
            <EventBookingStatus
              status={data?.status || 0}
              statusText={data?.statusText || ''}
            />
          )}
          {isLoading ? (
            <AppSkeletonLoader width={Size.getWidth() / 2.8} />
          ) : (
            <View style={styles.stats}>
              <AppText style={styles.statsText}>
                {data?.totalCheckInCount?.toLocaleString() || 0} Check-ins
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
            title="Cancel Event"
            onPress={handleCancelEvent}
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

export default EventBookingDetailsScreen;
