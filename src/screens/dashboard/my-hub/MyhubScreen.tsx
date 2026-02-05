import { StyleSheet, View } from 'react-native';

import AppScreen from '@src/components/AppScreen';
import HomeHeaderSection from '../home/components/HomeHeaderSection';
import { myHubData } from '@src/assets/data';
import AppText from '@src/components/AppText';
import Size from '@src/utils/useResponsiveSize';
import fonts from '@src/configs/fonts';
import colors from '@src/configs/colors';

const MyhubScreen = (): React.ReactNode => {
  return (
    <AppScreen scrollable style={myHubStyles.container}>
      <HomeHeaderSection />
      <View style={myHubStyles.contentContainer}>
        {myHubData.map((section, index) => (
          <View key={index}>
            <AppText style={myHubStyles.sectionTitle}>{section.title}</AppText>
            {section.sections.map((row, index) => (
              <View style={myHubStyles.row} key={index}>
                {row?.map((item, key) => {
                  const { Icon, bgColor, color, title } = item;
                  const isFirst = key === 0;
                  const isLast = key === row?.length - 1;
                  const alignItems = isFirst
                    ? 'flex-start'
                    : isLast
                    ? 'flex-end'
                    : 'center';
                  const textAlign = isFirst
                    ? 'left'
                    : isLast
                    ? 'right'
                    : 'center';

                  if (!title)
                    return <View style={myHubStyles.itemContainer} key={key} />;
                  return (
                    <View
                      style={[myHubStyles.itemContainer, { alignItems }]}
                      key={key}
                    >
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
                      <AppText style={[myHubStyles.itemTitle, { textAlign }]}>
                        {title}
                      </AppText>
                    </View>
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
});

export default MyhubScreen;
