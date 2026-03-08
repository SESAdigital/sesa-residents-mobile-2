import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { FlatList, StyleSheet, View } from 'react-native';

import { NotificationTypeData } from '@src/api/constants/default';
import {
  getNofications,
  GetNotificationsResData,
  getNotificationsUnreadCount,
  postNotification,
} from '@src/api/notifications.api';
import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppListFooterLoader from '@src/components/common/AppListFooterLoader';
import SwitchPropertyRow from '@src/components/common/SwitchPropertyRow';
import AppProfilePicture from '@src/components/custom/AppProfilePicture';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import DuplicateLoader from '@src/components/DuplicateLoader';
import EmptyTableComponent from '@src/components/EmptyTableComponent';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { getTotalPages } from '@src/utils';
import { handleToastApiError } from '@src/utils/handleErrors';
import Size from '@src/utils/useResponsiveSize';
import NotificationRow, {
  NotificationRowLoader,
} from './components/NotificationRow';
import { DEFAULT_API_DATA_SIZE } from '@src/api/base.api';
import queryKeys from '@src/api/constants/queryKeys';
import { useNotificationClick } from './useNotificationClick';
import { useEffect, useState } from 'react';

const now = new Date().toISOString();

const notifications: GetNotificationsResData[] = Object.entries(
  NotificationTypeData,
).flatMap(([key, value], index) => [
  {
    id: index * 2 + 1,
    title: key.replace(/_/g, ' '),
    message: `${key.replace(/_/g, ' ')} notification.`,
    isRead: true,
    notificationTypeId: value,
    notificationType: value,
    timeCreated: now,
    timePosted: now,
  },
  {
    id: index * 2 + 2,
    title: key.replace(/_/g, ' '),
    message: `${key.replace(/_/g, ' ')} notification.`,
    isRead: false,
    notificationTypeId: value,
    notificationType: value,
    timeCreated: now,
    timePosted: now,
  },
]);

const queryKey = [queryKeys.GET_NOTIFICATIONS];

const pageSize = DEFAULT_API_DATA_SIZE;

const ActivityScreen = (): React.JSX.Element => {
  const [unReadIds, setUnReadIds] = useState<number[]>([]);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isNotificationLoading,
  } = useInfiniteQuery({
    queryKey,

    queryFn: async ({ pageParam }) => {
      const response = await getNofications({
        PageNumber: pageParam,
        PageSize: pageSize,
      });
      if (response.ok) {
        return response?.data;
      } else {
        handleToastApiError(response);
        return null;
      }
    },

    initialPageParam: 1,

    getNextPageParam: lastPage => {
      if (!lastPage) return undefined;
      const { currentPage, totalRecordCount: totalItems } = lastPage.data;
      const totalPages = getTotalPages({ pageSize, totalItems });
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const formattedData =
    data?.pages?.flatMap(page => page?.data?.records)?.filter(val => !!val) ||
    [];

  const queryClient = useQueryClient();

  const refetch = () => queryClient.resetQueries({ queryKey });

  const { data: notificatonCount, isLoading: isNotificationCountLoading } =
    useQuery({
      queryKey: [queryKeys.GET_NOTIFICATIONS, 'getNotificationsUnreadCount'],
      queryFn: async () => {
        const response = await getNotificationsUnreadCount();
        if (response.ok) {
          return response?.data?.data;
        } else {
          handleToastApiError(response);
          return null;
        }
      },
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    });

  const isLoading = isNotificationCountLoading || isNotificationLoading;

  const { handleNotificationClick } = useNotificationClick();

  console.log(formattedData);

  const handlePushUnReadId = (id: number) => {
    if (!unReadIds.includes(id)) {
      setUnReadIds(prev => [...prev, id]);
    }
  };

  const handleMarkAsRead = async () => {
    if (unReadIds?.length > 0) {
      const response = await postNotification({
        notificationIds: unReadIds,
      });
      if (response.ok) {
        setUnReadIds([]);
      }
    }
  };

  useEffect(() => {
    return () => {
      handleMarkAsRead();
    };
  }, []);

  return (
    <AppScreen>
      <View style={styles.headerContainer}>
        <View>
          <AppText style={styles.headerText}>Activity</AppText>
          <SwitchPropertyRow />
        </View>
        <AppProfilePicture />
      </View>
      <View style={styles.banner}>
        <AppText style={{ fontSize: Size.calcAverage(12) }}>
          {notificatonCount || 0} Unread
        </AppText>
      </View>

      <FlatList
        data={notifications}
        refreshControl={
          <AppRefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        showsVerticalScrollIndicator
        ListEmptyComponent={
          isLoading ? (
            <DuplicateLoader number={7} loader={<NotificationRowLoader />} />
          ) : (
            <EmptyTableComponent />
          )
        }
        renderItem={({ item }) => (
          <NotificationRow
            onPushUnReadId={handlePushUnReadId}
            onViewClick={() => handleNotificationClick(item)}
            data={item}
          />
        )}
        keyExtractor={(_, index) => index?.toString()}
        contentContainerStyle={{ paddingBottom: Size.calcHeight(70) }}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={2}
        ListFooterComponent={
          <AppListFooterLoader isloading={isFetchingNextPage} />
        }
      />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  banner: {
    borderTopWidth: Size.calcHeight(1),
    borderBottomWidth: Size.calcHeight(1),
    paddingVertical: Size.calcHeight(6),
    paddingHorizontal: Size.calcWidth(21),
    borderColor: colors.LIGHT_GRAY_200,
  },

  headerContainer: {
    paddingVertical: Size.calcHeight(12),
    paddingHorizontal: Size.calcWidth(21),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerText: {
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(16),
    color: colors.BLACK_200,
    paddingBottom: Size.calcHeight(2),
  },
});

export default ActivityScreen;
