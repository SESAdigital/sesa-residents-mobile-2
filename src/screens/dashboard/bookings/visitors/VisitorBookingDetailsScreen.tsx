import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ScrollView, StyleSheet, View } from 'react-native';

import {
  getSingleVisitorBooking,
  patchCancelVisitorBooking,
  patchSignOutVisitorBooking,
} from '@src/api/bookings.api';
import { AccessCodeStatusData } from '@src/api/constants/default';
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
import BookingAccessByCard from '@src/components/custom/BookingAccessByCard';
import SubmitButton from '@src/components/forms/SubmitButton';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { AppScreenProps } from '@src/navigation/AppNavigator';
import { useAppStateStore } from '@src/stores/appState.store';
import { useAuthStore } from '@src/stores/auth.store';
import { appToast } from '@src/utils/appToast';
import { handleToastApiError } from '@src/utils/handleErrors';
import { dayJSFormatter } from '@src/utils/time';
import Size from '@src/utils/useResponsiveSize';
import VisitorBookingStatus from './VisitorBookingStatus';

type Props = AppScreenProps<'VISITOR_BOOKING_DETAILS_SCREEN'>;

const VisitorBookingDetailsScreen = (props: Props): React.JSX.Element => {
  const paramId = props?.route?.params?.id;
  const { selectedProperty } = useAuthStore();
  const { closeActiveModal, setActiveModal, setIsAppModalLoading } =
    useAppStateStore();
  const queryClient = useQueryClient();

  const queryKey = [queryKeys.GET_VISITOR_BOOKINGS, 'single', paramId];

  const refetch = () => queryClient.resetQueries({ queryKey });

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await getSingleVisitorBooking(paramId);
      if (response.ok) {
        return response?.data?.data;
      } else {
        handleToastApiError(response);
        return null;
      }
    },
    enabled: !!paramId && !isNaN(paramId),
  });

  const splitedName = data?.visitorName?.split(' ');

  const detailList: AppDetailCardDetailItem = [
    [
      {
        title: 'VISITATION DATE',
        value: dayJSFormatter({
          format: 'MMM D, YYYY',
          value: data?.dateOfVisitation || '',
        }),
      },
    ],
    [
      {
        title: 'ACCESS CODE',
        value: data?.code || '',
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
        title: 'PHONE NUMBER',
        value: data?.phoneNumber || '',
      },
    ],
  ];

  const onVisitorSignOut = async () => {
    setIsAppModalLoading(true);
    const response = await patchSignOutVisitorBooking({
      id: data?.id!,
      propertyId: selectedProperty?.id!,
    });
    setIsAppModalLoading(false);

    if (response?.ok) {
      queryClient.resetQueries({
        queryKey: [queryKeys.GET_VISITOR_BOOKINGS],
      });
      appToast.Success(
        response?.data?.message || 'Visitor signed out successfully',
      );
      closeActiveModal();
    } else {
      handleToastApiError(response);
    }
    return;
  };

  const handleVisitorSignOut = () => {
    if (!data?.id) return appToast.Warning('Invalid Booking details');
    if (!selectedProperty?.id)
      return appToast.Warning('Please select a property');

    return setActiveModal({
      shouldBackgroundClose: true,
      modalType: 'PROMT_MODAL',
      promptModal: {
        title: 'Sign-out Visitor?',
        description:
          'You are about to sign-out this visitor. Are you sure you want to continue?',
        yesButtonTitle: 'No, Keep',
        isInverse: true,
        noButtonProps: {
          titleStyle: {
            color: colors.RED_100,
          },
        },
        noButtonTitle: 'Yes, I’m sure',
        onYesButtonClick: onVisitorSignOut,
      },
    });
  };

  const onBookingCancel = async () => {
    setIsAppModalLoading(true);
    const response = await patchCancelVisitorBooking(data?.id!);
    setIsAppModalLoading(false);

    if (response?.ok) {
      queryClient.resetQueries({
        queryKey: [queryKeys.GET_VISITOR_BOOKINGS],
      });
      appToast.Success(
        response?.data?.message || 'Visitor signed out successfully',
      );
      closeActiveModal();
    } else {
      handleToastApiError(response);
    }
    return;
  };

  const handleCancelBooking = () => {
    if (!data?.id) return appToast.Warning('Invalid Booking details');

    return setActiveModal({
      shouldBackgroundClose: true,
      modalType: 'PROMT_MODAL',
      promptModal: {
        title: 'Cancel booking?',
        description:
          'You are about to cancel this visitor booking. Are you sure you want to continue?',
        yesButtonTitle: 'No, Keep',
        isInverse: true,
        noButtonProps: {
          titleStyle: {
            color: colors.RED_100,
          },
        },
        noButtonTitle: 'Yes, I’m sure',
        onYesButtonClick: onBookingCancel,
      },
    });
  };

  return (
    <AppScreen showDownInset>
      <AppScreenHeader title="Visitor Details" />
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
            size={Size.calcAverage(50)}
            isLoading={isLoading}
          />
          {isLoading ? (
            <View style={styles.name}>
              <AppSkeletonLoader width={Size.calcWidth(150)} />
            </View>
          ) : (
            <AppText style={styles.name}>{data?.visitorName}</AppText>
          )}

          {!data?.checkOutTime && !isLoading && (
            <View style={{ paddingTop: Size.calcHeight(5) }}>
              <VisitorBookingStatus
                status={data?.status || 0}
                statusText={data?.statusText || ''}
                checkInTime={data?.checkInTime || ''}
                checkOutTime={data?.checkOutTime || ''}
              />
            </View>
          )}
        </View>

        <AppDetailCard isLoading={isLoading} detailList={detailList} />

        {data?.checkInTime && (
          <BookingAccessByCard
            title="Checked-in by"
            name={data?.checkInBy || ''}
            time={data?.checkInTime}
            imageURL={data?.checkInByPhoto || ''}
            isLoading={isLoading}
          />
        )}
        {data?.checkOutTime && (
          <BookingAccessByCard
            title="Checked-out by"
            name={data?.checkOutBy || ''}
            time={data?.checkOutTime}
            imageURL={data?.checkOutByPhoto || ''}
            isLoading={isLoading}
          />
        )}
      </ScrollView>
      {(data?.shouldSignOut ||
        data?.status === AccessCodeStatusData.Pending) && (
        <View style={styles.footer}>
          {data?.status === AccessCodeStatusData.Pending ? (
            <SubmitButton
              variant="DANGER_LIGHT"
              title="Cancel Booking"
              onPress={handleCancelBooking}
            />
          ) : (
            <SubmitButton
              variant="SECONDARY"
              titleStyle={{ color: colors.RED_100 }}
              title="Sign-out Visitor"
              onPress={handleVisitorSignOut}
            />
          )}
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
});

export default VisitorBookingDetailsScreen;
