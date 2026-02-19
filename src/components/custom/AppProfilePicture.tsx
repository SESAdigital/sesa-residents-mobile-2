import { useGetUserDetails } from '@src/hooks/useGetRequests';
import AppAvatar from '../AppAvatar';

const AppProfilePicture = (): React.JSX.Element => {
  const { details } = useGetUserDetails();
  return (
    <AppAvatar
      firstWord={details?.firstName}
      imageURL={details?.photo}
      lastWord={details?.lastName}
    />
  );
};

export default AppProfilePicture;
