import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { useAllHubItems } from '@src/assets/data';
import AppText from '@src/components/AppText';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import {
  useGetBillsMetrics,
  useGetPropertyDetails,
} from '@src/hooks/useGetRequests';
import routes from '@src/navigation/routes';
import Size from '@src/utils/useResponsiveSize';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';
import AppAvatar from '@src/components/AppAvatar';

const QuickActionSection = (): React.JSX.Element => {
  const navigation = useNavigation();
  const { quickActions, SelfAccessLoading } = useAllHubItems();
  useGetPropertyDetails();
  const { handleOverDueCheck, isLoading, isEstatePaymentOverdue } =
    useGetBillsMetrics();

  return (
    <View>
      <View style={styles.row}>
        <SelfAccessLoading />
        <AppText style={styles.quickActionsText}>Quick Actions</AppText>
        <TouchableOpacity
          // @ts-expect-error nothing for
          onPress={() => navigation.navigate(routes.MY_HUB_SCREEN)}
        >
          <AppText style={styles.goToHubText}>Go To Hub</AppText>
        </TouchableOpacity>
      </View>
      <View>
        <ScrollView
          contentContainerStyle={{ paddingLeft: Size.calcWidth(7) }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {quickActions?.map(
            (
              { Icon, altTitle, title, bgColor, route, color, onPress },
              index,
            ) => (
              <View
                key={index}
                style={{ paddingHorizontal: Size.calcWidth(14) }}
              >
                <TouchableOpacity
                  disabled={isLoading}
                  onPress={() => handleOverDueCheck(onPress || null)}
                  style={[
                    styles.actionButton,
                    isEstatePaymentOverdue &&
                      route !== routes.BILLS_AND_COLLECTIONS_SCREEN && {
                        opacity: 0.5,
                      },
                  ]}
                >
                  {isLoading ? (
                    <AppAvatar isLoading size={Size.calcAverage(56)} />
                  ) : (
                    <View
                      style={[
                        styles.iconContainer,
                        { backgroundColor: bgColor },
                      ]}
                    >
                      <Icon
                        color={color}
                        height={Size.calcAverage(26)}
                        width={Size.calcAverage(26)}
                      />
                    </View>
                  )}

                  {isLoading ? (
                    <AppSkeletonLoader width={Size.calcWidth(50)} />
                  ) : (
                    <AppText style={styles.actionText}>
                      {altTitle ?? title}
                    </AppText>
                  )}
                </TouchableOpacity>
              </View>
            ),
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: Size.calcHeight(8),
  },

  actionText: {
    fontFamily: fonts.INTER_500,
    color: colors.GRAY_100,
    fontSize: Size.calcAverage(12),
  },

  goToHubText: {
    fontFamily: fonts.INTER_500,
    color: colors.BLUE_200,
  },

  iconContainer: {
    height: Size.calcAverage(56),
    width: Size.calcAverage(56),
    borderRadius: Size.calcAverage(56),
    alignItems: 'center',
    justifyContent: 'center',
  },

  quickActionsText: {
    fontFamily: fonts.INTER_600,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Size.calcWidth(21),
    paddingTop: Size.calcHeight(32),
    paddingBottom: Size.calcHeight(24),
  },
});

export default QuickActionSection;
