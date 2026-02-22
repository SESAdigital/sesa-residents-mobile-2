import { useRef } from 'react';
import { useRoute } from '@react-navigation/native';
import ViewShot from 'react-native-view-shot';
import { ScrollView, StyleSheet, View, StatusBar } from 'react-native';
import Share from 'react-native-share';

import SuccessCheckIconImage from '@src/assets/images/icons/success-check-icon.png';
import AppImage from '@src/components/AppImage';
import AppText from '@src/components/AppText';
import colors from '@src/configs/colors';
import {
  TransactionSuccessScreenProps,
  useAppNavigator,
} from '@src/navigation/AppNavigator';
import { SelectInputData } from '@src/types';
import Size from '@src/utils/useResponsiveSize';
import fonts from '@src/configs/fonts';
import SubmitButton from '@src/components/forms/SubmitButton';
import { appToast } from '@src/utils/appToast';
import routes from '@src/navigation/routes';
import useBackHandler from '@src/hooks/useBackHandler';
import ShareIconButtonComponent from '@src/components/common/ShareIconButtonComponent';

export interface TransactionSuccessScreenData {
  title: string;
  subTite?: string;
  details: SelectInputData[];
}

const TransactionSuccessScreen = (): React.JSX.Element => {
  const param = useRoute<TransactionSuccessScreenProps>()?.params;
  const navigation = useAppNavigator();

  const handleClose = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: routes.HOME_BOTTOM_TABS_NAVIGATOR }],
    });
  };

  useBackHandler(handleClose, 1);

  const viewShotRef = useRef<ViewShot>(null);
  const captureReceipt = async () => {
    try {
      if (viewShotRef?.current && viewShotRef?.current?.capture) {
        const image = await viewShotRef.current.capture();

        if (image) {
          await Share.open({
            url: image,
            message: 'SESA Transaction Receipt',
          });
        }
      }
    } catch (error) {
      appToast.Warning(`Unable to share receipt at this time ${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <ViewShot ref={viewShotRef}>
        <View style={styles.viewShotContainer}>
          <AppImage
            source={SuccessCheckIconImage}
            style={styles.successIcon}
            resizeMode="contain"
          />
          <AppText style={styles.title}>{param?.title}</AppText>
          <AppText style={styles.description}>
            {param?.subTite ||
              'View your transaction receipt below. A copy of your receipt has been sent to your email.'}
          </AppText>

          <ScrollView style={styles.itemContainer} showsVerticalScrollIndicator>
            {param?.details?.map((item, index) => (
              <View style={styles.item} key={index}>
                <AppText style={styles.itemTitle}>{item?.title}</AppText>
                <AppText style={styles.itemValue}>{item?.value}</AppText>
              </View>
            ))}
          </ScrollView>
        </View>
      </ViewShot>
      <View style={styles.footer}>
        <SubmitButton
          title="Finish & Close"
          onPress={handleClose}
          style={{ backgroundColor: colors.WHITE_200 }}
          variant="SECONDARY"
        />
        <SubmitButton
          title={<ShareIconButtonComponent title="Share Receipt" />}
          onPress={captureReceipt}
          style={{ backgroundColor: colors.BLUE_300 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.BLUE_300,
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },

  description: {
    paddingBottom: Size.calcHeight(24),
    textAlign: 'center',
    color: colors.WHITE_200,
    fontSize: Size.calcAverage(12),
    maxWidth: Size.calcWidth(320),
    marginHorizontal: 'auto',
  },

  footer: {
    paddingHorizontal: Size.calcWidth(21),
    marginTop: 'auto',
    rowGap: Size.calcHeight(16),
    paddingBottom: Size.calcHeight(80),
    paddingTop: Size.calcHeight(5),
  },

  itemContainer: {
    backgroundColor: colors.WHITE_100,
    marginHorizontal: Size.calcWidth(21),
    maxHeight: Size.getHeight() / 2.4,
    borderRadius: Size.calcWidth(12),
    overflow: 'hidden',
    shadowColor: colors.GRAY_600,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },

  item: {
    paddingHorizontal: Size.calcWidth(20),
    paddingVertical: Size.calcHeight(16),
    borderBottomWidth: Size.calcHeight(1),
    borderBottomColor: colors.WHITE_300,
  },

  itemTitle: {
    color: colors.GRAY_300,
    fontSize: Size.calcAverage(12),
  },

  itemValue: {
    fontFamily: fonts.INTER_500,
  },

  successIcon: {
    marginTop: Size.calcHeight(60),
    height: Size.calcAverage(80),
    width: Size.calcAverage(80),
    marginHorizontal: 'auto',
  },

  title: {
    paddingBottom: Size.calcHeight(4),
    paddingTop: Size.calcHeight(16),
    textAlign: 'center',
    fontFamily: fonts.INTER_600,
    color: colors.WHITE_200,
    fontSize: Size.calcAverage(16),
  },

  viewShotContainer: {
    backgroundColor: colors.BLUE_300,
    paddingBottom: Size.calcHeight(35),
  },
});

export default TransactionSuccessScreen;
