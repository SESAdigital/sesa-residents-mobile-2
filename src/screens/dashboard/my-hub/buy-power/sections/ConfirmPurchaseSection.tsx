import { ScrollView, StyleSheet, View } from 'react-native';

import AppText from '@src/components/AppText';

const ConfirmPurchaseSection = (): React.JSX.Element => {
  // const firstDetails = [
  //   {
  //     title: 'Meter Number',
  //     value: '123456789',
  //   },
  //   {
  //     title: 'Property Address',
  //     value: '6:16 Wesley Close, Friends Colony Esta...',
  //   },
  // ];

  // const secondDetails = [
  //   {
  //     title: 'Total Amount',
  //     value: '100',
  //   },
  //   {
  //     title: 'Convenience Fee',
  //     value: '100',
  //   },
  //   {
  //     title: 'You will get',
  //     value: '100 KW',
  //   },
  //   {
  //     title: 'You are paying',
  //     value: '100',
  //   },
  // ];

  return (
    <ScrollView style={styles.container}>
      <AppText>You are buying:</AppText>
      <View>
        <AppText>Estate token</AppText>
        <AppText>
          Buy estate power tokens to access your estate’s exclusive electricity
          services.
        </AppText>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ConfirmPurchaseSection;
