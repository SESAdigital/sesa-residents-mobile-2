import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import AppImage from '@src/components/AppImage';
import AppText from '@src/components/AppText';
import SampleAdImage from '@src/assets/images/sample-ad.png';
import Size from '@src/utils/useResponsiveSize';
import fonts from '@src/configs/fonts';
import colors from '@src/configs/colors';
import {
  MaterialSymbolsCalendarAddOn,
  MaterialSymbolsGroupAdd,
  MaterialSymbolsGroups,
  MaterialSymbolsSos,
} from '@src/components/icons';

const actions = [
  {
    Icon: MaterialSymbolsSos,
    title: 'Panic Alert',
    color: colors.RED_100,
    bgColor: colors.RED_300,
  },
  {
    Icon: MaterialSymbolsGroupAdd,
    title: 'Book Visitor',
    color: colors.GREEN_100,
    bgColor: colors.GREEN_110,
  },
  {
    Icon: MaterialSymbolsCalendarAddOn,
    title: 'Create Events',
    bgColor: colors.YELLOW_500,
    color: colors.YELLOW_100,
  },
  {
    Icon: MaterialSymbolsGroups,
    title: 'Group Access',
    bgColor: colors.BLUE_900,
    color: colors.BLUE_600,
  },
];

const QuickActionAndAdsSection = (): React.ReactNode => {
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
          {actions.map(({ Icon, title, bgColor, color }, index) => (
            <View key={index} style={{ paddingHorizontal: Size.calcWidth(14) }}>
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
                <AppText style={styles.actionText}>{title}</AppText>
              </TouchableOpacity>
            </View>
          ))}
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
