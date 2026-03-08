import { ScrollView, StyleSheet, View } from 'react-native';

import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import SubmitButton from '@src/components/forms/SubmitButton';
import {
  MaterialSymbolsDomainAdd,
  MaterialSymbolsNoAccounts,
  MaterialSymbolsPersonCheck,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useCheckIsGroupAccessEnabled } from '@src/hooks';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import Size from '@src/utils/useResponsiveSize';

const data = [
  {
    title: 'You have a business or commercial property',
    Icon: MaterialSymbolsDomainAdd,
  },
  {
    title:
      'You want to securely give visitors access out of your commercial property',
    Icon: MaterialSymbolsPersonCheck,
  },
  {
    title:
      'You are unable to pre-register your visitors because you do not know them.',
    Icon: MaterialSymbolsNoAccounts,
  },
];

const GroupAccessScreen = (): React.JSX.Element => {
  const navigation = useAppNavigator();
  const { handleGroupAccessClick } = useCheckIsGroupAccessEnabled();

  return (
    <AppScreen showDownInset>
      <AppScreenHeader icon="close" containerStyle={styles.header} />

      <ScrollView style={{ paddingHorizontal: Size.calcWidth(21) }}>
        <AppText style={styles.title}>Need a group access code?</AppText>
        <AppText style={{ fontFamily: fonts.INTER_600 }}>
          You need this access code when:
        </AppText>

        <View style={styles.contentContainer}>
          {data.map(({ Icon, title }, index) => (
            <View key={index} style={styles.contentItem}>
              <Icon
                height={Size.calcAverage(21)}
                width={Size.calcAverage(21)}
                color={colors.BLACK_200}
              />
              <AppText>{title}</AppText>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <SubmitButton
          variant="SECONDARY"
          style={{ width: '47%' }}
          title="Cancel"
          onPress={() => navigation.goBack()}
        />
        <SubmitButton
          title="Okay, Got it"
          style={{ width: '47%' }}
          onPress={handleGroupAccessClick}
        />
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: Size.calcHeight(24),
    paddingHorizontal: Size.calcWidth(18),
    rowGap: Size.calcHeight(18),
    backgroundColor: colors.WHITE_300,
    marginTop: Size.calcHeight(40),
    marginBottom: Size.calcHeight(16),
    borderRadius: Size.calcAverage(8),
  },

  contentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: Size.calcWidth(12),
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(50),
  },

  header: {
    paddingTop: Size.calcHeight(27),
    paddingBottom: Size.calcHeight(35),
    borderBottomWidth: 0,
  },

  title: {
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(24),
    paddingBottom: Size.calcHeight(12),
  },
});

export default GroupAccessScreen;
