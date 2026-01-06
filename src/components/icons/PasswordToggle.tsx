import { Pressable } from 'react-native';

import { Eye2Line, RiEyeOffFill } from './index';
import Size from '@src/utils/useResponsiveSize';
import colors from '@src/configs/colors';

interface Props {
  onClick: () => void;
  isVisible: boolean;
}

const iconProp = {
  height: Size.calcAverage(20),
  width: Size.calcAverage(20),
  color: colors.GRAY_200,
};

const PasswordToggle = ({ isVisible, onClick }: Props): React.ReactNode => {
  return (
    <Pressable onPress={onClick}>
      {isVisible ? (
        <RiEyeOffFill key={1} {...iconProp} />
      ) : (
        <Eye2Line key={2} {...iconProp} />
      )}
    </Pressable>
  );
};

export default PasswordToggle;
