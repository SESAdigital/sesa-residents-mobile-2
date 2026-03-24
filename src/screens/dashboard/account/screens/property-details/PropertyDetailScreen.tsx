import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import AppAvatar from '@src/components/AppAvatar';
import AppImage from '@src/components/AppImage';
import AppScreen from '@src/components/AppScreen';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';
import AppText from '@src/components/AppText';
import AppPill from '@src/components/common/AppPill';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import {
  MaterialSymbolsAccountCircle,
  MaterialSymbolsArrowDropDown,
  MaterialSymbolsLightHistory,
  MaterialSymbolsLocationHomeRounded,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useGetPropertyDetails } from '@src/hooks/useGetRequests';
import Size from '@src/utils/useResponsiveSize';
import routes from '@src/navigation/routes';

const PropertyDetailScreen = (): React.JSX.Element => {
  const {
    value: { data: propertyDetails, isLoading },
    customRefetch,
  } = useGetPropertyDetails();
  const navigation = useNavigation();

  const accessData = [
    {
      title: 'Walk-in Visitors',
      isEnabled: propertyDetails?.enableWalkIn,
    },
    {
      title: 'Group Access',
      isEnabled: propertyDetails?.enableGroupAccess,
    },
  ];

  const details = [
    {
      title: 'Your occupant status',
      value: propertyDetails?.alphaStatus,
    },
    {
      title: 'Property Address',
      value: propertyDetails?.address,
    },
    {
      title: 'Property Name',
      value: propertyDetails?.name,
      skip: true,
    },
    {
      title: 'Estate Name',
      value: propertyDetails?.estateName,
    },
  ];

  return (
    <AppScreen showDownInset>
      <AppScreenHeader
        title="Property Details"
        icon="close"
        rightIcon={
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                routes.PROPERTY_DETAILS_OCCUPANT_HISTORY_SCREEN,
              )
            }
          >
            <MaterialSymbolsLightHistory
              height={Size.calcAverage(24)}
              width={Size.calcAverage(24)}
            />
          </TouchableOpacity>
        }
      />
      <ScrollView
        refreshControl={
          <AppRefreshControl refreshing={isLoading} onRefresh={customRefetch} />
        }
        contentContainerStyle={{ paddingVertical: Size.calcHeight(20) }}
        style={{ paddingHorizontal: Size.calcWidth(21) }}
      >
        {isLoading ? (
          <AppSkeletonLoader height={Size.calcHeight(232)} />
        ) : propertyDetails?.image ? (
          <AppImage
            source={{ uri: propertyDetails?.image }}
            style={styles.image}
          />
        ) : (
          <View style={styles.image}>
            <AppText style={styles.noImageText}>No Image Found</AppText>
          </View>
        )}

        <View style={styles.row}>
          {isLoading ? (
            <AppSkeletonLoader
              height={Size.calcHeight(20)}
              width={Size.calcWidth(100)}
            />
          ) : (
            <AppPill
              status={
                !!propertyDetails?.status &&
                propertyDetails?.status?.toLowerCase()?.trim() === 'active'
                  ? 'SUCCESS'
                  : 'DANGER'
              }
              statusText={propertyDetails?.status || ''}
            />
          )}

          {isLoading ? (
            <AppSkeletonLoader
              height={Size.calcHeight(20)}
              width={Size.calcWidth(100)}
            />
          ) : (
            <AppPill
              status="DEFAULT"
              CustomIcon={
                <MaterialSymbolsLocationHomeRounded
                  height={Size.calcAverage(16)}
                  width={Size.calcAverage(16)}
                />
              }
              statusText={propertyDetails?.category || ''}
            />
          )}
        </View>

        <View style={{ rowGap: Size.calcHeight(24) }}>
          <AppText style={styles.name}>{propertyDetails?.type}</AppText>

          {details?.map((detail, key) => {
            if (!isLoading && !detail?.value) return null;
            if (isLoading && detail?.skip) return null;
            return (
              <View key={key}>
                <AppText style={styles.title}>{detail?.title}</AppText>
                {isLoading ? (
                  <AppSkeletonLoader width="45%" />
                ) : (
                  <AppText>{detail?.value}</AppText>
                )}
              </View>
            );
          })}
        </View>
        <View style={styles.accessSection}>
          <View style={styles.row2}>
            <AppText style={styles.accessText}>Property Access</AppText>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  routes.PROPERTY_DETAILS_CONFIGURE_ACCESS_SCREEN,
                )
              }
              disabled={isLoading}
              style={styles.row3}
            >
              <AppText style={styles.accessConfig}>Configure Access</AppText>
              <MaterialSymbolsArrowDropDown
                height={Size.calcAverage(20)}
                width={Size.calcAverage(20)}
                color={colors.BLUE_200}
                style={{ transform: [{ rotate: '-90deg' }] }}
              />
            </TouchableOpacity>
          </View>

          {accessData?.map(({ isEnabled, title }, key) => (
            <View key={key} style={styles.row2}>
              <AppText>{title}</AppText>
              {isLoading ? (
                <AppSkeletonLoader width={Size.calcWidth(100)} />
              ) : (
                <AppText
                  style={[
                    styles.accessValue,
                    isEnabled && { color: colors.GREEN_100 },
                  ]}
                >
                  {typeof isEnabled === 'undefined'
                    ? '-'
                    : isEnabled
                    ? 'ON'
                    : 'OFF'}
                </AppText>
              )}
            </View>
          ))}
        </View>

        <AppText style={styles.title}>Owned by</AppText>
        {isLoading ? (
          <View style={[styles.row3, { paddingVertical: Size.calcHeight(10) }]}>
            <AppAvatar isLoading />
            <View style={styles.landlordStatusContainer}>
              <AppSkeletonLoader width={Size.calcWidth(100)} />
              <View style={styles.row3}>
                <MaterialSymbolsAccountCircle
                  height={Size.calcAverage(14)}
                  width={Size.calcAverage(14)}
                  color={colors.GRAY_100}
                />
                <AppSkeletonLoader
                  style={{ paddingLeft: Size.calcWidth(5) }}
                  width={Size.calcWidth(100)}
                />
              </View>
            </View>
          </View>
        ) : !propertyDetails?.ownerResponses ||
          propertyDetails?.ownerResponses?.length < 1 ? (
          <AppText>No Owner found</AppText>
        ) : (
          propertyDetails?.ownerResponses?.map(
            ({ landloadStatus, name, photo }, key) => (
              <View
                key={key}
                style={[styles.row3, { paddingVertical: Size.calcHeight(10) }]}
              >
                <AppAvatar
                  firstWord={name?.split?.(' ')?.[0]}
                  lastWord={name?.split?.(' ')?.[1]}
                  imageURL={photo}
                />
                <View style={styles.landlordStatusContainer}>
                  <AppText style={{ fontFamily: fonts.INTER_500 }}>
                    {name}
                  </AppText>
                  <View style={styles.row3}>
                    <MaterialSymbolsAccountCircle
                      height={Size.calcAverage(14)}
                      width={Size.calcAverage(14)}
                      color={colors.GRAY_100}
                    />
                    <AppText style={styles.landlordStatus}>
                      {landloadStatus}
                    </AppText>
                  </View>
                </View>
              </View>
            ),
          )
        )}
      </ScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  accessConfig: {
    fontFamily: fonts.INTER_600,
    color: colors.BLUE_200,
    fontSize: Size.calcAverage(12),
  },

  accessSection: {
    paddingVertical: Size.calcHeight(20),
    rowGap: Size.calcHeight(12.5),
  },

  accessText: {
    fontFamily: fonts.INTER_500,
    fontSize: Size.calcAverage(12),
  },

  accessValue: {
    fontSize: Size.calcAverage(12),
    fontFamily: fonts.INTER_500,
    color: colors.GRAY_200,
  },

  image: {
    height: Size.calcHeight(232),
    width: '100%',
    backgroundColor: colors.LIGHT_GRAY_100,
    borderRadius: Size.calcAverage(8),
    alignItems: 'center',
    justifyContent: 'center',
  },

  landlordStatus: {
    color: colors.GRAY_100,
    fontSize: Size.calcAverage(12),
    paddingLeft: Size.calcWidth(5),
  },

  landlordStatusContainer: {
    paddingHorizontal: Size.calcWidth(8),
    rowGap: Size.calcHeight(4),
  },

  name: {
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(16),
    paddingTop: Size.calcHeight(13),
  },

  noImageText: {
    color: colors.GRAY_100,
    fontSize: Size.calcAverage(12),
    fontFamily: fonts.INTER_600,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Size.calcHeight(20),
    gap: Size.calcAverage(5),
  },

  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Size.calcHeight(4),
  },

  row3: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    fontSize: Size.calcAverage(12),
    fontFamily: fonts.INTER_500,
    color: colors.GRAY_100,
    paddingBottom: Size.calcHeight(8),
  },
});

export default PropertyDetailScreen;
