import { ScrollView, StyleSheet, View } from 'react-native';

import AppImage from '@src/components/AppImage';
import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppDetailCard, {
  AppDetailCardDetailItem,
} from '@src/components/common/AppDetailCard';
import SubmitButton from '@src/components/forms/SubmitButton';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { AppScreenProps, useAppNavigator } from '@src/navigation/AppNavigator';
import Size from '@src/utils/useResponsiveSize';

export interface AddHouseholdStaffSuccessScreenProps {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  propertyUnitName: string;
  address: string;
  photo: string;
}

type Props = AppScreenProps<'ADD_HOUSEHOLD_STAFF_SUCCESS_SCREEN'>;

const AddHouseholdStaffSuccessScreen = (props: Props): React.JSX.Element => {
  const value = props?.route?.params || {};
  const navigation = useAppNavigator();

  const detailList: AppDetailCardDetailItem = [
    [
      {
        title: 'DEPENDENT OCCUPANT NAME',
        value: `${value?.firstName?.trim()} ${value?.lastName?.trim()}`,
      },
    ],
    [
      {
        title: 'EMAIL ADDRESS',
        value: value?.emailAddress?.toLowerCase()?.trim(),
      },
    ],
    [
      {
        title: 'PHONE NUMBER',
        value: value?.phoneNumber?.trim(),
      },
    ],
    [
      {
        title: 'ADDED TO',
        value: value?.propertyUnitName || '',
      },
    ],
    [
      {
        title: 'PROPERTY ADDRESS',
        value: value?.address || '',
      },
    ],
  ];

  return (
    <AppScreen showDownInset>
      <ScrollView contentContainerStyle={styles.container}>
        <AppImage style={styles.image} source={{ uri: value.photo }} />

        <AppText style={styles.headerTitle}>Sent for approval</AppText>
        <AppText style={styles.headerSubtitle}>
          Upon approval, this occupant will be added to a household and to your
          property.
        </AppText>

        <AppDetailCard detailList={detailList} />
      </ScrollView>

      <View style={styles.footer}>
        <SubmitButton
          title="Add another household staff"
          onPress={() => navigation.goBack()}
        />
        <SubmitButton
          variant="SECONDARY"
          title="Finish and go back"
          onPress={() => navigation.pop(2)}
        />
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Size.calcWidth(21),
    paddingBottom: Size.calcHeight(35),
    paddingTop: Size.calcHeight(57),
  },

  footer: {
    paddingTop: Size.calcHeight(16),
    paddingBottom: Size.calcHeight(16 * 3),
    borderTopColor: colors.WHITE_300,
    borderTopWidth: Size.calcAverage(1),
    rowGap: Size.calcHeight(20),
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

export default AddHouseholdStaffSuccessScreen;
