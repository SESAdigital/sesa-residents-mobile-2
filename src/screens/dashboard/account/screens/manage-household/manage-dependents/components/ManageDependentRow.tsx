import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { GetHouseholdPropertyDependentsResData } from '@src/api/household.api';
import AppAvatar from '@src/components/AppAvatar';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';
import AppText from '@src/components/AppText';
import AppGenderTypeIconText from '@src/components/common/AppGenderTypeIconText';
import {
  MaterialSymbolsAccountCircleOutline,
  MaterialSymbolsMoreVert,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { dayJSFormatter } from '@src/utils/time';
import Size from '@src/utils/useResponsiveSize';
import AccessCardStatusMapper from '../../manage-access-cards/components/AccessCardStatusMapper';

interface Props {
  onPress?: () => void;
  data: GetHouseholdPropertyDependentsResData;
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  showActivity?: boolean;
  onMorePress?: () => void;
}

const ManageDependentRow = (props: Props): React.JSX.Element => {
  const {
    data,
    onPress,
    containerStyle,
    contentContainerStyle,
    showActivity,
    onMorePress,
  } = props;
  const spiltedName = data?.name?.split(' ');

  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      style={[styles.container, containerStyle]}
    >
      <View style={styles.iconContainer}>
        <AppAvatar firstWord={spiltedName?.[0]} lastWord={spiltedName?.[1]} />
      </View>
      <View style={[styles.contentContainer, contentContainerStyle]}>
        <View style={styles.content}>
          <View style={styles.row2}>
            <AppText style={styles.contentTitle}>{data?.name}</AppText>
            {data?.isPendingApproval ? (
              <AppText style={styles.pendingText}>Pending</AppText>
            ) : (
              <AccessCardStatusMapper
                status={data?.status}
                statusText={data?.statusText}
              />
            )}
          </View>
          <View style={styles.row2}>
            <View style={styles.row}>
              <MaterialSymbolsAccountCircleOutline
                height={Size.calcAverage(16)}
                width={Size.calcAverage(16)}
                color={colors.GRAY_100}
              />
              <AppText style={styles.text}>{data?.code}</AppText>
            </View>

            <AppGenderTypeIconText
              type={data?.gender}
              text={data?.genderText}
            />
          </View>
          {showActivity && (
            <AppText style={styles.text}>
              {data?.lastactivity
                ? `Last activity: ${dayJSFormatter({
                    format: 'MMM D, YYYY h:mm A',
                    value: data?.lastactivity,
                    shouldNotLocalize: true,
                  })}`
                : 'No activity'}
            </AppText>
          )}
        </View>
        {!!onMorePress && (
          <TouchableOpacity
            onPress={e => {
              e?.stopPropagation?.();
              onMorePress();
            }}
          >
            <MaterialSymbolsMoreVert
              height={Size.calcAverage(24)}
              width={Size.calcAverage(24)}
              color={colors.GRAY_200}
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export const ManageDependentRowLoader = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <AppAvatar isLoading />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <AppSkeletonLoader width={Size.calcWidth(100)} />
          <View style={styles.row2}>
            <View style={styles.row}>
              <MaterialSymbolsAccountCircleOutline
                height={Size.calcAverage(16)}
                width={Size.calcAverage(16)}
                color={colors.GRAY_100}
              />
              <AppSkeletonLoader width={Size.calcWidth(100)} />
            </View>

            <AppSkeletonLoader width={Size.calcWidth(100)} />
          </View>
          <AppSkeletonLoader width={Size.calcWidth(100)} />
        </View>

        <MaterialSymbolsMoreVert
          height={Size.calcAverage(24)}
          width={Size.calcAverage(24)}
          color={colors.GRAY_200}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Size.calcWidth(21),
    paddingTop: Size.calcHeight(20),
    columnGap: Size.calcWidth(12),
  },

  content: {
    rowGap: Size.calcHeight(4),
    flex: 1,
  },

  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.WHITE_300,
    borderBottomWidth: Size.calcHeight(1),
    paddingBottom: Size.calcHeight(20),
    flexShrink: 1,
  },

  contentTitle: {
    fontFamily: fonts.INTER_500,
    color: colors.BLACK_300,
  },

  iconContainer: {
    width: Size.calcAverage(40),
    height: Size.calcAverage(40),
    borderRadius: Size.calcAverage(40),
    backgroundColor: colors.WHITE_300,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 'auto',
  },

  pendingText: {
    fontFamily: fonts.INTER_500,
    color: colors.GRAY_200,
    fontSize: Size.calcAverage(12),
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Size.calcAverage(4),
  },

  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: Size.calcAverage(8),
  },

  text: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
  },
});

export default ManageDependentRow;
