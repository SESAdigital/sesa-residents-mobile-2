import Size from '@src/utils/useResponsiveSize';
import { View } from 'react-native';
import AppActivityIndicator from '../custom/AppActivityIndicator';

interface Props {
  isloading: boolean;
}

const AppListFooterLoader = (props: Props): React.JSX.Element => {
  const { isloading } = props;

  if (!isloading) return <></>;

  return (
    <View style={{ paddingTop: Size.calcHeight(20) }}>
      <AppActivityIndicator />
    </View>
  );
};

export default AppListFooterLoader;
