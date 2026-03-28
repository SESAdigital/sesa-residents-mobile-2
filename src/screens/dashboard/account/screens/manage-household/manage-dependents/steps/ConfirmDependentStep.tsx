import { UseFormGetValues } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';

import { PostHouseholdCreateOccupantReq } from '@src/api/household.api';
import AppImage from '@src/components/AppImage';
import AppText from '@src/components/AppText';
import AppDetailCard, {
  AppDetailCardDetailItem,
} from '@src/components/common/AppDetailCard';
import SubmitButton from '@src/components/forms/SubmitButton';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useAuthStore } from '@src/stores/auth.store';
import { mapGenderTitle } from '@src/utils';
import { dayJSFormatter } from '@src/utils/time';
import Size from '@src/utils/useResponsiveSize';

interface Props {
  onDone: () => void;
  getValues: UseFormGetValues<PostHouseholdCreateOccupantReq>;
  onBackClick: () => void;
}

const ConfirmDependentStep = (props: Props): React.JSX.Element => {
  const { getValues, onDone, onBackClick } = props;
  const { selectedProperty } = useAuthStore();
  const {
    Photo,
    FirstName,
    LastName,
    Email,
    PhoneNumber,
    DateOfBirth,
    Gender,
  } = getValues();

  const detailList: AppDetailCardDetailItem = [
    [
      {
        title: 'FULL NAME',
        value: `${FirstName?.trim()} ${LastName?.trim()}`,
      },
    ],
    [
      {
        title: 'EMAIL ADDRESS',
        value: Email?.toLowerCase()?.trim(),
      },
    ],
    [
      {
        title: 'PHONE NUMBER',
        value: PhoneNumber?.trim(),
      },
    ],
    [
      {
        title: 'GENDER',
        value: mapGenderTitle(Gender),
      },
      {
        title: 'DATE OF BIRTH',
        value: dayJSFormatter({
          format: 'MMM D, YYYY',
          value: DateOfBirth || '',
          shouldNotLocalize: true,
        }),
      },
    ],
    [
      {
        title: 'HOME ADDRESS',
        value: selectedProperty?.propertyAddress || '',
      },
    ],
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <AppImage style={styles.image} source={{ uri: Photo?.uri }} />

        <AppText style={styles.headerTitle}>Confirm dependent occupant</AppText>
        <AppText style={styles.headerSubtitle}>
          View the details of the occupant below and tap “Confirm” to confirm
          and add.
        </AppText>

        <AppDetailCard detailList={detailList} />
      </ScrollView>

      <View style={styles.footer}>
        <SubmitButton
          variant="SECONDARY"
          style={{ width: '47%' }}
          title="Go Back"
          onPress={onBackClick}
        />
        <SubmitButton
          title="Confirm"
          style={{ width: '47%' }}
          onPress={onDone}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(35),
  },

  footer: {
    paddingTop: Size.calcHeight(16),
    paddingBottom: Size.calcHeight(16 * 3),
    borderTopColor: colors.WHITE_300,
    borderTopWidth: Size.calcAverage(1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Size.calcWidth(21),
  },

  headerTitle: {
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(16),
    textAlign: 'center',
    paddingTop: Size.calcHeight(16),
  },

  headerSubtitle: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
    textAlign: 'center',
    maxWidth: Size.calcWidth(310),
    marginHorizontal: 'auto',
    paddingBottom: Size.calcHeight(24),
  },

  image: {
    width: Size.calcWidth(80),
    height: Size.calcHeight(80),
    borderRadius: Size.calcAverage(80),
    marginHorizontal: 'auto',
  },
});

export default ConfirmDependentStep;
