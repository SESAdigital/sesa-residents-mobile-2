import colors from '@src/configs/colors';
import AppText from '../AppText';
import Size from '@src/utils/useResponsiveSize';
import fonts from '@src/configs/fonts';

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
        fontFamily: fonts.INTER_500,
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
