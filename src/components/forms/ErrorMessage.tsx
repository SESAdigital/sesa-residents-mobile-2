import { StyleProp, TextStyle } from 'react-native';

import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';
import AppText from '../AppText';

interface Props {
  message: string | null;
  style?: StyleProp<TextStyle>;
}

const ErrorMessage = ({ message, style }: Props): React.JSX.Element => {
  if (!message) {
    return <></>;
  }

  const formattedMessage = message?.split('"')?.join('');

  return (
    <AppText
      style={[
        {
          color: colors.RED_100,
          fontFamily: fonts.INTER_500,
          marginTop: Size.calcHeight(2),
          padding: Size.calcAverage(1),
          fontSize: Size.calcAverage(12),
        },
        style,
      ]}
    >
      {formattedMessage?.charAt(0).toUpperCase() + formattedMessage.slice(1)}
    </AppText>
  );
};

export default ErrorMessage;
