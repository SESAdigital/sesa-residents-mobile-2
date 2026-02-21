import { Contact } from 'react-native-contacts';

import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AppAvatar from '../AppAvatar';
import AppText from '../AppText';
import colors from '@src/configs/colors';
import Size from '@src/utils/useResponsiveSize';
import fonts from '@src/configs/fonts';
import AppSkeletonLoader from '../AppSkeletonLoader';
import { normalizePhoneNumber } from '@src/utils';

interface Props {
  val: Contact;
  onSelect: (val: string) => void;
}

const AppContactRow = ({ val, onSelect }: Props): React.JSX.Element => {
  const splitName = val?.displayName?.split(' ');

  const seen = new Set();

  const uniquePhoneNumbers =
    val?.phoneNumbers?.filter(item => {
      // 1. Remove ALL whitespace and lowercase it
      // \s matches any space, tab, or newline; /g makes it global
      const normalizedNum = normalizePhoneNumber(item?.number);

      // 2. Safety check: skip if the number is empty/null
      if (!normalizedNum) return false;

      // 3. De-duplicate using the 'seen' Set
      if (seen.has(normalizedNum)) {
        return false;
      }

      seen.add(normalizedNum);
      return true;
    }) || [];
  const numbers = uniquePhoneNumbers?.map(item =>
    normalizePhoneNumber(item?.number),
  );

  if (numbers?.length < 1) return <></>;

  const firstNumber = numbers?.[0];

  const firstWord = val?.givenName || splitName?.[0] || firstNumber;
  const lastWord = val?.familyName || splitName?.[1];

  return (
    <TouchableOpacity
      onPress={() => onSelect(firstNumber)}
      style={styles.container}
    >
      <AppAvatar
        firstWord={firstWord}
        lastWord={lastWord}
        imageURL={val?.thumbnailPath}
      />
      <View style={styles.content}>
        <AppText style={styles.contentName} numberOfLines={1}>
          {firstWord} {lastWord}
        </AppText>
        <AppText style={styles.contentNumber}>{numbers?.join(', ')}</AppText>
      </View>
    </TouchableOpacity>
  );
};

export const AppContactRowLoader = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <AppAvatar isLoading />
      <View style={styles.content}>
        <AppSkeletonLoader width="70%" />
        <AppSkeletonLoader width="60%" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: Size.calcWidth(14),
    alignItems: 'center',
    paddingVertical: Size.calcHeight(22),
    borderBottomWidth: Size.calcHeight(1),
    borderColor: colors.LIGHT_GRAY_300,
  },

  content: {
    flex: 1,
    paddingHorizontal: Size.calcWidth(21),
    rowGap: Size.calcHeight(4),
  },

  contentName: {
    color: colors.BLACK_100,
    fontFamily: fonts.INTER_500,
  },

  contentNumber: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
    fontFamily: fonts.INTER_500,
  },
});

export default AppContactRow;
