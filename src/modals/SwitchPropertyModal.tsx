import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

import queryKeys from '@src/api/constants/queryKeys';
import { GetDashboardPropertiesData } from '@src/api/dashboard.api';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';
import AppText from '@src/components/AppText';
import AppModalHeader from '@src/components/common/AppModalHeader';
import AppCircularCheckIcon from '@src/components/custom/AppCircularCheckIcon';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import DuplicateLoader from '@src/components/DuplicateLoader';
import EmptyTableComponent from '@src/components/EmptyTableComponent';
import SubmitButton from '@src/components/forms/SubmitButton';
import { MaterialSymbolsHome } from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useGetProperties } from '@src/hooks/useGetRequests';
import { useAppStateStore } from '@src/stores/appState.store';
import { useAuthStore } from '@src/stores/auth.store';
import Size from '@src/utils/useResponsiveSize';

const SwitchPropertyModal = (): React.JSX.Element => {
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
    <View style={styles.modalContainer}>
      <AppModalHeader onBackPress={closeActiveModal} title="Switch Property" />

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

      <View style={styles.modalFooter}>
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
  modalContainer: {
    backgroundColor: colors.WHITE_100,
    borderRadius: Size.calcAverage(12),
    overflow: 'hidden',
  },

  modalFooter: {
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(18),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: colors.WHITE_300,
    borderTopWidth: Size.calcHeight(2),
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
