import { ScrollView, StyleSheet, View } from 'react-native';

import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import SubmitButton from '@src/components/forms/SubmitButton';
import {
  MaterialSymbolsE911Emergency,
  MaterialSymbolsHeadsetMic,
  MaterialSymbolsSecurity,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import Size from '@src/utils/useResponsiveSize';

const emergencyData = [
  {
    title:
      'If you trigger an SOS alert, we’ll auto-contact your emergency contacts.',
    Icon: MaterialSymbolsE911Emergency,
  },
  {
    title:
      'We’ll send an SMS, WhatsApp and email that contains a link to your exact location.',
    Icon: MaterialSymbolsHeadsetMic,
  },
  {
    title:
      'Our system is smart and knows when you are within or outside your assigned estate. If you are within your estate, we’ll notify the estate security and your emergency contacts. If you are outside your estate, we’ll notify your emergency contacts only.',
    Icon: MaterialSymbolsSecurity,
  },
];

const EmergencyContactsScreen = (): React.JSX.Element => {
  const navigation = useAppNavigator();

  return (
    <AppScreen showDownInset>
      <AppScreenHeader icon="close" containerStyle={styles.header} />
      <View style={styles.container}>
        <ScrollView style={{ paddingHorizontal: Size.calcWidth(21) }}>
          <AppText style={styles.title}>Add Emergency contacts</AppText>
          <AppText style={{ fontFamily: fonts.INTER_600 }}>
            Why this information is vital for you and us.
          </AppText>

          <View style={styles.emergencyContainer}>
            {emergencyData.map(({ Icon, title }, index) => (
              <View key={index} style={styles.emergencyItem}>
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
        <SubmitButton
          title="Add Emergency Contact"
          style={{ marginHorizontal: Size.calcWidth(21) }}
          onPress={() =>
            navigation.replace(routes.MANAGE_EMERGENCY_CONTACT_SCREEN, {
              id: 0,
            })
          }
        />
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: Size.calcHeight(51),
  },

  emergencyContainer: {
    paddingVertical: Size.calcHeight(24),
    paddingHorizontal: Size.calcWidth(18),
    rowGap: Size.calcHeight(18),
    backgroundColor: colors.WHITE_300,
    marginTop: Size.calcHeight(40),
    marginBottom: Size.calcHeight(16),
    borderRadius: Size.calcAverage(8),
  },

  emergencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: Size.calcWidth(12),
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

export default EmergencyContactsScreen;
