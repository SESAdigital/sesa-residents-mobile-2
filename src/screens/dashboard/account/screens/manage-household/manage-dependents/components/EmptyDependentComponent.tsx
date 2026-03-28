import { StyleSheet, View } from 'react-native';

import AppText from '@src/components/AppText';
import SubmitButton from '@src/components/forms/SubmitButton';
import { MaterialSymbolsSupervisorAccountRounded } from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';

interface Props {
  onPress: () => void;
}
const EmptyDependentComponent = ({ onPress }: Props): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MaterialSymbolsSupervisorAccountRounded
            height={Size.calcAverage(24)}
            width={Size.calcAverage(24)}
            color={colors.GRAY_100}
          />
        </View>
        <AppText style={styles.title}>Add your first dependent</AppText>
        <AppText style={styles.description}>
          Tap “add dependent” to get started.
        </AppText>
        <SubmitButton
          style={styles.button}
          title="Add dependent"
          onPress={onPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: Size.calcHeight(8),
    paddingHorizontal: Size.calcWidth(16),
  },

  container: {
    padding: Size.calcAverage(21),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    alignItems: 'center',
    maxWidth: Size.calcWidth(220),
  },

  description: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
    textAlign: 'center',
    paddingBottom: Size.calcHeight(16),
  },

  iconContainer: {
    borderRadius: 100,
    height: Size.calcAverage(56),
    width: Size.calcAverage(56),
    backgroundColor: colors.LIGHT_GRAY_200,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontFamily: fonts.INTER_500,
    color: colors.BLACK_300,
    paddingBottom: Size.calcHeight(4),
    paddingTop: Size.calcHeight(10),
    textAlign: 'center',
  },
});

export default EmptyDependentComponent;
