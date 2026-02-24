import { TouchableOpacity } from 'react-native';

import { useGetUserDetails } from '@src/hooks/useGetRequests';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import AppAvatar from '../AppAvatar';

interface Props {
  size?: number;
}

const AppProfilePicture = (props: Props): React.JSX.Element => {
  const { details } = useGetUserDetails();
  const { size } = props;
  const navigation = useAppNavigator();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(routes.MANAGE_PROFILE_SCREEN)}
    >
      <AppAvatar
        firstWord={details?.firstName}
        imageURL={details?.photo}
        size={size}
        lastWord={details?.lastName}
      />
    </TouchableOpacity>
  );
};

export default AppProfilePicture;
