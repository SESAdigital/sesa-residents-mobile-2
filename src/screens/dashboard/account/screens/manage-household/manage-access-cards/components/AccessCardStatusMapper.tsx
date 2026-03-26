import { StyleSheet, View } from 'react-native';

import {
  AccessCardStatusType,
  AccessCardStatusTypeData,
} from '@src/api/constants/default';
import AppText from '@src/components/AppText';
import { MaterialSymbolsCheckRounded } from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';

interface Props {
  status: AccessCardStatusType;
  statusText: string;
}

const AccessCardStatusMapper = (props: Props): React.JSX.Element => {
  const { status, statusText } = props;

  const isActive = status === AccessCardStatusTypeData.Active;

  return (
    <View style={styles.container}>
      {isActive && (
        <MaterialSymbolsCheckRounded
          height={Size.calcAverage(16)}
          width={Size.calcAverage(16)}
          color={colors.GREEN_100}
        />
      )}
      <AppText style={[styles.text, !isActive && { color: colors.RED_100 }]}>
        {statusText}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Size.calcAverage(4),
  },

  text: {
    fontFamily: fonts.INTER_500,
    color: colors.GREEN_100,
    fontSize: Size.calcAverage(12),
  },
});

export default AccessCardStatusMapper;
