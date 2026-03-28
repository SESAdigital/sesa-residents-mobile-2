import colors from '@src/configs/colors';
import Size from '@src/utils/useResponsiveSize';
import { StyleSheet, View } from 'react-native';

interface Props {
  currentStep: number;
  totalSteps: number;
}

const AppStepIndicator = (props: Props): React.JSX.Element => {
  const { currentStep, totalSteps } = props;

  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          style={[
            styles.indicator,
            index < currentStep && { backgroundColor: colors.GREEN_600 },
          ]}
          key={index}
        />
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: Size.calcWidth(16),
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(10),
    borderBottomWidth: Size.calcHeight(1),
    borderBottomColor: colors.WHITE_300,
  },

  indicator: {
    flex: 1,
    height: Size.calcHeight(4),
    borderRadius: Size.calcWidth(4),
    backgroundColor: colors.LIGHT_GRAY_200,
  },
});

export default AppStepIndicator;
