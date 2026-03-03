import { useRef } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';
import ViewShot from 'react-native-view-shot';

import AppLogoIcon from '@src/assets/logo/logo-icon.png';
import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import ShareIconButtonComponent from '@src/components/common/ShareIconButtonComponent';
import SubmitButton from '@src/components/forms/SubmitButton';
import { MaterialSymbolsContentCopyOutline } from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { AppScreenProps, useAppNavigator } from '@src/navigation/AppNavigator';
import { copyTextToClipboard } from '@src/utils';
import appConfig from '@src/utils/appConfig';
import Size from '@src/utils/useResponsiveSize';

interface DetailItem {
  title: string;
  value: string;
  isCopy?: boolean;
}

type Props = AppScreenProps<'CREATE_GROUP_ACCESS_SUCCESS_SCREEN'>;

const CreateGroupAccessSuccessScreen = ({
  route,
}: Props): React.JSX.Element => {
  const param = route?.params;
  const navigation = useAppNavigator();
  const viewShotRef = useRef<ViewShot>(null);

  const detailList: DetailItem[][] = [
    [
      {
        title: 'ACCESS CODE',
        value: param?.code,
        isCopy: true,
      },
    ],
    [
      {
        title: 'ACCESS DATE',
        value: param?.accessDate,
      },
    ],
    [
      {
        title: 'PROPERTY ADDRESS',
        value: param?.propertyAddress,
      },
    ],
    [
      {
        title: 'PROPERTY NAME',
        value: param?.propertyName,
      },
    ],
    [
      {
        title: 'CHECK-IN PERIOD',
        value: param?.isAllDay ? 'All Day' : '',
      },
    ],
    [
      {
        title: 'Start Time',
        value: param?.startTime,
      },
      {
        title: 'End Time',
        value: param?.endTime,
      },
    ],
    [
      {
        title: 'Repeat Every',
        value: param?.repeatDays,
      },
    ],
  ];

  const captureReceipt = async () => {
    let image = '';
    try {
      if (viewShotRef?.current && viewShotRef?.current?.capture) {
        image = await viewShotRef.current.capture();
      }
    } catch (err) {
      console.error(err);
    }
    return image;
  };

  const shareCode = async () => {
    const message = `
Group Access code for ${param?.propertyAddress}.

Access date: ${param?.accessDate}

Access Code: ${param?.code}
(to be presented at check-out)

QR code: ${appConfig.APP_WEBSITE_URL}/access/${param?.code}
`;

    const image = await captureReceipt();
    await Share.open({
      ...(image ? { url: image } : {}),
      message,
    });
  };

  return (
    <AppScreen showDownInset>
      <ScrollView
        showsVerticalScrollIndicator
        contentContainerStyle={{ minHeight: '85%' }}
      >
        <ViewShot ref={viewShotRef}>
          <View style={styles.viewShotContainer}>
            <View style={styles.qrCodeContainer}>
              <QRCode size={150} logo={AppLogoIcon} value={param?.code ?? ''} />
            </View>
            <AppText style={styles.title}> Access code generated</AppText>
            <AppText style={styles.description}>
              Share this access code with walk-in visitors ONLY after they
              arrive at your property. They will be allowed to check in without
              an access code but will be required to present this code
              (GA-xxxxx) at check-out.
            </AppText>

            <View style={styles.detailContainer}>
              {detailList.map((item, firstIndex) => (
                <View style={styles.detailItemRow} key={firstIndex}>
                  {item?.map((value, secondIndex) =>
                    !value?.value ? null : (
                      <View style={styles.detailItem} key={secondIndex}>
                        <View>
                          <AppText style={styles.detailItemTitle}>
                            {value?.title}
                          </AppText>
                          <AppText style={styles.detailItemValue}>
                            {value?.value || '--'}
                          </AppText>
                        </View>
                        {!!value?.isCopy && (
                          <TouchableOpacity
                            onPress={() =>
                              copyTextToClipboard({
                                text: value?.value,
                                successText: `${value?.title} Copied Successfully`,
                                errorText: 'Failed to copy to clipboard',
                              })
                            }
                          >
                            <MaterialSymbolsContentCopyOutline
                              height={Size.calcAverage(18)}
                              width={Size.calcAverage(18)}
                              color={colors.GRAY_100}
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                    ),
                  )}
                </View>
              ))}
            </View>
          </View>
        </ViewShot>
      </ScrollView>
      <View style={styles.footer}>
        <SubmitButton
          variant="SECONDARY"
          style={{ width: '47%' }}
          title="Finish and close"
          onPress={() => navigation.goBack()}
        />
        <SubmitButton
          title={<ShareIconButtonComponent />}
          style={{ width: '47%' }}
          onPress={shareCode}
        />
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  description: {
    marginHorizontal: 'auto',
    textAlign: 'center',
    color: colors.GRAY_100,
    fontSize: Size.calcAverage(12),
    paddingBottom: Size.calcHeight(20),
  },

  detailContainer: {
    borderWidth: Size.calcAverage(1),
    borderColor: colors.WHITE_300,
    shadowColor: colors.GRAY_600,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    backgroundColor: colors.WHITE_200,
    borderRadius: Size.calcAverage(12),
  },

  detailItem: {
    paddingHorizontal: Size.calcWidth(20),
    paddingVertical: Size.calcHeight(15),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRightWidth: Size.calcWidth(1),
    borderColor: colors.WHITE_300,
  },

  detailItemRow: {
    borderBottomWidth: Size.calcHeight(1),
    borderColor: colors.WHITE_300,
    flexDirection: 'row',
  },

  detailItemTitle: {
    color: colors.GRAY_300,
    fontSize: Size.calcAverage(12),
  },

  detailItemValue: {
    fontFamily: fonts.INTER_500,
  },

  footer: {
    paddingVertical: Size.calcHeight(20),
    borderTopColor: colors.LIGHT_GRAY_100,
    borderTopWidth: Size.calcAverage(1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Size.calcWidth(21),
  },

  qrCodeContainer: {
    alignItems: 'center',
    paddingBottom: Size.calcHeight(16),
  },

  title: {
    textAlign: 'center',
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(16),
    paddingBottom: Size.calcHeight(4),
  },

  viewShotContainer: {
    paddingBottom: Size.calcHeight(30),
    paddingTop: Size.calcHeight(30),
    paddingHorizontal: Size.calcWidth(21),
    backgroundColor: colors.WHITE_200,
  },
});

export default CreateGroupAccessSuccessScreen;
