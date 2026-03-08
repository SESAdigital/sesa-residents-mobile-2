import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ScrollView, StyleSheet, View } from 'react-native';

import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import SubmitButton from '@src/components/forms/SubmitButton';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { AppScreenProps, useAppNavigator } from '@src/navigation/AppNavigator';
import Size from '@src/utils/useResponsiveSize';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import queryKeys from '@src/api/constants/queryKeys';
import { handleToastApiError } from '@src/utils/handleErrors';
import {
  getNotificationVisitorRequest,
  patchNotificationVisitorRequest,
} from '@src/api/notifications.api';
import AppImage from '@src/components/AppImage';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import { useAppStateStore } from '@src/stores/appState.store';
import { appToast } from '@src/utils/appToast';
import AppLoadingModal from '@src/modals/AppLoadingModal';
import { dayJSFormatter } from '@src/utils/time';
import { AccessNotificationStatusData } from '@src/api/constants/default';

type Props = AppScreenProps<'NEW_WALK_IN_VISITOR_ACTIVITY_SCREEN'>;

const data = {
  id: 1,
  phoneNumber: '08031234567',
  fullName: 'John Doe',
  visitorMessage: 'Visiting a friend',
  visitationDate: '2026-03-08T10:24:36.165Z',
  numberOfOccupant: 1,
  photo: 'https://i.pravatar.cc/150?img=1',
  modeEntryType: 1,
  modeEntryTypeText: 'Walk-in',
  status: 0,
  propertyName: 'Sunshine Estate',
  propertyAddress: '12 Admiralty Way, Lekki',
  code: 'VIS-1001',
  checkInTime: '10:30 AM',
  checkOutTime: '12:15 PM',
  checkInDate: '2026-03-08T10:30:00.000Z',
  checkedInBy: {
    name: 'Security Officer A',
    checkTime: '10:30 AM',
    photo: 'https://i.pravatar.cc/150?img=11',
  },
  checkedOutBy: {
    name: 'Security Officer B',
    checkTime: '12:15 PM',
    photo: 'https://i.pravatar.cc/150?img=12',
  },
};

interface DetailItem {
  title: string;
  value: string;
}

const NewWalkInVisitorActivityScreen = (props: Props): React.JSX.Element => {
  const param = props?.route?.params;
  const queryClient = useQueryClient();
  const { setActiveModal, closeActiveModal } = useAppStateStore();
  const queryKey = [
    queryKeys.GET_NOTIFICATIONS,
    'getNotificationVisitorRequest',
    param?.id,
  ];
  const navigation = useAppNavigator();
  const { isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await getNotificationVisitorRequest(param?.id);
      if (response.ok) {
        return response?.data?.data;
      } else {
        handleToastApiError(response);
        return null;
      }
    },
    enabled: !!param?.id,
  });

  const detailList: DetailItem[][] = [
    [
      {
        title: 'VISITOR’S MESSAGE',
        value: data?.visitorMessage || '',
      },
    ],
    [
      {
        title: 'DATE',
        value: data?.checkInDate
          ? dayJSFormatter({ format: 'MMM D, YYYY', value: data?.checkInDate })
          : '',
      },
      {
        title: 'TIME',
        value: data?.checkInTime || '',
      },
    ],
    [
      {
        title: 'ACCESS MODE',
        value: data?.modeEntryTypeText || '',
      },
      {
        title: 'NUMBER OF ENTRANTS',
        value: data?.numberOfOccupant?.toLocaleString() || '',
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
        title: 'ADDRESS',
        value: data?.propertyAddress || '',
      },
    ],
  ];

  const onApproveOrReject = async (type: 'Approve' | 'Reject') => {
    if (!data?.id) return appToast.Warning('Invalid walk-in visitor');

    const response = await patchNotificationVisitorRequest({
      route: type,
      id: data?.id,
    });

    if (response?.ok) {
      queryClient.resetQueries({ queryKey: [queryKeys.GET_NOTIFICATIONS] });
      closeActiveModal();
      appToast.Success(response?.data?.message || `${type} Successful`);
    } else {
      handleToastApiError(response);
    }

    return;
  };

  const handleApproveOrReject = (type: 'Approve' | 'Reject') => {
    setActiveModal({
      modalType: 'PROMT_MODAL',
      promptModal: {
        title: `${type} entry?`,
        description: `You are about to ${type?.toLowerCase()} entry for this walk-in visitor. Are you sure you want to continue?`,
        noButtonTitle: 'No, go back',
        yesButtonTitle: "Yes, I'm Sure",
        yesButtonProps: {
          variant: type === 'Reject' ? 'DANGER' : 'PRIMARY',
        },
        onYesButtonClick: () => onApproveOrReject(type),
      },
    });
  };

  const refetch = () => queryClient.resetQueries({ queryKey });

  return (
    <AppScreen showDownInset>
      <AppScreenHeader title="New walk-in visitor" />
      <AppLoadingModal isLoading={isLoading} />
      <ScrollView
        refreshControl={
          <AppRefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        showsVerticalScrollIndicator
      >
        <View style={styles.viewShotContainer}>
          <View style={styles.imageContainer}>
            <AppImage source={{ uri: data?.photo }} style={styles.image} />
          </View>
          <AppText style={styles.title}> {data?.fullName}</AppText>
          <AppText style={styles.description}>{data?.phoneNumber}</AppText>

          <View style={styles.detailContainer}>
            {detailList.map((item, firstIndex) => (
              <View style={styles.detailItemRow} key={firstIndex}>
                {item?.map((value, secondIndex) =>
                  !value?.value ? null : (
                    <View style={styles.detailItem} key={secondIndex}>
                      <View>
                        <AppText style={styles.detailItemTitle}>
                          {value?.title}
                        </AppText>
                        <AppText style={styles.detailItemValue}>
                          {value?.value || '--'}
                        </AppText>
                      </View>
                    </View>
                  ),
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        {!data || data?.status !== AccessNotificationStatusData.Pending ? (
          <SubmitButton
            variant="SECONDARY"
            title="Go Back"
            style={{ width: '100%' }}
            onPress={() => navigation.goBack()}
          />
        ) : (
          <>
            <SubmitButton
              variant="SECONDARY"
              style={{ width: '47%' }}
              title="Reject"
              titleStyle={{ color: colors.RED_100 }}
              onPress={() => handleApproveOrReject('Reject')}
            />
            <SubmitButton
              title="Approve"
              style={{ width: '47%' }}
              onPress={() => handleApproveOrReject('Approve')}
            />
          </>
        )}
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  description: {
    marginHorizontal: 'auto',
    textAlign: 'center',
    color: colors.GRAY_100,
    fontSize: Size.calcAverage(12),
    paddingBottom: Size.calcHeight(20),
  },

  detailContainer: {
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
  },

  detailItem: {
    paddingHorizontal: Size.calcWidth(20),
    paddingVertical: Size.calcHeight(15),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRightWidth: Size.calcWidth(1),
    borderColor: colors.WHITE_300,
  },

  detailItemRow: {
    borderBottomWidth: Size.calcHeight(1),
    borderColor: colors.WHITE_300,
    flexDirection: 'row',
  },

  detailItemTitle: {
    color: colors.GRAY_300,
    fontSize: Size.calcAverage(12),
  },

  detailItemValue: {
    fontFamily: fonts.INTER_500,
  },

  footer: {
    paddingVertical: Size.calcHeight(20),
    borderTopColor: colors.LIGHT_GRAY_100,
    borderTopWidth: Size.calcAverage(1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Size.calcWidth(21),
  },

  image: {
    height: Size.calcAverage(93),
    aspectRatio: 1,
    borderRadius: 100,
  },

  imageContainer: {
    alignItems: 'center',
    paddingBottom: Size.calcHeight(16),
  },

  title: {
    textAlign: 'center',
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(16),
    paddingBottom: Size.calcHeight(4),
  },

  viewShotContainer: {
    paddingBottom: Size.calcHeight(30),
    paddingTop: Size.calcHeight(30),
    paddingHorizontal: Size.calcWidth(21),
    backgroundColor: colors.WHITE_200,
  },
});
export default NewWalkInVisitorActivityScreen;
