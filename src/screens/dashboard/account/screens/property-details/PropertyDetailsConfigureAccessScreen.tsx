import { StyleSheet, Text } from 'react-native';

import AppScreen from '@src/components/AppScreen';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import InformationRow from '@src/components/common/InformationRow';

const PropertyDetailsConfigureAccessScreen = (): React.JSX.Element => {
  return (
    <AppScreen showDownInset>
      <AppScreenHeader title="Account Settings" />
      <InformationRow title="Configure access for visitors without access codes." />
      <Text>PropertyDetailsConfigureAccessScreen</Text>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default PropertyDetailsConfigureAccessScreen;
