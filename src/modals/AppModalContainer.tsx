import {
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import colors from '@src/configs/colors';
import Size from '@src/utils/useResponsiveSize';

interface Props extends React.PropsWithChildren {
  isVisible: boolean;
  onClose: () => void;
  style?: StyleProp<ViewStyle>;
}

const AppModalContainer = (props: Props): React.JSX.Element => {
  const { isVisible, onClose, children, style: containerStyle } = props;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={[styles.container, containerStyle]}>{children}</View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.GRAY_800,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: Size.calcAverage(20),
  },
});

export default AppModalContainer;
