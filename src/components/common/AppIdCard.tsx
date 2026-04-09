import { StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import appConfig from '@src/utils/appConfig';
import Size from '@src/utils/useResponsiveSize';
import AppAvatar from '../AppAvatar';
import AppImage from '../AppImage';
import AppSkeletonLoader from '../AppSkeletonLoader';
import AppText from '../AppText';
import SESAWhiteLogo from '@src/assets/images/sesa-white-logo.png';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';

export interface AppIdCardData {
  title: string;
  value: string;
  width: number;
}

interface Props {
  isLoading: boolean;
  details: AppIdCardData[][];
  photo: string;
  code: string;
  firstName: string;
  lastName: string;
  designation: 'Household staff' | 'Site worker';
  estateName: string;
}

const AppIdCard = (props: Props): React.JSX.Element => {
  const {
    isLoading,
    details,
    firstName,
    lastName,
    designation,
    code,
    photo,
    estateName,
  } = props;
  return (
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
              imageURL={photo || ''}
            />
          </View>

          <View style={styles.profileRow}>
            <View style={styles.profileContainer}>
              {isLoading ? (
                <AppSkeletonLoader width={Size.calcWidth(100)} />
              ) : (
                <AppText numberOfLines={1} style={styles.name}>
                  {firstName + ' ' + lastName}
                </AppText>
              )}
              <View style={styles.textRow}>
                <AppText style={styles.text}>{designation}</AppText>
                <View style={styles.dot} />
                {isLoading ? (
                  <AppSkeletonLoader width={Size.calcWidth(50)} />
                ) : (
                  <AppText style={styles.text}>{code}</AppText>
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
                <QRCode size={Size.calcAverage(50)} value={code || '-'} />
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
          Property of {appConfig.APP_NAME}. If found, return to {estateName}
        </AppText>
      </View>
    </View>
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

export default AppIdCard;
