import { useQueryClient } from '@tanstack/react-query';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

import colors from '@src/configs/colors';
import Size from '@src/utils/useResponsiveSize';
import AppText from '@src/components/AppText';
import AppCircularCheckIcon from '@src/components/custom/AppCircularCheckIcon';
import {
  MaterialSymbolsCloseRounded,
  MaterialSymbolsHome,
} from '@src/components/icons';
import SubmitButton from '@src/components/forms/SubmitButton';
import { useAppStateStore } from '@src/stores/appState.store';
import fonts from '@src/configs/fonts';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';
import { useGetProperties } from '@src/hooks/useGetRequests';
import queryKeys from '@src/api/constants/queryKeys';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import DuplicateLoader from '@src/components/DuplicateLoader';
import EmptyTableComponent from '@src/components/EmptyTableComponent';
import { GetDashboardPropertiesData } from '@src/api/dashboard.api';
import { useAuthStore } from '@src/stores/auth.store';
import { useState } from 'react';

const SwitchPropertyModal = (): React.ReactNode => {
  const { closeActiveModal } = useAppStateStore();
  const { data: properties, isLoading } = useGetProperties();
  const queryClient = useQueryClient();
  const { selectedProperty, setSelectedProperty } = useAuthStore();
  const [tempPropertyId, setTempPropertyId] = useState<number | null>(
    selectedProperty?.id || null,
  );

  const refetch = () =>
    queryClient.resetQueries({
      queryKey: [queryKeys.GET_DASHBOARD_PROPERTIES],
    });

  const handleSwitch = () => {
    if (tempPropertyId === selectedProperty?.id) {
      closeActiveModal();
      return;
    }

    const property = properties?.find(item => item?.id === tempPropertyId);
    if (property) {
      setSelectedProperty(property);
    }
    closeActiveModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeContainer}
          onPress={closeActiveModal}
        >
          <MaterialSymbolsCloseRounded
            height={Size.calcAverage(28)}
            width={Size.calcAverage(28)}
            color={colors.BLUE_120}
          />
        </TouchableOpacity>
        <AppText style={styles.headerTitle}>Switch Property</AppText>
      </View>

      <FlatList
        data={properties || []}
        refreshControl={
          <AppRefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        style={{ maxHeight: Size.getHeight() / 2 }}
        showsVerticalScrollIndicator
        ListEmptyComponent={
          isLoading ? (
            <DuplicateLoader loader={<PropertyRowLoader />} />
          ) : (
            <EmptyTableComponent onRetry={refetch} />
          )
        }
        renderItem={({ item }) => (
          <PropertyRow
            property={item}
            isSelected={tempPropertyId === item?.id}
            onPress={() => setTempPropertyId(item?.id)}
          />
        )}
        keyExtractor={(_, index) => index?.toString()}
      />

      <View style={styles.footer}>
        <SubmitButton
          style={{ width: '48%' }}
          onPress={closeActiveModal}
          variant="SECONDARY"
          title="Cancel"
        />
        <SubmitButton
          style={{ width: '48%' }}
          onPress={handleSwitch}
          title="Switch Property"
        />
      </View>
    </View>
  );
};

interface PropertyRowProps {
  property: GetDashboardPropertiesData;
  onPress: () => void;
  isSelected: boolean;
}

function PropertyRow(props: PropertyRowProps) {
  const { property, onPress, isSelected } = props;

  return (
    <TouchableOpacity onPress={onPress} style={styles.row}>
      <MaterialSymbolsHome
        height={Size.calcAverage(24)}
        width={Size.calcAverage(24)}
        color={colors.GRAY_100}
      />
      <View style={styles.propertyInfo}>
        <AppText numberOfLines={1} style={styles.propertyName}>
          {property?.propertyCategoryText}
        </AppText>
        <AppText numberOfLines={1} style={styles.propertyAddress}>
          {property?.propertyAddress}
        </AppText>
      </View>
      <AppCircularCheckIcon isChecked={isSelected} />
    </TouchableOpacity>
  );
}
function PropertyRowLoader() {
  return (
    <TouchableOpacity style={styles.row}>
      <MaterialSymbolsHome
        height={Size.calcAverage(24)}
        width={Size.calcAverage(24)}
        color={colors.GRAY_100}
      />
      <View style={styles.propertyInfo}>
        <AppSkeletonLoader
          height={Size.calcHeight(11)}
          width={Size.getWidth() / 3}
        />
        <AppSkeletonLoader
          height={Size.calcHeight(11)}
          width={Size.getWidth() / 2}
        />
      </View>
      <AppCircularCheckIcon isChecked={false} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  closeContainer: {
    position: 'absolute',
    left: Size.calcWidth(21),
    padding: Size.calcAverage(5),
    top: Size.calcHeight(3),
    bottom: Size.calcHeight(3),
    justifyContent: 'center',
    zIndex: 2,
  },

  container: {
    backgroundColor: colors.WHITE_100,
    borderRadius: Size.calcAverage(12),
    overflow: 'hidden',
  },

  footer: {
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(18),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: colors.WHITE_300,
    borderTopWidth: Size.calcHeight(2),
  },

  header: {
    padding: Size.calcAverage(16),
    position: 'relative',
  },

  headerTitle: {
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(16),
    textAlign: 'center',
  },

  propertyAddress: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
  },

  propertyInfo: {
    flex: 1,
    paddingHorizontal: Size.calcWidth(10),
    rowGap: Size.calcHeight(5),
  },

  propertyName: {
    fontFamily: fonts.INTER_500,
    fontSize: Size.calcAverage(13),
  },

  row: {
    flexDirection: 'row',
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(12),
    alignItems: 'center',
    borderBottomColor: colors.WHITE_300,
    borderBottomWidth: Size.calcHeight(1),
  },
});

export default SwitchPropertyModal;
