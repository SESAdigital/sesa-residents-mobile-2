import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';

import AppAvatar from '@src/components/AppAvatar';
import AppText from '@src/components/AppText';
import {
  MaterialSymbolsArrowDropDown,
  MaterialSymbolsCall,
  MaterialSymbolsHelp,
  MaterialSymbolsHome,
  MaterialSymbolsMail,
  MaterialSymbolsQrCode,
  MaterialSymbolsQrCodeScanner,
  MaterialSymbolsSettings,
  MaterialSymbolsTouchApp,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useGetUserDetails } from '@src/hooks/useGetRequests';
import { useAuthStore } from '@src/stores/auth.store';
import Size from '@src/utils/useResponsiveSize';

const AccountScreen = (): React.ReactNode => {
  const { details } = useGetUserDetails();
  const { selectedProperty } = useAuthStore();

  const actions = [
    {
      Icon: MaterialSymbolsQrCodeScanner,
      onClick: () => {},
    },
    {
      Icon: MaterialSymbolsHelp,
      onClick: () => {},
    },
    {
      Icon: MaterialSymbolsSettings,
      onClick: () => {},
    },
  ];

  const actionButtons = [
    {
      title: 'Manage Profile',
      onClick: () => {},
    },
    {
      title: 'Manage Household',
      onClick: () => {},
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.accountHeader}>
        <AppText style={styles.accountTitle}>Account</AppText>
        <View style={styles.actions}>
          {actions?.map(({ Icon, onClick }, index) => (
            <TouchableOpacity key={index} onPress={onClick}>
              <Icon
                height={Size.calcAverage(24)}
                width={Size.calcAverage(24)}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.row}>
          <View style={styles.profileContainer}>
            <AppAvatar
              firstWord={details?.firstName}
              imageURL={details?.photo}
              lastWord={details?.lastName}
              style={styles.profileImage}
            />
            <View style={styles.profileDetails}>
              <AppText style={styles.profileName}>
                {details?.firstName} {details?.lastName}
              </AppText>
              <View style={styles.row}>
                <MaterialSymbolsMail
                  height={Size.calcAverage(16)}
                  width={Size.calcAverage(16)}
                  color={colors.GRAY_100}
                />
                <AppText style={styles.profileText}>{details?.email}</AppText>
              </View>
              <View style={styles.row}>
                <MaterialSymbolsCall
                  height={Size.calcAverage(16)}
                  width={Size.calcAverage(16)}
                  color={colors.GRAY_100}
                />
                <AppText style={styles.profileText}>{details?.phone}</AppText>
              </View>
            </View>
          </View>

          <TouchableOpacity>
            <MaterialSymbolsQrCode
              color={colors.BLUE_600}
              height={Size.calcAverage(24)}
              width={Size.calcAverage(24)}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.actionButtons}>
          {actionButtons?.map(({ title, onClick }, index) => (
            <TouchableOpacity
              style={styles.actionButton}
              key={index}
              onPress={onClick}
            >
              <AppText style={styles.actionButtonText}>{title}</AppText>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.switchPropertyContainer}>
          <AppText
            style={[styles.switchPropertyText, { color: colors.BLACK_200 }]}
          >
            Current Property
          </AppText>
          <View style={styles.row}>
            <AppText style={styles.switchPropertyText}>
              Switch Property (3)
            </AppText>
            <MaterialSymbolsArrowDropDown
              height={Size.calcAverage(16)}
              width={Size.calcAverage(16)}
              color={colors.BLUE_200}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.propertyCard}>
          <View style={styles.propertyIconContainer}>
            <MaterialSymbolsHome
              height={Size.calcAverage(24)}
              width={Size.calcAverage(24)}
              color={colors.WHITE_200}
            />
          </View>
          <View style={{ rowGap: Size.calcHeight(5), flexShrink: 1 }}>
            <AppText style={styles.propertyName} numberOfLines={1}>
              {selectedProperty?.name}
            </AppText>
            <AppText style={styles.propertyAddress} numberOfLines={1}>
              {selectedProperty?.propertyAddress}
            </AppText>
            <View style={styles.row}>
              <MaterialSymbolsTouchApp
                height={Size.calcAverage(14)}
                width={Size.calcAverage(14)}
                color={colors.BLUE_200}
              />
              <AppText style={styles.propertyInstruction}>
                Tap to view or configure access settings.
              </AppText>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: colors.WHITE_200 }}>
        <View style={styles.accessHistory}>
          <View style={styles.row}>
            <AppText style={styles.accessHistoryText}>Access History</AppText>
          </View>
          <View style={styles.row}>
            <AppText style={styles.switchPropertyText}>For You</AppText>
            <MaterialSymbolsArrowDropDown
              height={Size.calcAverage(16)}
              width={Size.calcAverage(16)}
              color={colors.BLUE_200}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  accessHistory: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(10),
  },

  accessHistoryText: {
    paddingRight: Size.calcWidth(2),
    fontFamily: fonts.INTER_600,
    color: colors.BLACK_200,
  },

  actionButton: {
    backgroundColor: colors.WHITE_200,
    width: '46%',
    paddingVertical: Size.calcHeight(8),
    paddingHorizontal: Size.calcWidth(16),
    borderRadius: 100,
    borderWidth: Size.calcAverage(1),
    borderColor: colors.BLUE_150,
  },

  actionButtonText: {
    fontFamily: fonts.INTER_500,
    textAlign: 'center',
  },

  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Size.calcHeight(16),
    paddingBottom: Size.calcHeight(20),
    borderBottomWidth: Size.calcHeight(1),
    borderBottomColor: colors.BLUE_400,
  },

  accountHeader: {
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(21),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: Size.calcHeight(0.5),
    borderBottomColor: colors.BLUE_150,
  },

  accountTitle: {
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(16),
    color: colors.BLACK_200,
  },

  actions: {
    flexDirection: 'row',
    gap: Size.calcWidth(20),
  },

  container: {
    backgroundColor: colors.BLUE_140,
    paddingTop: StatusBar.currentHeight,
  },

  contentContainer: {
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(19),
  },

  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  profileDetails: {
    rowGap: Size.calcHeight(6),
    paddingHorizontal: Size.calcWidth(12),
  },

  profileImage: {
    height: Size.calcAverage(56),
    width: Size.calcAverage(56),
    borderRadius: Size.calcAverage(56),
  },

  profileName: {
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(16),
    color: colors.BLACK_300,
  },

  profileText: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
    paddingHorizontal: Size.calcWidth(4),
  },

  propertyCard: {
    backgroundColor: colors.WHITE_200,
    borderRadius: Size.calcAverage(8),
    padding: Size.calcAverage(20),
    flexDirection: 'row',
    borderWidth: Size.calcAverage(1),
    borderColor: colors.WHITE_300,
    shadowColor: colors.BLUE_150,
    columnGap: Size.calcWidth(12),
    shadowOffset: {
      width: 0,
      height: Size.calcHeight(0),
    },
    shadowOpacity: Size.calcAverage(0.25),
    shadowRadius: Size.calcAverage(15),
    elevation: Size.calcAverage(15),
  },

  propertyIconContainer: {
    backgroundColor: colors.BLUE_200,
    padding: Size.calcAverage(8),
    borderRadius: Size.calcAverage(36),
    marginBottom: 'auto',
  },

  propertyInstruction: {
    fontSize: Size.calcAverage(12),
    color: colors.BLUE_200,
    paddingLeft: Size.calcWidth(4),
  },

  propertyName: {
    fontFamily: fonts.INTER_500,
    fontSize: Size.calcAverage(12),
  },

  propertyAddress: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  switchPropertyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Size.calcHeight(20),
    paddingBottom: Size.calcHeight(12),
  },

  switchPropertyText: {
    fontSize: Size.calcAverage(12),
    fontFamily: fonts.INTER_600,
    color: colors.BLUE_200,
  },
});

export default AccountScreen;
