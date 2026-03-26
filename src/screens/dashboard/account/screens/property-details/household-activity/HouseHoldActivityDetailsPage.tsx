import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ScrollView, StyleSheet, View } from 'react-native';

import queryKeys from '@src/api/constants/queryKeys';
import { getPropertyDetailsSingleHouseholdActivity } from '@src/api/property-details.api';
import AppScreen from '@src/components/AppScreen';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import { AppScreenProps } from '@src/navigation/AppNavigator';
import { handleToastApiError } from '@src/utils/handleErrors';
import Size from '@src/utils/useResponsiveSize';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import AppText from '@src/components/AppText';
import HouseHoldActivityIconTypeMapper from './components/HouseHoldActivityIconTypeMapper';
import fonts from '@src/configs/fonts';
import AppDetailCard, {
  AppDetailCardDetailItem,
} from '@src/components/common/AppDetailCard';
import { dayJSFormatter } from '@src/utils/time';
import AppImage from '@src/components/AppImage';
import AppAvatar from '@src/components/AppAvatar';

type Props = AppScreenProps<'HOUSEHOLD_ACTIVITY_DETAILS_PAGE'>;

const HouseHoldActivityDetailsPage = ({ route }: Props): React.JSX.Element => {
  const { id } = route.params;
  const queryClient = useQueryClient();
  const queryKey = [
    queryKeys.GET_PROPERTY_DETAILS,
    'getPropertyDetailsSingleHouseholdActivity',
    id,
  ];

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await getPropertyDetailsSingleHouseholdActivity(id);
      if (response.ok) {
        return response?.data?.data;
      } else {
        handleToastApiError(response);
        return null;
      }
    },
  });

  const refetch = () => queryClient.resetQueries({ queryKey });

  const detailList: AppDetailCardDetailItem = [
    [
      {
        title: 'ACTIVITY DATE',
        value: dayJSFormatter({
          format: 'MMM D, YYYY',
          value: data?.timeCreated || '',
          shouldNotLocalize: true,
        }),
      },
      {
        title: 'ACTIVITY TIME',
        value: dayJSFormatter({
          format: 'hh:mm A',
          value: data?.timeCreated || '',
          shouldNotLocalize: true,
        }),
      },
    ],
  ];

  const getOthers = () => {
    const mappedAdditionalDetails = Object.entries(
      data?.additionalDetails || {},
    ).map(([key, value]) => handleReturn(key, value));

    const mappedDetails = Object.entries(data?.details || {}).map(
      ([key, value]) => handleReturn(key, value),
    );

    return [...mappedDetails, ...mappedAdditionalDetails];
  };

  const others = getOthers();

  if (others.length > 0) {
    others?.forEach(item => {
      detailList.push([item]);
    });
  }

  return (
    <AppScreen showDownInset>
      <AppScreenHeader containerStyle={styles.header} />
      <ScrollView
        style={{ paddingHorizontal: Size.calcWidth(21) }}
        refreshControl={
          <AppRefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      >
        <View style={{ alignItems: 'center' }}>
          {isLoading ? (
            <AppAvatar isLoading size={60} />
          ) : (
            <HouseHoldActivityIconTypeMapper
              size={60}
              type={data?.activity || 1}
            />
          )}
          <AppText style={styles.activityText}>{data?.activityText}</AppText>
        </View>

        <AppDetailCard isLoading={isLoading} detailList={detailList} />
      </ScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  activityText: {
    fontSize: Size.calcAverage(16),
    fontFamily: fonts.INTER_600,
    textAlign: 'center',
    paddingTop: Size.calcHeight(12),
    paddingBottom: Size.calcHeight(20),
  },

  header: {
    paddingVertical: Size.calcHeight(25),
    borderBottomWidth: 0,
  },
});

export default HouseHoldActivityDetailsPage;

const handleReturn = (key: string, value: string) => {
  if (key?.toLowerCase()?.trim() === 'image' && !!value) {
    return {
      title: key?.toLocaleUpperCase(),
      value: (
        <AppImage
          source={{ uri: value }}
          style={{
            width: Size.calcWidth(100),
            height: Size.calcHeight(100),
            borderRadius: Size.calcAverage(10),
          }}
        />
      ),
    };
  }

  return {
    title: key?.toLocaleUpperCase(),
    value,
  };
};
