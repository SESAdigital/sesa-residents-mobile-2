import { ScrollView, StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import queryKeys from '@src/api/constants/queryKeys';
import { getHouseholdSiteworkerIDCard } from '@src/api/household.api';
import AppImage from '@src/components/AppImage';
import AppText from '@src/components/AppText';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useAppStateStore } from '@src/stores/appState.store';
import { handleToastApiError } from '@src/utils/handleErrors';
import Size from '@src/utils/useResponsiveSize';
import { useQuery } from '@tanstack/react-query';

interface Details {
  title: string;
  value: string;
  width: number;
}

const SiteWorkerIDCardScreen = (): React.JSX.Element => {
  const { selectedSiteWorker } = useAppStateStore();
  const id = selectedSiteWorker?.id;

  const { data } = useQuery({
    queryKey: [queryKeys.GET_HOUSEHOLDS, 'getHouseholdSiteworkerIDCard', id],
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

  return (
    <ScrollView
      // refreshControl={}
      contentContainerStyle={styles.container}
    >
      <View style={styles.card}>
        <View style={styles.header}>
          <AppText style={{ marginLeft: 'auto', fontSize: 16, color: 'white' }}>
            SESA
          </AppText>
        </View>
        <View style={{ paddingHorizontal: Size.calcWidth(13) }}>
          <View style={styles.imageContainer}>
            <AppImage
              style={styles.image}
              source={{ uri: data?.photo || '' }}
            />
          </View>

          <View style={styles.profileRow}>
            <View style={{ flexShrink: 1 }}>
              <AppText numberOfLines={1} style={styles.name}>
                {data?.firstName + ' ' + data?.lastName}
              </AppText>
              <View style={styles.textRow}>
                <AppText style={styles.text}>Site Worker</AppText>
                <View style={styles.dot} />
                <AppText style={styles.text}>{data?.code}</AppText>
              </View>
            </View>

            <View style={styles.qrCodeContainer}>
              <QRCode size={Size.calcAverage(50)} value={'hello world'} />
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
                    <AppText style={styles.detailTitle}>
                      {detail?.value}
                    </AppText>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      </View>
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

  header: {
    paddingVertical: Size.calcHeight(14),
    paddingHorizontal: Size.calcWidth(13),
    backgroundColor: colors.BLUE_600,
  },

  image: {
    width: Size.calcAverage(55),
    borderRadius: 100,
    aspectRatio: 1,
  },

  imageContainer: {
    padding: Size.calcAverage(4),
    borderRadius: 100,
    marginTop: Size.calcHeight(-38),
    alignSelf: 'flex-start',
    backgroundColor: colors.WHITE_200,
  },

  name: {
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(12),
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
