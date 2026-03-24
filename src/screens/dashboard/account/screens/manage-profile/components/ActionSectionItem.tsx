import { View, StyleSheet } from 'react-native';

import AppText from '@src/components/AppText';
import colors from '@src/configs/colors';
import Size from '@src/utils/useResponsiveSize';
import ActionItem, { ActionItemData } from './ActionItem';

export interface ActionSectionItemData {
  title: string;
  actions: ActionItemData[];
}

interface Props {
  sections: ActionSectionItemData[];
}

const ActionSectionItem = ({ sections }: Props): React.JSX.Element => {
  return (
    <View style={styles.container}>
      {sections?.map((section, index) => (
        <View key={index}>
          <AppText style={styles.sectionTitle}>{section?.title}</AppText>
          <ActionItem
            containerStyle={{ paddingVertical: 0 }}
            data={section?.actions}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    rowGap: Size.calcHeight(16),
    paddingVertical: Size.calcHeight(20),
  },

  sectionTitle: {
    paddingVertical: Size.calcHeight(4),
    paddingHorizontal: Size.calcWidth(21),
    color: colors.GRAY_100,
    fontSize: Size.calcAverage(12),
  },
});

export default ActionSectionItem;
