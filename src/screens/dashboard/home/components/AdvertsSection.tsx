import { useCallback, useEffect, useMemo, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { GetDashboardAdvertsData } from '@src/api/dashboard.api';
import SampleAdImage from '@src/assets/images/sample-ad.png';
import AppImage from '@src/components/AppImage';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';
import { useGetDasboardAdverts } from '@src/hooks/useGetRequests';
import { useAuthStore } from '@src/stores/auth.store';
import { openURL } from '@src/utils';
import appConfig from '@src/utils/appConfig';
import Size from '@src/utils/useResponsiveSize';

const defaultAdvert: GetDashboardAdvertsData = {
  id: 0,
  name: '',
  imageUrl: '',
  adUrlLink: `${appConfig.APP_WEBSITE_URL}/contact`,
};

const AdvertsSection = (): React.JSX.Element => {
  const { adsLog, setAdsLog } = useAuthStore();
  const adsLogRef = useRef(adsLog);

  // Keep a stable ref to the latest adsLog without triggering memo recalculations
  useEffect(() => {
    adsLogRef.current = adsLog;
  }, [adsLog]);

  const {
    value: { data: advertsData, isLoading: isAdvertsLoading },
  } = useGetDasboardAdverts();

  const getLeastViewedAdvert = useCallback(() => {
    if (!advertsData || advertsData.length === 0) {
      return defaultAdvert;
    }

    const leastViewedAdvert = advertsData.reduce((minAd, currentAd) => {
      const minViews = adsLogRef.current[minAd?.id] || 0;
      const currentViews = adsLogRef.current[currentAd?.id] || 0;
      return currentViews < minViews ? currentAd : minAd;
    });

    return leastViewedAdvert || defaultAdvert;
  }, [advertsData]);

  const incrementAdvertView = useCallback(
    (advertId: number) => {
      setAdsLog({
        ...adsLogRef.current,
        [advertId]: (adsLogRef.current[advertId] || 0) + 1,
      });
    },
    [setAdsLog],
  );

  const advertToDisplay = useMemo(() => {
    if (isAdvertsLoading) return defaultAdvert;
    return getLeastViewedAdvert();
  }, [isAdvertsLoading, getLeastViewedAdvert]);

  useEffect(() => {
    if (advertToDisplay && advertToDisplay.id !== defaultAdvert.id) {
      incrementAdvertView(advertToDisplay.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advertToDisplay.id]);

  return (
    <View style={styles.imageContainer}>
      {isAdvertsLoading ? (
        <AppSkeletonLoader height="100%" style={styles.image} />
      ) : (
        <TouchableOpacity onPress={() => openURL(advertToDisplay?.adUrlLink)}>
          <AppImage
            style={styles.image}
            resizeMode={advertToDisplay?.imageUrl ? 'cover' : 'contain'}
            source={
              advertToDisplay?.imageUrl
                ? { uri: advertToDisplay?.imageUrl }
                : SampleAdImage
            }
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    aspectRatio: 16 / 9,
    resizeMode: 'contain',
    borderRadius: Size.calcAverage(8),
    overflow: 'hidden',
  },

  imageContainer: {
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(20),
  },
});

export default AdvertsSection;
