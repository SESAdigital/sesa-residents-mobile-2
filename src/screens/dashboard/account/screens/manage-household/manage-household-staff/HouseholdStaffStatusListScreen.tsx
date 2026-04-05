import AppFAB from '@src/components/AppFAB';
import { View, StyleSheet, Text } from 'react-native';

interface Props {
  status: 'all' | 'active' | 'inactive' | 'pending';
}

const HouseholdStaffStatusListScreen = (props: Props): React.JSX.Element => {
  const { status } = props;

  return (
    <View style={styles.container}>
      <Text>{status} HouseholdStaffStatusListScreen</Text>

      <AppFAB onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default HouseholdStaffStatusListScreen;
