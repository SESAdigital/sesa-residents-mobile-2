import {ActivityIndicator} from 'react-native';

import colors from '@src/configs/colors';

interface Props {
  size?: number | 'large' | 'small';
}

const AppActivityIndicator = (props: Props): React.ReactNode => {
  const {size = 'large'} = props;
  return <ActivityIndicator size={size} color={colors.BLUE_200} />;
};

export default AppActivityIndicator;
