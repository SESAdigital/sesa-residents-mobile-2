import { useMutation } from '@tanstack/react-query';
import { ScrollView, StyleSheet, View } from 'react-native';

import { patchPropertyDetailsAccessOptions } from '@src/api/property-details.api';
import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import InformationRow from '@src/components/common/InformationRow';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import AppSwitch from '@src/components/forms/AppSwitch';
import {
  MaterialSymbolsLightGroupOutline,
  MaterialSymbolsLightSettingsAccessibility,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useGetPropertyDetails } from '@src/hooks/useGetRequests';
import AppLoadingModal from '@src/modals/AppLoadingModal';
import { appToast } from '@src/utils/appToast';
import { handleToastApiError } from '@src/utils/handleErrors';
import Size from '@src/utils/useResponsiveSize';
import ActionItem, {
  ActionItemData,
} from '../../../../../components/common/ActionItem';

const PropertyDetailsConfigureAccessScreen = (): React.JSX.Element => {
  const {
    value: { data: propertyDetails, isLoading },
    customRefetch,
    propertyId,
  } = useGetPropertyDetails();

  const patchPropertyDetailsAccessOptionsAPI = useMutation({
    mutationFn: patchPropertyDetailsAccessOptions,
  });

  const isUpdating = patchPropertyDetailsAccessOptionsAPI?.isPending;

  const onToggle = async (type: 'Walk-in' | 'Group access') => {
    if (isLoading || isUpdating) return;

    if (!propertyId) return appToast.Warning('Property not found');

    const value =
      type === 'Walk-in'
        ? propertyDetails?.enableWalkIn
        : propertyDetails?.enableGroupAccess;

    const response = await patchPropertyDetailsAccessOptionsAPI?.mutateAsync({
      id: propertyId,
      value: {
        enableWalkIn:
          type === 'Walk-in' ? !value : !!propertyDetails?.enableWalkIn,
        enableGroupAccess:
          type === 'Group access'
            ? !value
            : !!propertyDetails?.enableGroupAccess,
      },
    });

    if (response?.ok) {
      customRefetch();
      appToast.Success(response?.data?.message || 'Updated successfully');
    } else {
      handleToastApiError(response);
    }
    return;
  };

  const actions: ActionItemData[] = [
    {
      title: 'Walk-in',
      description:
        "Toggle to permit walk-in or unknown visitors. You'll still need to approve their entry.",
      onPress: () => onToggle('Walk-in'),
      Icon: MaterialSymbolsLightSettingsAccessibility,
      rightIcon: (
        <AppSwitch
          isLoading={isLoading}
          isEnabled={!!propertyDetails?.enableWalkIn}
          onValueChange={() => onToggle('Walk-in')}
        />
      ),
    },
    {
      title: 'Group access',
      description:
        'Toggle to permit walk-in or unknown visitors. You won’t be required to approve their entry.',
      onPress: () => onToggle('Group access'),
      Icon: MaterialSymbolsLightGroupOutline,
      rightIcon: (
        <AppSwitch
          isLoading={isLoading}
          isEnabled={!!propertyDetails?.enableGroupAccess}
          onValueChange={() => onToggle('Group access')}
        />
      ),
    },
  ];

  return (
    <AppScreen showDownInset>
      <AppLoadingModal isLoading={isUpdating} />
      <AppScreenHeader>
        <View style={{ rowGap: Size.calcHeight(4) }}>
          <AppText style={styles.header}>Configure Access </AppText>
          <AppText style={styles.address} numberOfLines={1}>
            {propertyDetails?.address}
          </AppText>
        </View>
      </AppScreenHeader>
      <InformationRow title="Configure access for visitors without access codes." />
      <ScrollView
        refreshControl={
          <AppRefreshControl refreshing={isLoading} onRefresh={customRefetch} />
        }
        contentContainerStyle={{ paddingVertical: Size.calcHeight(20) }}
      >
        <AppText style={styles.sectionTitle}>Property Access options</AppText>
        <ActionItem containerStyle={{ paddingVertical: 0 }} data={actions} />
      </ScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  address: {
    color: colors.GRAY_100,
    fontSize: Size.calcAverage(12),
    paddingHorizontal: Size.calcWidth(50),
  },

  header: {
    textAlign: 'center',
    fontSize: Size.calcAverage(16),
    fontFamily: fonts.INTER_600,
  },

  sectionTitle: {
    paddingVertical: Size.calcHeight(4),
    paddingHorizontal: Size.calcWidth(21),
    color: colors.GRAY_100,
    fontSize: Size.calcAverage(12),
  },
});

export default PropertyDetailsConfigureAccessScreen;
