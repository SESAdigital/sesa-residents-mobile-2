import { ScrollView, StyleSheet, View } from 'react-native';

import { deleteAccount } from '@src/api/auth.api';
import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import SubmitButton from '@src/components/forms/SubmitButton';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useLogout } from '@src/hooks';
import { useAppStateStore } from '@src/stores/appState.store';
import { openURL } from '@src/utils';
import appConfig from '@src/utils/appConfig';
import { appToast } from '@src/utils/appToast';
import { handleToastApiError } from '@src/utils/handleErrors';
import Size from '@src/utils/useResponsiveSize';

const consequences = [
  {
    title: 'Loss of Data',
    description:
      'Deleting your account means you will permanently lose access to all SESA account-related data, including personal information used to create your SESA account, access history, wallet transaction history, etc.',
  },
  {
    title: 'Subscriptions and Services',
    description:
      'Any active subscriptions or services associated with your account will be canceled upon account deletion. Ensure that you have addressed any ongoing services before proceeding.',
  },
  {
    title: 'Communication History',
    description:
      'All your communication history, including messages, interactions, and conversations with your estate manager, will be permanently deleted.',
  },
];

const DeleteAccountScreen = (): React.JSX.Element => {
  const { setActiveModal, setIsAppModalLoading } = useAppStateStore();
  const { onLogoutClick } = useLogout();

  const onAccountDelete = async () => {
    setIsAppModalLoading(true);
    const response = await deleteAccount();
    setIsAppModalLoading(false);

    if (response?.ok) {
      onLogoutClick();
      appToast.Success(
        response?.data?.message || 'Account deleted successfully',
      );
    } else {
      handleToastApiError(response);
    }
    return;
  };

  const handleDeleteAccount = () => {
    setActiveModal({
      modalType: 'PROMT_MODAL',
      shouldBackgroundClose: true,
      promptModal: {
        title: 'Delete account?',
        description:
          'You will lose access to your information. Are you sure you want to delete your account?',
        yesButtonTitle: 'No, Cancel',
        isInverse: true,
        noButtonProps: {
          titleStyle: {
            color: colors.RED_100,
          },
        },
        noButtonTitle: 'Yes, Delete',
        onYesButtonClick: onAccountDelete,
      },
    });
  };

  return (
    <AppScreen showDownInset style={styles.container}>
      <AppScreenHeader title="Delete Account" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>Introduction</AppText>
          <AppText style={styles.sectionContent}>
            At SESA, we value your privacy and understand that there may be
            times when you wish to permanently delete your account. This policy
            outlines the steps, consequences, and considerations related to
            account deletion.
          </AppText>
        </View>

        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>
            Key Considerations Before Deleting Your SESA Account
          </AppText>
        </View>

        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>Data Deletion</AppText>
          <AppText style={styles.sectionContent}>
            Deleting your SESA account is a permanent action. Once completed,
            all personal data, account settings, and any content associated with
            your account will be permanently erased from our system.
          </AppText>
          <AppText style={styles.sectionTitle}>Cancellation Period</AppText>
          <AppText style={styles.sectionContent}>
            After you initiate the account deletion process, you will have a
            14-day cancellation window during which you can change your mind. If
            you choose to cancel within this period, your account will not be
            deleted. Once this 14-day period ends, your account will be
            permanently deleted, and the action cannot be undone.
          </AppText>
        </View>

        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>
            Consequences of Deleting Your Account
          </AppText>
          {consequences.map((value, key) => (
            <View style={styles.listItem} key={key}>
              <AppText style={styles.bullet}>•</AppText>
              <AppText style={styles.sectionContent}>
                <AppText style={styles.bold}>{value?.title}</AppText>{' '}
                {value?.description}
              </AppText>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>
            Can I Recover My Account After Deletion?
          </AppText>
          <AppText style={styles.sectionContent}>
            No. Once your SESA account is permanently deleted, it cannot be
            recovered, and all data associated with it will be lost. However,
            you will have a 14-day grace period to cancel the deletion process
            before it becomes permanent.
          </AppText>
        </View>
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>
            Can I Recover My Account After Deletion?
          </AppText>
          <AppText style={styles.sectionContent}>
            No. Once your SESA account is permanently deleted, it cannot be
            recovered, and all data associated with it will be lost. However,
            you will have a 14-day grace period to cancel the deletion process
            before it becomes permanent.
          </AppText>
        </View>
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>Contact Us</AppText>
          <AppText style={styles.sectionContent}>
            If you have any questions or need assistance regarding account
            deletion, please send us an email at{' '}
            <AppText
              onPress={() => openURL(`mailto:${appConfig.APP_SUPPORT_EMAIL}`)}
              style={[styles.bold, { color: colors.BLUE_200 }]}
            >
              {appConfig.APP_SUPPORT_EMAIL}
            </AppText>
          </AppText>
        </View>
      </ScrollView>
      <View style={styles.deleteButtonContainer}>
        <SubmitButton
          title="Delete Account"
          onPress={handleDeleteAccount}
          isLoading={false}
          variant="DANGER"
        />
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE_100,
  },
  deleteButtonContainer: {
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(24),
    borderTopWidth: Size.calcHeight(1),
    borderTopColor: colors.LIGHT_GRAY_100,
  },
  scrollContent: {
    paddingHorizontal: Size.calcWidth(21),
    paddingTop: Size.calcHeight(20),
  },
  mainTitle: {
    fontSize: Size.calcAverage(18),
    fontFamily: fonts.INTER_700,
    color: colors.BLUE_100,
    textAlign: 'center',
    marginBottom: Size.calcHeight(30),
    textTransform: 'uppercase',
  },
  section: {
    marginBottom: Size.calcHeight(24),
    rowGap: Size.calcHeight(24),
  },
  sectionTitle: {
    fontSize: Size.calcAverage(16),
    fontFamily: fonts.INTER_700,
    color: colors.BLACK_100,
    marginBottom: Size.calcHeight(12),
  },
  sectionContent: {
    fontSize: Size.calcAverage(14),
    fontFamily: fonts.INTER_400,
    color: colors.BLUE_120,
    lineHeight: Size.calcAverage(20),
  },
  listItem: {
    flexDirection: 'row',
    marginTop: Size.calcHeight(8),
    paddingLeft: Size.calcWidth(8),
  },
  bullet: {
    fontSize: Size.calcAverage(14),
    marginRight: Size.calcWidth(8),
    color: colors.BLUE_120,
  },
  bold: {
    fontFamily: fonts.INTER_700,
    fontWeight: '700',
  },
});

export default DeleteAccountScreen;
