import { View } from 'react-native';

import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';
import AppText from '../AppText';
import { CustomShareIcon } from '../icons/custom';

interface Props {
  title?: string;
}

const ShareIconButtonComponent = (props: Props): React.JSX.Element => {
  const { title } = props;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <CustomShareIcon
        height={Size.calcAverage(16)}
        color={colors.WHITE_200}
        width={Size.calcAverage(16)}
      />
      <AppText
        style={{
          fontFamily: fonts.INTER_500,
          color: colors.WHITE_200,
          paddingHorizontal: Size.calcWidth(8),
        }}
      >
        {title || 'Share'}
      </AppText>
    </View>
  );
};

export default ShareIconButtonComponent;
