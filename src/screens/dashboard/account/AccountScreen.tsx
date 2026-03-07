import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { getAccessHistory } from '@src/api/auth.api';
import { DEFAULT_API_DATA_SIZE } from '@src/api/base.api';
import AppText from '@src/components/AppText';
import DuplicateLoader from '@src/components/DuplicateLoader';
import EmptyTableComponent from '@src/components/EmptyTableComponent';
import AppListFooterLoader from '@src/components/common/AppListFooterLoader';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import {
  MaterialSymbolsArrowDropDown,
  MaterialSymbolsHelp,
  MaterialSymbolsHome,
  MaterialSymbolsQrCodeScanner,
  MaterialSymbolsSettings,
  MaterialSymbolsTouchApp,
  RiInformationFill,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useGetProperties } from '@src/hooks/useGetRequests';
import SwitchPropertyModal from '@src/modals/SwitchPropertyModal';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import { useAppStateStore } from '@src/stores/appState.store';
import { useAuthStore } from '@src/stores/auth.store';
import { getTotalPages } from '@src/utils';
import { handleToastApiError } from '@src/utils/handleErrors';
import Size from '@src/utils/useResponsiveSize';
import AccessHistoryRow, {
  AccessHistoryRowLoader,
} from './components/AccessHistoryRow';
import ProfileDetailsRow from './components/ProfileDetailsRow';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';

const pageSize = DEFAULT_API_DATA_SIZE;
const queryKey = ['getAccessHistory'];

const AccountScreen = (): React.JSX.Element => {
  const { setActiveModal } = useAppStateStore();
  const { selectedProperty } = useAuthStore();
  const navigation = useAppNavigator();
  const { data: properties, isLoading } = useGetProperties();

  const actions = [
    {
      Icon: MaterialSymbolsQrCodeScanner,
      onClick: () => {},
    },
    {
      Icon: MaterialSymbolsHelp,
      onClick: () => navigation.navigate(routes.HELP_CENTER_SCREEN),
    },
    {
      Icon: MaterialSymbolsSettings,
      onClick: () => navigation.navigate(routes.ACCOUNT_SETTINGS_SCREEN),
    },
  ];

  const actionButtons = [
    {
      title: 'Manage Profile',
      onClick: () => navigation.navigate(routes.MANAGE_PROFILE_SCREEN),
    },
    {
      title: 'Manage Household',
      onClick: () => navigation.navigate(routes.MANAGE_HOUSEHOLD_SCREEN),
    },
  ];

  const viewAccessInfo = () => {
    setActiveModal({
      modalType: 'INFORMATION_MODAL',
      shouldBackgroundClose: true,
      informationModal: {
        title: 'Access History',
        description:
          'This is your access history when you check-in or out using your resident code or QR code',
      },
    });
  };

  const handleSwitch = () => {
    setActiveModal({
      modalType: 'EMPTY_MODAL',
      emptyModalComponent: <SwitchPropertyModal />,
      shouldBackgroundClose: true,
    });
  };

  const {
    data: accessHistoryData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isAccessHistoryLoading,
  } = useInfiniteQuery({
    queryKey,

    queryFn: async ({ pageParam }) => {
      const response = await getAccessHistory({
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
  });

  const formattedData =
    accessHistoryData?.pages
      ?.flatMap(page => page?.data?.records)
      ?.filter(val => !!val) || [];

  const queryClient = useQueryClient();
  const refetch = () => queryClient.resetQueries({ queryKey });

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={styles.topContainer}>
        <View style={styles.accountHeader}>
          <AppText style={styles.accountTitle}>Account</AppText>
          <View style={styles.actions}>
            {actions?.map(({ Icon, onClick }, index) => (
              <TouchableOpacity key={index} onPress={onClick}>
                <Icon
                  height={Size.calcAverage(24)}
                  width={Size.calcAverage(24)}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.contentContainer}>
          <ProfileDetailsRow />

          <View style={styles.actionButtons}>
            {actionButtons?.map(({ title, onClick }, index) => (
              <TouchableOpacity
                style={styles.actionButton}
                key={index}
                onPress={onClick}
              >
                <AppText style={styles.actionButtonText}>{title}</AppText>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.switchPropertyContainer}>
            <AppText
              style={[styles.switchPropertyText, { color: colors.BLACK_200 }]}
            >
              Current Property
            </AppText>
            <TouchableOpacity onPress={handleSwitch} style={styles.row}>
              <AppText style={styles.switchPropertyText}>
                Switch Property ({properties?.length})
              </AppText>
              <MaterialSymbolsArrowDropDown
                height={Size.calcAverage(16)}
                width={Size.calcAverage(16)}
                color={colors.BLUE_200}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate(routes.PROPERTY_DETAILS_SCREEN)}
            style={styles.propertyCard}
          >
            <View style={styles.propertyIconContainer}>
              <MaterialSymbolsHome
                height={Size.calcAverage(24)}
                width={Size.calcAverage(24)}
                color={colors.WHITE_200}
              />
            </View>
            <View style={{ rowGap: Size.calcHeight(5), flexShrink: 1 }}>
              {isLoading ? (
                <AppSkeletonLoader
                  width="50%"
                  style={{ paddingVertical: Size.calcHeight(3) }}
                />
              ) : (
                <AppText style={styles.propertyName} numberOfLines={1}>
                  {selectedProperty?.name}
                </AppText>
              )}

              {isLoading ? (
                <AppSkeletonLoader
                  width="60%"
                  style={{ paddingVertical: Size.calcHeight(3) }}
                />
              ) : (
                <AppText style={styles.propertyAddress} numberOfLines={1}>
                  {selectedProperty?.propertyAddress}
                </AppText>
              )}
              <View style={styles.row}>
                <MaterialSymbolsTouchApp
                  height={Size.calcAverage(14)}
                  width={Size.calcAverage(14)}
                  color={colors.BLUE_200}
                />
                <AppText style={styles.propertyInstruction}>
                  Tap to view or configure access settings.
                </AppText>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.accessHistoryContainer}>
        <View style={styles.accessHistory}>
          <TouchableOpacity onPress={viewAccessInfo} style={styles.row}>
            <AppText style={styles.accessHistoryText}>Access History</AppText>
            <RiInformationFill
              height={Size.calcAverage(16)}
              width={Size.calcAverage(16)}
              color={colors.GRAY_200}
              style={{ marginBottom: Size.calcHeight(-4) }}
            />
          </TouchableOpacity>
          <View style={styles.row}>
            <AppText style={styles.switchPropertyText}>For You</AppText>
            <MaterialSymbolsArrowDropDown
              height={Size.calcAverage(16)}
              width={Size.calcAverage(16)}
              color={colors.BLUE_200}
            />
          </View>
        </View>
      </View>

      <FlatList
        data={formattedData}
        refreshControl={
          <AppRefreshControl
            refreshing={isAccessHistoryLoading}
            onRefresh={refetch}
          />
        }
        showsVerticalScrollIndicator
        ListEmptyComponent={
          isAccessHistoryLoading ? (
            <DuplicateLoader loader={<AccessHistoryRowLoader />} />
          ) : (
            <EmptyTableComponent />
          )
        }
        renderItem={({ item }) => <AccessHistoryRow val={item} />}
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
    </View>
  );
};

const styles = StyleSheet.create({
  accessHistory: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(10),
  },

  accessHistoryContainer: {
    borderBottomWidth: Size.calcHeight(1),
    borderBottomColor: colors.WHITE_300,
  },

  accessHistoryText: {
    paddingRight: Size.calcWidth(2),
    fontFamily: fonts.INTER_600,
    color: colors.BLACK_200,
  },

  actionButton: {
    backgroundColor: colors.WHITE_200,
    width: '46%',
    paddingVertical: Size.calcHeight(8),
    paddingHorizontal: Size.calcWidth(16),
    borderRadius: 100,
    borderWidth: Size.calcAverage(1),
    borderColor: colors.BLUE_150,
  },

  actionButtonText: {
    fontFamily: fonts.INTER_500,
    textAlign: 'center',
  },

  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Size.calcHeight(16),
    paddingBottom: Size.calcHeight(20),
    borderBottomWidth: Size.calcHeight(1),
    borderBottomColor: colors.BLUE_400,
  },

  accountHeader: {
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(21),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: Size.calcHeight(0.5),
    borderBottomColor: colors.BLUE_150,
  },

  accountTitle: {
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(16),
    color: colors.BLACK_200,
  },

  actions: {
    flexDirection: 'row',
    gap: Size.calcWidth(20),
  },

  contentContainer: {
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(19),
  },

  propertyCard: {
    backgroundColor: colors.WHITE_200,
    borderRadius: Size.calcAverage(8),
    padding: Size.calcAverage(20),
    flexDirection: 'row',
    borderWidth: Size.calcAverage(1),
    borderColor: colors.WHITE_300,
    shadowColor: colors.BLUE_150,
    columnGap: Size.calcWidth(12),
    shadowOffset: {
      width: 0,
      height: Size.calcHeight(0),
    },
    shadowOpacity: Size.calcAverage(0.25),
    shadowRadius: Size.calcAverage(15),
    elevation: Size.calcAverage(15),
  },

  propertyIconContainer: {
    backgroundColor: colors.BLUE_200,
    padding: Size.calcAverage(8),
    borderRadius: Size.calcAverage(36),
    marginBottom: 'auto',
  },

  propertyInstruction: {
    fontSize: Size.calcAverage(12),
    color: colors.BLUE_200,
    paddingLeft: Size.calcWidth(4),
  },

  propertyName: {
    fontFamily: fonts.INTER_500,
    fontSize: Size.calcAverage(12),
  },

  propertyAddress: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  switchPropertyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Size.calcHeight(20),
    paddingBottom: Size.calcHeight(12),
  },

  switchPropertyText: {
    fontSize: Size.calcAverage(12),
    fontFamily: fonts.INTER_600,
    color: colors.BLUE_200,
  },

  topContainer: {
    backgroundColor: colors.BLUE_140,
    paddingTop: StatusBar.currentHeight,
  },
});

export default AccountScreen;
