import { TouchableOpacity } from 'react-native';

import { useGetUserDetails } from '@src/hooks/useGetRequests';
import { useAppNavigator } from '@src/navigation/AppNavigator';
import routes from '@src/navigation/routes';
import AppAvatar from '../AppAvatar';
import Size from '@src/utils/useResponsiveSize';

interface Props {
  size?: number;
  disabled?: boolean;
}

const AppProfilePicture = (props: Props): React.JSX.Element => {
  const { details } = useGetUserDetails();
  const { size, disabled } = props;
  const navigation = useAppNavigator();

  return (
    <TouchableOpacity
      disabled={disabled}
      hitSlop={Size.calcAverage(30)}
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
