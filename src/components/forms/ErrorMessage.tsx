import colors from '@src/configs/colors';
import AppText from '../AppText';
import Size from '@src/utils/useResponsiveSize';

interface Props {
  message: string | null;
}

const ErrorMessage = ({ message }: Props): React.JSX.Element => {
  if (!message) {
    return <></>;
  }

  const formattedMessage = message?.split('"')?.join('');

  return (
    <AppText
      style={{
        color: colors.RED_100,
        marginTop: Size.calcHeight(2),
        padding: Size.calcAverage(1),
        fontSize: Size.calcAverage(12),
      }}
    >
      {formattedMessage?.charAt(0).toUpperCase() + formattedMessage.slice(1)}
    </AppText>
  );
};

export default ErrorMessage;
