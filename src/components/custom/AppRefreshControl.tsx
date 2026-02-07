import { RefreshControl, RefreshControlProps } from 'react-native';

import Size from '@src/utils/useResponsiveSize';

const AppRefreshControl = (props: RefreshControlProps) => {
  return <RefreshControl progressViewOffset={Size.calcHeight(20)} {...props} />;
};

export default AppRefreshControl;
