import { Activity, useState } from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';

import AppText from '@src/components/AppText';
import AppSelectModal from '@src/components/forms/AppSelectModal';
import { MaterialSymbolsArrowDropDown } from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import {
  useGetEventsHappeningToday,
  useGetGroupAccessHappeningToday,
  useGetVistorHappeningToday,
} from '@src/hooks/useGetRequests';
import Size from '@src/utils/useResponsiveSize';
import HappeningTodayEventsSection from '../sections/HappeningTodayEventsSection';
import HappeningTodayGroupAccessSection from '../sections/HappeningTodayGroupAccessSection';
import HappeningTodayVisitorSection from '../sections/HappeningTodayVisitorSection';

const tabs = [
  {
    label: 'Visitors',
    Section: HappeningTodayVisitorSection,
  },
  {
    label: 'Events',
    Section: HappeningTodayEventsSection,
  },
  {
    label: 'Group Access',
    Section: HappeningTodayGroupAccessSection,
  },
];

type Tab = (typeof tabs)[number]['label'];

const HappeningTodaySection = (): React.JSX.Element => {
  const [activeTab, setActiveTab] = useState<Tab>('Visitors');
  const [isModalVisible, setModalVisiblity] = useState(false);

  const {
    value: { data: visitorData },
  } = useGetVistorHappeningToday();

  const {
    value: { data: eventData },
  } = useGetEventsHappeningToday();

  const {
    value: { data: groupAccessData },
  } = useGetGroupAccessHappeningToday();

  const getLength = () => {
    if (activeTab === 'Visitors' && visitorData?.length) {
      return visitorData?.length;
    }
    if (activeTab === 'Events' && eventData?.length) {
      return eventData?.length;
    }
    if (activeTab === 'Group Access' && groupAccessData?.length) {
      return groupAccessData?.length;
    }
    return 0;
  };

  return (
    <>
      <View style={styles.container}>
        <AppText style={styles.title}>Happening Today ({getLength()})</AppText>
        <TouchableOpacity
          style={styles.row}
          onPress={() => setModalVisiblity(true)}
        >
          <AppText style={styles.visitorsText}>{activeTab}</AppText>
          <MaterialSymbolsArrowDropDown
            height={Size.calcAverage(20)}
            width={Size.calcAverage(20)}
            color={colors.BLUE_200}
          />
        </TouchableOpacity>
      </View>
      <AppSelectModal
        data={tabs?.map(item => ({ value: item.label, title: item.label }))}
        handleBgClose={() => setModalVisiblity(false)}
        onClose={() => setModalVisiblity(false)}
        isVisible={isModalVisible}
        placeholder="Happening Today"
        selectedItem={activeTab}
        onChange={value => setActiveTab(value as Tab)}
      />

      {tabs.map(({ Section, label }, index) => (
        <Activity key={index} mode={activeTab === label ? 'visible' : 'hidden'}>
          <Section />
        </Activity>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: colors.WHITE_300,
    borderTopWidth: Size.calcHeight(1),
    borderBottomWidth: Size.calcHeight(1),
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    fontFamily: fonts.INTER_600,
    color: colors.BLACK_200,
  },

  visitorsText: {
    color: colors.BLUE_200,
    fontSize: Size.calcAverage(12),
    fontFamily: fonts.INTER_600,
  },
});

export default HappeningTodaySection;
