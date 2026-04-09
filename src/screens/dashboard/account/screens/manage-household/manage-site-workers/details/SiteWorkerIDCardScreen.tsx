import ViewShot from 'react-native-view-shot';
import { useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';

import queryKeys from '@src/api/constants/queryKeys';
import { getHouseholdSiteworkerIDCard } from '@src/api/household.api';
import AppImage from '@src/components/AppImage';
import AppText from '@src/components/AppText';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useAppStateStore } from '@src/stores/appState.store';
import { handleToastApiError } from '@src/utils/handleErrors';
import Size from '@src/utils/useResponsiveSize';
import SESAWhiteLogo from '@src/assets/images/sesa-white-logo.png';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import AppAvatar from '@src/components/AppAvatar';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';
import appConfig from '@src/utils/appConfig';
import { CustomShareIcon } from '@src/components/icons/custom';
import { appToast } from '@src/utils/appToast';

interface Details {
  title: string;
  value: string;
  width: number;
}

const SiteWorkerIDCardScreen = (): React.JSX.Element => {
  const { selectedSiteWorker } = useAppStateStore();
  const id = selectedSiteWorker?.id;
  const queryClient = useQueryClient();
  const viewShotRef = useRef<ViewShot>(null);
  const queryKey = [
    queryKeys.GET_HOUSEHOLDS,
    'getHouseholdSiteworkerIDCard',
    id,
  ];
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await getHouseholdSiteworkerIDCard(id!);
      if (response.ok) {
        return response?.data?.data;
      } else {
        handleToastApiError(response);
        return null;
      }
    },
    enabled: !!id,
  });

  const details: Details[][] = [
    [
      {
        title: 'Estate:',
        value: data?.estateName || '',
        width: 74,
      },
    ],
    [
      {
        title: 'Work Address:',
        value: data?.workAddress || '',
        width: 80,
      },
    ],
    [
      {
        title: 'Start Date:',
        value: data?.workPeriodStart || '',
        width: 70,
      },
      {
        title: 'End Date:',
        value: data?.workPeriodEnd || '',
        width: 70,
      },
    ],
    [
      {
        title: 'Clock In:',
        value: data?.clockInStart || '',
        width: 70,
      },
      {
        title: 'Clock Out:',
        value: data?.clockInEnd || '',
        width: 70,
      },
    ],
  ];

  const customRefetch = () => queryClient.resetQueries({ queryKey });

  const captureAndShare = async () => {
    try {
      if (viewShotRef?.current && viewShotRef?.current?.capture) {
        const image = await viewShotRef.current.capture();

        if (image) {
          await Share.open({
            url: image,
            message: 'SESA Site Worker ID Card',
          });
        }
      }
    } catch (error) {
      appToast.Warning(`Unable to share ID Card at this time ${error}`);
    }
  };

  return (
    <ScrollView
      refreshControl={
        <AppRefreshControl refreshing={isLoading} onRefresh={customRefetch} />
      }
      contentContainerStyle={{ paddingBottom: Size.calcHeight(20) }}
    >
      <ViewShot ref={viewShotRef}>
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.header}>
              <AppImage
                style={styles.logo}
                resizeMode="contain"
                source={SESAWhiteLogo}
              />
            </View>
            <View style={{ paddingHorizontal: Size.calcWidth(13) }}>
              <View style={styles.imageContainer}>
                <AppAvatar
                  size={Size.calcAverage(60)}
                  isLoading={isLoading}
                  // style={styles.image}
                  imageURL={data?.photo || ''}
                />
              </View>

              <View style={styles.profileRow}>
                <View style={styles.profileContainer}>
                  {isLoading ? (
                    <AppSkeletonLoader width={Size.calcWidth(100)} />
                  ) : (
                    <AppText numberOfLines={1} style={styles.name}>
                      {(data?.firstName || '') + ' ' + (data?.lastName || '')}
                    </AppText>
                  )}
                  <View style={styles.textRow}>
                    <AppText style={styles.text}>Site Worker</AppText>
                    <View style={styles.dot} />
                    {isLoading ? (
                      <AppSkeletonLoader width={Size.calcWidth(50)} />
                    ) : (
                      <AppText style={styles.text}>{data?.code}</AppText>
                    )}
                  </View>
                </View>

                <View style={styles.qrCodeContainer}>
                  {isLoading ? (
                    <AppSkeletonLoader
                      borderRadius={Size.calcAverage(4)}
                      height={Size.calcAverage(50)}
                      width={Size.calcAverage(50)}
                    />
                  ) : (
                    <QRCode
                      size={Size.calcAverage(50)}
                      value={data?.code || '-'}
                    />
                  )}
                </View>
              </View>

              <View style={styles.detailContainer}>
                {details?.map((item, index) => (
                  <View key={index} style={styles.detailRow}>
                    {item?.map((detail, detailIndex) => (
                      <View key={detailIndex} style={styles.detailItem}>
                        <AppText
                          style={[
                            styles.detailTitle,
                            { width: Size.calcWidth(detail?.width) },
                          ]}
                        >
                          {detail?.title}
                        </AppText>
                        {isLoading ? (
                          <View style={{ flex: 1 }}>
                            <AppSkeletonLoader width="70%" />
                          </View>
                        ) : (
                          <AppText style={styles.detailTitle}>
                            {detail?.value}
                          </AppText>
                        )}
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </View>
            <AppText style={styles.footerText}>
              Property of {appConfig.APP_NAME}. If found, return to{' '}
              {data?.estateName}
            </AppText>
          </View>
        </View>
      </ViewShot>

      <TouchableOpacity onPress={captureAndShare} style={styles.footerItem}>
        <CustomShareIcon
          height={Size.calcAverage(16)}
          color={colors.BLACK_100}
          width={Size.calcAverage(16)}
        />
        <AppText style={{ fontFamily: fonts.INTER_500 }}>Share</AppText>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: Size.calcAverage(1),
    borderColor: colors.LIGHT_GRAY_200,
    backgroundColor: colors.WHITE_200,
    borderRadius: Size.calcAverage(4),
    overflow: 'hidden',
  },

  container: {
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(20),
  },

  detailContainer: {
    rowGap: Size.calcHeight(5),
    paddingTop: Size.calcHeight(8),
    paddingBottom: Size.calcHeight(10),
  },

  detailItem: {
    flex: 1,
    borderWidth: Size.calcAverage(1),
    borderColor: colors.LIGHT_GRAY_200,
    borderRadius: Size.calcAverage(4),
    paddingHorizontal: Size.calcWidth(6),
    paddingVertical: Size.calcHeight(7),
    flexDirection: 'row',
  },

  detailRow: {
    flexDirection: 'row',
    columnGap: Size.calcWidth(10),
  },

  detailTitle: {
    fontSize: Size.calcAverage(8),
  },

  dot: {
    width: Size.calcAverage(3),
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: colors.BLACK_100,
  },

  footerItem: {
    marginHorizontal: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: Size.calcWidth(7),
    marginTop: Size.calcHeight(10),
    borderRadius: 100,
    borderWidth: Size.calcAverage(1),
    paddingHorizontal: Size.calcWidth(27),
    paddingVertical: Size.calcHeight(13),
    borderColor: colors.LIGHT_GRAY_300,
    shadowColor: colors.LIGHT_GRAY_300,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },

  footerText: {
    textAlign: 'center',
    paddingHorizontal: Size.calcWidth(14),
    fontSize: Size.calcAverage(8),
    paddingVertical: Size.calcHeight(3),
    backgroundColor: colors.WHITE_300,
    color: colors.GRAY_100,
  },

  header: {
    paddingVertical: Size.calcHeight(0),
    paddingHorizontal: Size.calcWidth(13),
    backgroundColor: colors.BLUE_600,
    alignItems: 'flex-end',
  },

  image: {
    width: Size.calcAverage(55),
    borderRadius: 100,
    aspectRatio: 1,
  },

  imageContainer: {
    padding: Size.calcAverage(1),
    borderRadius: 100,
    marginTop: Size.calcHeight(-34),
    alignSelf: 'flex-start',
    backgroundColor: colors.WHITE_200,
  },

  logo: {
    aspectRatio: 16 / 9,
    height: Size.calcHeight(45),
  },

  name: {
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(12),
  },

  profileContainer: {
    flexShrink: 1,
    rowGap: Size.calcHeight(2),
  },

  profileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: Size.calcAverage(4),
    marginTop: Size.calcHeight(-20),
  },

  text: {
    color: colors.BLUE_200,
    fontSize: Size.calcAverage(10),
    fontFamily: fonts.INTER_500,
  },

  textRow: {
    alignItems: 'center',
    gap: Size.calcAverage(10),
    flexDirection: 'row',
  },

  qrCodeContainer: {
    padding: Size.calcAverage(4),
    borderRadius: Size.calcAverage(4),
    backgroundColor: colors.WHITE_300,
  },
});

export default SiteWorkerIDCardScreen;
