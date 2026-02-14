import { StyleSheet, Text } from 'react-native';

import AppScreen from '@src/components/AppScreen';

const CreateEventsScreen = (): React.JSX.Element => {
  return (
    <AppScreen style={styles.container}>
      <Text>CreateEventsScreen</Text>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default CreateEventsScreen;
