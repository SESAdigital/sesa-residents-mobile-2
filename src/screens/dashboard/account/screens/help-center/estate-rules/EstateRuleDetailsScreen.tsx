import { ScrollView, StyleSheet } from 'react-native';

import AppScreen from '@src/components/AppScreen';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import Size from '@src/utils/useResponsiveSize';
import AppText from '@src/components/AppText';
import { AppScreenProps } from '@src/navigation/AppNavigator';
import { dayJSFormatter } from '@src/utils/time';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';

type Props = AppScreenProps<'ESTATE_RULE_DETAILS_SCREEN'>;

const EstateRuleDetailsScreen = ({ route }: Props): React.JSX.Element => {
  const params = route?.params;
  return (
    <AppScreen showDownInset>
      <AppScreenHeader containerStyle={styles.header} />
      <ScrollView style={{ paddingHorizontal: Size.calcWidth(21) }}>
        <AppText style={styles.title}>{params?.title}</AppText>
        <AppText style={{ fontSize: Size.calcAverage(12) }}>
          {params?.details}
        </AppText>
        <AppText style={styles.time}>
          Added {dayJSFormatter(params?.timeCreated, 'MMM D, YYYY')}
        </AppText>
      </ScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: Size.calcHeight(25),
    borderBottomWidth: 0,
  },

  time: {
    paddingVertical: Size.calcHeight(20),
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
  },

  title: {
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(16),
    paddingTop: Size.calcHeight(20),
    paddingBottom: Size.calcHeight(8),
  },
});

export default EstateRuleDetailsScreen;
