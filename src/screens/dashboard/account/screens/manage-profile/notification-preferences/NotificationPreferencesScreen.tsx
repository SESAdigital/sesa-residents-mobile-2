import { useState } from 'react';
import AppScreen from '@src/components/AppScreen';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import { StyleSheet, View } from 'react-native';
import {
  MaterialSymbolsEngineeringOutline,
  MaterialSymbolsGroupOutline,
  MaterialSymbolsPersonAddOutline,
} from '@src/components/icons';
import AppText from '@src/components/AppText';
import { useGetUserDetails } from '@src/hooks/useGetRequests';
import Size from '@src/utils/useResponsiveSize';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import AppSwitch from '@src/components/forms/AppSwitch';

const NotificationPreferencesScreen = (): React.JSX.Element => {
  const { loginResponse, profileData } = useGetUserDetails();

  console.log({ loginResponse, profileData });

  const values = [
    {
      Icon: MaterialSymbolsPersonAddOutline,
      title: 'All visitors’ access activity',
      description: "Receive updates about all visitors' access activity",
      isDisabled: false,
      isChecked: true,
    },
    {
      Icon: MaterialSymbolsEngineeringOutline,
      title: 'Site workers’ access activity',
      description: "Receive updates on site workers' access activity.",
      isDisabled: false,
      isChecked: true,
    },
    {
      Icon: MaterialSymbolsGroupOutline,
      title: 'Dependants’ access activity',
      description: "Receive updates about dependants' access activity.",
      isChecked: true,
      isDisabled: false,
    },
  ];

  return (
    <AppScreen showDownInset>
      <AppScreenHeader title="Notification Preferences" />
      <AppText>Property Access</AppText>

      {values.map(({ Icon, description, isDisabled, title }, index) => (
        <View style={styles.rowItem} key={index}>
          <Icon
            color={colors.BLACK_200}
            height={Size.calcAverage(16)}
            width={Size.calcAverage(16)}
          />
          <View style={styles.rowContent}>
            <AppText style={{ fontFamily: fonts.INTER_500 }}>{title}</AppText>
            <AppText style={styles.rowDescription}>{description}</AppText>
          </View>
          <AppSwitch isEnabled={true} onValueChange={() => {}} />
        </View>
      ))}
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  rowContent: {
    flex: 1,
    flexShrink: 1,
    rowGap: Size.calcHeight(4),
    paddingHorizontal: Size.calcWidth(20),
  },

  rowDescription: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
  },

  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default NotificationPreferencesScreen;
