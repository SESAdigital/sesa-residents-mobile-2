import { ActivityIndicator } from 'react-native';

import colors from '@src/configs/colors';

interface Props {
  size?: number | 'large' | 'small';
  color?: string;
}

const AppActivityIndicator = (props: Props): React.ReactNode => {
  const { size = 'large', color = colors.BLUE_200 } = props;
  return <ActivityIndicator size={size} color={color} />;
};

export default AppActivityIndicator;
