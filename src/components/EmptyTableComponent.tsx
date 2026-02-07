import {StyleSheet, View} from 'react-native';

import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';
import AppText from './AppText';
import {EmptyTableIcon} from './icons/custom';

interface Props {
  title?: string;
  description?: string;
  retryButtonTitle?: string;
  onRetry?: () => void;
  fullScreen?: boolean;
}

const EmptyTableComponent = (props: Props): React.ReactNode => {
  // const {title, description, onRetry, retryButtonTitle, fullScreen} = props;
  const {title, description, onRetry, fullScreen} = props;

  return (
    <View style={[styles.container, fullScreen && {minHeight: '80%'}]}>
      <EmptyTableIcon
        width={Size.calcAverage(40)}
        height={Size.calcAverage(40)}
      />
      <AppText style={styles.title}>{title || 'Nothing to see here.'}</AppText>
      {!!description && (
        <AppText style={styles.description}>{description}</AppText>
      )}
      {!!onRetry && (
        <View style={{width: '70%'}}>
          {/* <SubmitButton
            title={retryButtonTitle || 'Refetch'}
            isLoading={false}
            onPress={onRetry}
          /> */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: Size.calcHeight(20),
    paddingVertical: Size.calcHeight(80),
  },

  description: {
    color: colors.GRAY_100,
    fontSize: Size.calcAverage(12),
  },

  title: {
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(12),
    color: colors.BLACK_200,
    // paddingTop: Size.calcHeight(8),
    // paddingBottom: Size.calcHeight(4),
  },
});

export default EmptyTableComponent;
