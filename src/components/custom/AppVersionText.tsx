import DeviceInfo from 'react-native-device-info';

import AppText from '../AppText';
import fonts from '@src/configs/fonts';
import colors from '@src/configs/colors';
import Size from '@src/utils/useResponsiveSize';

const AppVersionText = (): React.JSX.Element => {
  return (
    <AppText
      style={{
        textAlign: 'center',
        fontFamily: fonts.INTER_500,
        color: colors.GRAY_200,
        fontSize: Size.calcAverage(12),
        paddingBottom: Size.calcHeight(20),
      }}
    >
      Ver. {DeviceInfo.getVersion()}
    </AppText>
  );
};

export default AppVersionText;
