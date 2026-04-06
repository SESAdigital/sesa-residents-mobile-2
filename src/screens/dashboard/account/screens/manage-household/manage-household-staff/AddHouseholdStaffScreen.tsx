import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import KYCDetailsToggle from '@src/components/custom/KYCDetailsToggle';
import SubmitButton from '@src/components/forms/SubmitButton';
import {
  MaterialSymbolsCheckCircleRounded,
  MaterialSymbolsLocationAwayRounded,
  MaterialSymbolsPersonAdd,
  MaterialSymbolsViewCarouselRounded,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { AppScreenProps, useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import Size from '@src/utils/useResponsiveSize';
import AddMoneyHelpModal from '@src/screens/dashboard/add-money/modals/AddMoneyHelpModal';
import { useAppStateStore } from '@src/stores/appState.store';

const data = [
  {
    Icon: MaterialSymbolsLocationAwayRounded,
    title: 'To add a household staff, you must be an Alpha occupant.',
  },
  {
    Icon: MaterialSymbolsPersonAdd,
    title: `Household staff are members of your household or employees (e.g., driver, house help, office staff, etc.).\n\nThey won't have access to the SESA Resident app but will get a digital ID card to enter or exit the estate.`,
  },
  {
    Icon: MaterialSymbolsCheckCircleRounded,
    title:
      'The household staff will become active once they get approved by your estate manager.',
  },
  {
    Icon: MaterialSymbolsViewCarouselRounded,
    title:
      'As the alpha occupant, you can manage your household staff - view access activitiese',
  },
];

type Props = AppScreenProps<'ADD_HOUSEHOLD_STAFF_SCREEN'>;

const AddHouseholdStaffScreen = ({ route }: Props): React.JSX.Element => {
  const [isKYC, setIsKYC] = useState(false);
  const navigation = useAppNavigator();
  const { setActiveModal } = useAppStateStore();

  const handleHelp = () => {
    setActiveModal({
      modalType: 'EMPTY_MODAL',
      shouldBackgroundClose: true,
      emptyModalComponent: <AddMoneyHelpModal />,
    });
  };

  return (
    <AppScreen showDownInset>
      <AppScreenHeader containerStyle={styles.header} icon="close" />
      <ScrollView style={{ paddingHorizontal: Size.calcWidth(21) }}>
        <AppText style={styles.title}>Add household staff</AppText>
        <AppText style={styles.subTitle}>Here’s what you should know</AppText>

        <View style={styles.contentWrapper}>
          {data.map(({ Icon, title }, index) => (
            <View style={styles.contentContainer} key={index}>
              <Icon
                color={colors.BLACK_100}
                height={Size.calcAverage(23)}
                width={Size.calcAverage(23)}
              />
              <AppText style={styles.contentTitle}>{title}</AppText>
            </View>
          ))}
        </View>
        <AppText onPress={handleHelp} style={styles.learnMore}>
          Learn More
        </AppText>
      </ScrollView>
      <View style={styles.buttonWrapper}>
        <KYCDetailsToggle isKYC={isKYC} setIsKYC={setIsKYC} />
        <SubmitButton
          title={`Add ${isKYC ? 'with' : 'without'} KYC verification`}
          isLoading={false}
          onPress={() =>
            navigation.navigate(routes.ADD_HOUSEHOLD_STAFF_FORM_SCREEN, {
              ...route?.params,
              isKYC,
            })
          }
        />
      </View>
    </AppScreen>
  );
};
const styles = StyleSheet.create({
  buttonWrapper: {
    paddingBottom: Size.calcHeight(52),
    rowGap: Size.calcHeight(24),
    paddingHorizontal: Size.calcWidth(21),
  },

  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  contentTitle: {
    paddingLeft: Size.calcWidth(16),
    flexShrink: 1,
  },

  contentWrapper: {
    backgroundColor: colors.WHITE_300,
    borderRadius: Size.calcAverage(8),
    paddingVertical: Size.calcHeight(24),
    paddingHorizontal: Size.calcWidth(18),
    rowGap: Size.calcHeight(18),
  },

  header: {
    paddingTop: Size.calcHeight(32),
    paddingBottom: Size.calcHeight(40),
    borderBottomWidth: 0,
  },

  learnMore: {
    padding: Size.calcAverage(16),
    marginHorizontal: 'auto',
    fontFamily: fonts.INTER_500,
    color: colors.BLUE_200,
  },

  subTitle: {
    fontFamily: fonts.INTER_600,
    paddingBottom: Size.calcHeight(40),
  },

  title: {
    fontSize: Size.calcAverage(24),
    fontFamily: fonts.INTER_600,
    paddingBottom: Size.calcHeight(12),
  },
});

export default AddHouseholdStaffScreen;
