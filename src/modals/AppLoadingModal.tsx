import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';

import AppText from '@src/components/AppText';
import colors from '@src/configs/colors';
import Size from '@src/utils/useResponsiveSize';
import fonts from '@src/configs/fonts';

interface Props {
  title?: string;
  isLoading: boolean;
}

const AppLoadingModal = (props: Props): React.JSX.Element => {
  const { title = 'Please wait...', isLoading } = props;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isLoading}
      onRequestClose={() => {}}
    >
      <View style={styles.container}>
        <View style={styles.inner}>
          <ActivityIndicator
            size={Size.calcHeight(23)}
            color={colors.GRAY_100}
          />
          <AppText style={styles.title}>{title}</AppText>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.GRAY_300,
    flex: 1,
    justifyContent: 'center',
  },
  inner: {
    padding: Size.calcAverage(18),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: colors.LIGHT_GRAY_100,
    marginHorizontal: 'auto',
    borderRadius: Size.calcAverage(12),
    shadowColor: colors.GRAY_600,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  title: {
    fontFamily: fonts.INTER_500,
    color: colors.GRAY_400,
    paddingLeft: Size.calcWidth(8),
  },
});

export default AppLoadingModal;
