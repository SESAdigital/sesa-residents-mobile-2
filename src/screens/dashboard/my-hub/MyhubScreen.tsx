import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { useAllHubItems } from '@src/assets/data';
import AppAvatar from '@src/components/AppAvatar';
import AppScreen from '@src/components/AppScreen';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';
import AppText from '@src/components/AppText';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useGetBillsMetrics } from '@src/hooks/useGetRequests';
import Size from '@src/utils/useResponsiveSize';
import { Fragment } from 'react';
import HomeHeaderSection from '../home/components/HomeHeaderSection';
import routes from '@src/navigation/routes';

const MyhubScreen = (): React.JSX.Element => {
  const { myHubData, SelfAccessLoading } = useAllHubItems();
  const { isEstatePaymentOverdue, isLoading } = useGetBillsMetrics();

  return (
    <AppScreen scrollable style={myHubStyles.container}>
      <SelfAccessLoading />
      <HomeHeaderSection />
      <View style={myHubStyles.contentContainer}>
        {myHubData.map((section, index) => (
          <View key={index}>
            <AppText style={myHubStyles.sectionTitle}>{section.title}</AppText>
            {section.sections.map((row, key) => (
              <View style={myHubStyles.row} key={key}>
                {row?.map((item, secondKey) => {
                  const { Icon, bgColor, color, title, onPress } = item;
                  const { alignItems, textAlign } = getItemAlignment(
                    secondKey,
                    row?.length,
                  );

                  if (!title)
                    return (
                      <View style={myHubStyles.itemContainer} key={secondKey} />
                    );
                  return (
                    <Fragment key={secondKey}>
                      <TouchableOpacity
                        onPress={onPress}
                        disabled={isLoading}
                        style={[
                          myHubStyles.itemContainer,
                          { alignItems },
                          isEstatePaymentOverdue &&
                            item?.route !== null &&
                            item.route !==
                              routes.BILLS_AND_COLLECTIONS_SCREEN && {
                              opacity: 0.5,
                            },
                        ]}
                      >
                        {isLoading ? (
                          <AppAvatar isLoading size={Size.calcAverage(56)} />
                        ) : (
                          <View
                            style={[
                              myHubStyles.iconContainer,
                              { backgroundColor: bgColor, borderRadius: 100 },
                            ]}
                          >
                            <Icon
                              height={Size.calcAverage(28)}
                              width={Size.calcAverage(28)}
                              color={color}
                            />
                          </View>
                        )}

                        {isLoading ? (
                          <View style={myHubStyles.skeletonContainer}>
                            <AppSkeletonLoader width={Size.calcWidth(50)} />
                          </View>
                        ) : (
                          <AppText
                            style={[myHubStyles.itemTitle, { textAlign }]}
                          >
                            {title}
                          </AppText>
                        )}
                      </TouchableOpacity>
                    </Fragment>
                  );
                })}
              </View>
            ))}
          </View>
        ))}
      </View>
    </AppScreen>
  );
};

const myHubStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },

  contentContainer: {
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(32),
    rowGap: Size.calcHeight(19),
  },

  iconContainer: {
    width: '65%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    marginBottom: Size.calcHeight(8),
  },

  itemContainer: {
    width: '30%',
    alignItems: 'center',
  },

  itemTitle: {
    fontFamily: fonts.INTER_600,
    color: colors.GRAY_100,
    fontSize: Size.calcAverage(13),
    textAlign: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: Size.calcHeight(21),
  },

  sectionTitle: {
    fontFamily: fonts.INTER_600,
    color: colors.BLACK_200,
    paddingBottom: Size.calcHeight(24),
  },

  skeletonContainer: {
    paddingVertical: Size.calcHeight(8),
    width: '55%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MyhubScreen;

function getItemAlignment(index: number, length: number) {
  const isFirst = index === 0;
  const isLast = index === length - 1;

  const alignItems: 'flex-start' | 'flex-end' | 'center' = isFirst
    ? 'flex-start'
    : isLast
    ? 'flex-end'
    : 'center';
  const textAlign: 'left' | 'right' | 'center' = isFirst
    ? 'left'
    : isLast
    ? 'right'
    : 'center';

  return { alignItems, textAlign };
}
