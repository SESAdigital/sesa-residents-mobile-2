import {PropsWithChildren} from 'react';
import Collapsible from 'react-native-collapsible';

interface Props extends PropsWithChildren {
  isVisible: boolean;
}

const AppCollapse = ({isVisible, children}: Props): React.ReactNode => {
  return <Collapsible collapsed={!isVisible}>{children}</Collapsible>;
};

export default AppCollapse;
