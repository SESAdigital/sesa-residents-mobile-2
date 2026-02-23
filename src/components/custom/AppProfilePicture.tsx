import { useGetUserDetails } from '@src/hooks/useGetRequests';
import AppAvatar from '../AppAvatar';

interface Props {
  size?: number;
}

const AppProfilePicture = (props: Props): React.JSX.Element => {
  const { details } = useGetUserDetails();
  const { size } = props;

  return (
    <AppAvatar
      firstWord={details?.firstName}
      imageURL={details?.photo}
      size={size}
      lastWord={details?.lastName}
    />
  );
};

export default AppProfilePicture;
