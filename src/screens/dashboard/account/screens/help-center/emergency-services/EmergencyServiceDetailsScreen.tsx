import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import SubmitButton from '@src/components/forms/SubmitButton';
import { MaterialSymbolsContentCopyOutline } from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { AppScreenProps } from '@src/navigation/AppNavigator';
import { copyTextToClipboard, openURL } from '@src/utils';
import Size from '@src/utils/useResponsiveSize';

type Props = AppScreenProps<'EMERGENCY_SERVICE_DETAILS_SCREEN'>;

const EmergencyServiceDetailsScreen = (props: Props): React.JSX.Element => {
  const { route } = props;
  const data = route?.params;

  const details = [
    {
      title: 'Phone Number 1',
      value: data?.phoneNumbers?.[0],
      isCopy: true,
    },
    {
      title: 'Phone Number 2',
      value: data?.phoneNumbers?.[1],
      isCopy: true,
    },
    {
      title: 'Email Address',
      value: data?.email,
      isCopy: true,
    },
    {
      title: 'Address',
      value: data?.contactAddress,
    },
    {
      title: 'State',
      value: data?.stateName,
    },
  ];

  return (
    <AppScreen showDownInset>
      <AppScreenHeader
        containerStyle={{ paddingVertical: Size.calcHeight(25) }}
      />
      <ScrollView style={{ paddingHorizontal: Size.calcWidth(21) }}>
        <AppText style={styles.name}>{data?.name}</AppText>
        <AppText style={styles.date}>
          Added {data?.timeCreatedFormatted}
        </AppText>

        <View style={styles.itemContainer}>
          {details?.map(item =>
            item?.value ? (
              <View style={styles.item} key={item?.title}>
                <View>
                  <AppText style={styles.itemTitle}>{item?.title}</AppText>
                  <AppText style={{ fontFamily: fonts.INTER_500 }}>
                    {item?.value}
                  </AppText>
                </View>

                {!!item?.isCopy && (
                  <TouchableOpacity
                    style={styles.row}
                    onPress={() =>
                      copyTextToClipboard({
                        text: item?.value,
                        successText: `${item?.title} Copied Successfully`,
                        errorText: 'Failed to copy to clipboard',
                      })
                    }
                  >
                    <MaterialSymbolsContentCopyOutline
                      height={Size.calcAverage(18)}
                      width={Size.calcAverage(18)}
                      color={colors.BLUE_200}
                    />
                    <AppText style={styles.copyText}>Copy</AppText>
                  </TouchableOpacity>
                )}
              </View>
            ) : null,
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <SubmitButton
          style={{ width: '47%' }}
          onPress={() => openURL(`tel:${data?.phoneNumbers?.[0]}`)}
          title="Call Phone"
        />
        <SubmitButton
          style={{ width: '47%' }}
          onPress={() => openURL(`mailto:${data?.email}`)}
          variant="SECONDARY"
          title="Send Email"
        />
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  copyText: {
    fontSize: Size.calcAverage(12),
    color: colors.BLUE_200,
    fontFamily: fonts.INTER_500,
  },

  date: {
    textAlign: 'center',
    fontSize: Size.calcAverage(12),
    paddingBottom: Size.calcHeight(20),
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(32),
    borderTopWidth: Size.calcHeight(1),
    borderColor: colors.WHITE_300,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Size.calcWidth(20),
    paddingVertical: Size.calcHeight(12),
    columnGap: Size.calcWidth(12),
    borderBottomWidth: Size.calcHeight(1),
    borderBottomColor: colors.WHITE_300,
  },

  itemTitle: {
    color: colors.GRAY_300,
    fontSize: Size.calcAverage(12),
  },

  itemContainer: {
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

  name: {
    textAlign: 'center',
    paddingTop: Size.calcHeight(20),
    paddingBottom: Size.calcHeight(8),
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(20),
  },

  row: {
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: Size.calcWidth(4),
  },
});

export default EmergencyServiceDetailsScreen;
