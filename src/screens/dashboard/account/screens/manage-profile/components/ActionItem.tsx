import { SvgProps } from 'react-native-svg';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import AppText from '@src/components/AppText';
import { MaterialSymbolsChevronRightRounded } from '@src/components/icons';
import colors from '@src/configs/colors';
import Size from '@src/utils/useResponsiveSize';
import fonts from '@src/configs/fonts';

export interface ActionItemData {
  Icon: (props: SvgProps) => React.JSX.Element;
  title: string;
  description?: string;
  onPress?: () => void;
  rightIcon?: React.JSX.Element;
  endText?: string | React.JSX.Element;
}

interface Props {
  data: ActionItemData[];
  containerStyle?: StyleProp<ViewStyle>;
}

const ActionItem = ({ data, containerStyle }: Props): React.JSX.Element => {
  return (
    <View style={[styles.actionsContainer, containerStyle]}>
      {data.map((value, index) => {
        const { Icon, title, onPress, rightIcon, description, endText } = value;
        return (
          <TouchableOpacity
            style={styles.actionRow}
            disabled={!onPress}
            onPress={onPress}
            key={index}
          >
            <Icon
              color={colors.BLACK_100}
              height={Size.calcAverage(24)}
              width={Size.calcAverage(24)}
            />
            <View style={styles.actionContainer}>
              <AppText style={{ fontFamily: fonts.INTER_500 }}>{title}</AppText>
              {description && (
                <AppText style={styles.actionDescription}>
                  {description}
                </AppText>
              )}
            </View>
            {rightIcon ? (
              rightIcon
            ) : (
              <View style={styles.row}>
                {!!endText && (
                  <>
                    {typeof endText === 'string' ? (
                      <AppText style={styles.endText}>{endText}</AppText>
                    ) : (
                      endText
                    )}
                  </>
                )}
                <MaterialSymbolsChevronRightRounded
                  color={colors.BLACK_100}
                  height={Size.calcAverage(24)}
                  width={Size.calcAverage(24)}
                />
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Size.calcHeight(11),
    borderColor: colors.LIGHT_GRAY_200,
  },

  actionContainer: {
    flex: 1,
    paddingHorizontal: Size.calcWidth(20),
  },

  actionsContainer: {
    rowGap: Size.calcHeight(6),
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(24),
  },

  actionDescription: {
    fontSize: Size.calcAverage(12),
    fontFamily: fonts.INTER_400,
    color: colors.GRAY_100,
  },

  endText: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
    fontFamily: fonts.INTER_500,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: Size.calcWidth(8),
  },
});

export default ActionItem;
