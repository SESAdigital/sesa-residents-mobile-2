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
} from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { AppScreenProps, useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import AddMoneyHelpModal from '@src/screens/dashboard/add-money/modals/AddMoneyHelpModal';
import { useAppStateStore } from '@src/stores/appState.store';
import Size from '@src/utils/useResponsiveSize';

const data = [
  {
    Icon: MaterialSymbolsLocationAwayRounded,
    title: 'To do this, you must be an Alpha occupant.',
  },
  {
    Icon: MaterialSymbolsPersonAdd,
    title:
      'The maximum number of dependents you can add depends on the total number of occupants allowed per household by your estate.',
  },
  {
    Icon: MaterialSymbolsCheckCircleRounded,
    title:
      'Dependents will become active when they get approved by your estate manager.',
  },
];

type Props = AppScreenProps<'ADD_DEPENDENT_SCREEN'>;

const AddDependentScreen = ({ route }: Props): React.JSX.Element => {
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
        <AppText style={styles.title}>Add dependent</AppText>
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
            navigation.navigate(routes.ADD_DEPENDENT_FORM_SCREEN, {
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

export default AddDependentScreen;
