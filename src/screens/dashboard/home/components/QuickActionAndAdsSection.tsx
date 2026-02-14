import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import SampleAdImage from '@src/assets/images/sample-ad.png';
import AppImage from '@src/components/AppImage';
import AppText from '@src/components/AppText';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';
import { quickActions } from '@src/assets/data';

const QuickActionAndAdsSection = (): React.JSX.Element => {
  return (
    <>
      <View style={styles.row}>
        <AppText style={styles.quickActionsText}>Quick Actions</AppText>
        <TouchableOpacity>
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
            ({ Icon, altTitle, title, bgColor, color }, index) => (
              <View
                key={index}
                style={{ paddingHorizontal: Size.calcWidth(14) }}
              >
                <TouchableOpacity style={styles.actionButton}>
                  <View
                    style={[styles.iconContainer, { backgroundColor: bgColor }]}
                  >
                    <Icon
                      color={color}
                      height={Size.calcAverage(26)}
                      width={Size.calcAverage(26)}
                    />
                  </View>
                  <AppText style={styles.actionText}>
                    {altTitle ?? title}
                  </AppText>
                </TouchableOpacity>
              </View>
            ),
          )}
        </ScrollView>
      </View>
      <View style={styles.imageContainer}>
        <AppImage
          style={styles.image}
          resizeMode="contain"
          source={SampleAdImage}
        />
      </View>
    </>
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

  image: {
    width: '100%',
    aspectRatio: 16 / 9,
    resizeMode: 'contain',
    borderRadius: Size.calcAverage(8),
    overflow: 'hidden',
  },

  imageContainer: {
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(10),
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

export default QuickActionAndAdsSection;
