import { StyleSheet, View } from 'react-native';

import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';
import AppText from '../AppText';
import {
  MaterialSymbolsCheckRounded,
  MaterialSymbolsCloseRounded,
  MaterialSymbolsHorizontalRuleRounded,
  RiRecordCircleFill,
} from '../icons';
import { SvgProps } from 'react-native-svg';

export type AppPillStatus = 'SUCCESS' | 'DANGER' | 'DEFAULT' | 'WARNING';

interface Props {
  status: AppPillStatus;
  statusText: string;
  CustomIcon?: React.JSX.Element;
}

const AppPill = (props: Props): React.JSX.Element => {
  const { status, statusText, CustomIcon } = props;
  const { Icon, color, borderColor } = getStatusVariant(status);

  return (
    <View
      style={[
        styles.container,
        { shadowColor: color, borderColor: borderColor || color },
      ]}
    >
      {CustomIcon ? (
        CustomIcon
      ) : (
        <Icon
          height={Size.calcAverage(14)}
          width={Size.calcAverage(14)}
          color={color}
        />
      )}
      <AppText style={[styles.text, { color }]}>{statusText}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Size.calcWidth(8),
    paddingVertical: Size.calcHeight(2),
    borderRadius: 100,
    gap: Size.calcAverage(4),
    borderWidth: Size.calcWidth(0.2),
    shadowColor: colors.GRAY_600,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    backgroundColor: colors.WHITE_200,
  },

  text: {
    fontSize: Size.calcAverage(12),
    fontFamily: fonts.INTER_500,
  },
});

export default AppPill;

interface Variant {
  color: string;
  Icon: (props: SvgProps) => React.JSX.Element;
  borderColor?: string;
}

function getStatusVariant(status: AppPillStatus): Variant {
  if (status === 'SUCCESS') {
    return {
      color: colors.GREEN_100,
      borderColor: colors.GRAY_600,
      Icon: MaterialSymbolsCheckRounded,
    };
  }
  if (status === 'DANGER') {
    return {
      color: colors.RED_100,
      borderColor: colors.RED_100,
      Icon: MaterialSymbolsCloseRounded,
    };
  }
  if (status === 'WARNING') {
    return {
      color: colors.YELLOW_100,
      borderColor: colors.YELLOW_200,
      Icon: RiRecordCircleFill,
    };
  }

  return {
    color: colors.GRAY_100,
    Icon: MaterialSymbolsHorizontalRuleRounded,
  };
}
