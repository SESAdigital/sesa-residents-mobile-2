import { StyleSheet, View } from 'react-native';

import { HubItem } from '@src/assets/data/hubItems';
import AppText from '@src/components/AppText';
import ComingSoonGradient from '@src/components/common/ComingSoonGradient';
import SubmitButton from '@src/components/forms/SubmitButton';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useAppStateStore } from '@src/stores/appState.store';
import Size from '@src/utils/useResponsiveSize';

interface Props {
  details: { title?: string; description: string }[];
  hubItem: HubItem;
}

const SesaCommingSoonModal = ({ details, hubItem }: Props): React.ReactNode => {
  const { closeActiveModal } = useAppStateStore();
  const { Icon, bgColor, title, color } = hubItem;

  return (
    <View style={styles.container}>
      <ComingSoonGradient />

      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
          <Icon
            height={Size.calcAverage(28)}
            width={Size.calcAverage(28)}
            color={color}
          />
        </View>
        <AppText style={styles.title}>{title}</AppText>

        <View style={styles.detailLayout}>
          {details.map((detail, index) => (
            <View style={styles.detailContainer} key={index}>
              {!!detail?.title && (
                <AppText style={styles.detailTitle}>{detail.title}</AppText>
              )}
              <AppText>{detail.description}</AppText>
            </View>
          ))}
        </View>
        <SubmitButton onPress={closeActiveModal} title="Okay, got it" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    borderRadius: Size.calcAverage(12),
    backgroundColor: colors.WHITE_300,
    padding: Size.calcAverage(12),
  },

  detailLayout: {
    rowGap: Size.calcHeight(12),
    paddingBottom: Size.calcHeight(42),
  },

  detailTitle: {
    fontFamily: fonts.INTER_600,
    color: colors.BLACK_300,
    paddingBottom: Size.calcHeight(4),
  },

  container: {
    backgroundColor: colors.WHITE_100,
    borderRadius: Size.calcAverage(12),
    overflow: 'hidden',
  },

  content: {
    paddingHorizontal: Size.calcWidth(21),
    paddingTop: Size.calcHeight(15),
    paddingBottom: Size.calcHeight(43),
  },

  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: Size.calcAverage(72),
    marginHorizontal: 'auto',
    width: Size.calcAverage(72),
  },

  title: {
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(20),
    paddingBottom: Size.calcHeight(16),
    paddingTop: Size.calcHeight(13),
    textAlign: 'center',
  },
});

export default SesaCommingSoonModal;
