import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import SuccessCheckIconImage from '@src/assets/images/icons/success-check-icon.png';
import AppImage from '@src/components/AppImage';
import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import SubmitButton from '@src/components/forms/SubmitButton';
import { MaterialSymbolsContentCopyOutline } from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { AppScreenProps, useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import { copyTextToClipboard } from '@src/utils';
import { dayJSFormatter } from '@src/utils/time';
import Size from '@src/utils/useResponsiveSize';

interface DetailItem {
  title: string;
  value: string;
  isCopy?: boolean;
}

type Props = AppScreenProps<'CREATE_EVENT_SUCCESS_SCREEN'>;

const CreateEventSuccessScreen = ({ route }: Props): React.JSX.Element => {
  const param = route?.params;
  const navigation = useAppNavigator();

  const detailList: DetailItem[][] = [
    [
      {
        title: 'EVENT NAME',
        value: param?.name,
        // isCopy: true,
      },
    ],
    [
      {
        title: 'EVENT LOCATION',
        value: param?.address,
        // isCopy: true,
      },
    ],
    [
      {
        title: 'EVENT TYPE',
        value: param?.eventTypeText,
      },
      {
        title: 'EVENT STATUS',
        value: param?.statusText,
      },
    ],
    [
      {
        title: 'EVENT STARTS',
        value: dayJSFormatter(param?.startDate, 'MMMM D, YYYY h:mm A'),
      },
      {
        title: 'EVENT ENDS',
        value: dayJSFormatter(param?.endDate, 'MMMM D, YYYY h:mm A'),
      },
    ],

    [
      {
        title: 'EXPECTED GUESTS',
        value: `${
          param?.guestLimit
            ? `${param?.guestLimit} ${
                param?.isDailyLimit ? `(Daily Limit)` : ''
              }`
            : ''
        }`,
      },
      {
        title: 'EVENT CODE',
        value: param?.code,
        isCopy: !!param?.code,
      },
    ],
  ];

  const image = param?.image?.[0];

  return (
    <AppScreen showDownInset>
      <ScrollView
        showsVerticalScrollIndicator
        contentContainerStyle={{ minHeight: '85%' }}
      >
        <View
          style={[
            styles.viewShotContainer,
            !!image && { paddingTop: Size.calcHeight(70 / 2) },
          ]}
        >
          <View style={styles.imageContainer}>
            {!!image ? (
              <AppImage isView source={{ uri: image }} style={styles.image2} />
            ) : (
              <AppImage style={styles.image} source={SuccessCheckIconImage} />
            )}
          </View>
          <AppText style={styles.title}>Event Created</AppText>
          <AppText style={styles.description}>
            Your event details have been sent for approval. You will be notified
            when a decision is made.
          </AppText>

          <View style={styles.detailContainer}>
            {detailList.map((item, firstIndex) => (
              <View style={styles.detailItemRow} key={firstIndex}>
                {item?.map((value, secondIndex) => (
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
                ))}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <SubmitButton
          title="Finish and close"
          onPress={() => navigation.goBack()}
        />
        <SubmitButton
          variant="SECONDARY"
          title="Create another event"
          onPress={() => navigation.replace(routes.CREATE_EVENTS_SCREEN)}
        />
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  description: {
    maxWidth: Size.calcWidth(310),
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
    marginTop: 'auto',
    borderTopColor: colors.LIGHT_GRAY_200,
    borderTopWidth: Size.calcHeight(1),
    rowGap: Size.calcHeight(16),
    paddingVertical: Size.calcHeight(20),
    paddingHorizontal: Size.calcWidth(21),
  },

  image: {
    height: Size.calcAverage(80),
    aspectRatio: 1,
  },

  image2: {
    height: Size.calcAverage(190),
    aspectRatio: 1,
    borderRadius: Size.calcAverage(8),
    backgroundColor: colors.WHITE_100,
    shadowColor: colors.LIGHT_GRAY_600,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  imageContainer: {
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
    paddingBottom: Size.calcHeight(20),
    paddingTop: Size.calcHeight(70),
    paddingHorizontal: Size.calcWidth(21),
    backgroundColor: colors.WHITE_200,
  },
});

export default CreateEventSuccessScreen;
