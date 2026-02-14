import { StyleSheet, Text } from 'react-native';

import AppScreen from '@src/components/AppScreen';

const AddMoneyViaCardScreen = (): React.JSX.Element => {
  return (
    <AppScreen style={styles.container}>
      <Text>AddMoneyViaCardScreen</Text>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AddMoneyViaCardScreen;
