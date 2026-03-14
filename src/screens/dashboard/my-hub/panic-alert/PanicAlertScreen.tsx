import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PanicAlertType, PanicAlertTypeData } from '@src/api/constants/default';
import {
  PanicAlertMetricsData,
  postPanicAlert,
} from '@src/api/panicAlerts.api';
import BulbIconImage from '@src/assets/images/icons/bulb-icon.png';
import MailIcon from '@src/assets/images/icons/mail-icon.png';
import AppImage from '@src/components/AppImage';
import AppText from '@src/components/AppText';
import SubmitButton from '@src/components/forms/SubmitButton';
import {
  MaterialSymbolsCheckRounded,
  MaterialSymbolsShieldOutline,
  RiFireLine,
  RiHospitalLine,
  RiInformationFill,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import { useHandleTransactionRefresh } from '@src/hooks';
import AppLoadingModal from '@src/modals/AppLoadingModal';
import { AppScreenProps, useAppNavigator } from '@src/navigation/AppNavigator';
import { useAppStateStore } from '@src/stores/appState.store';
import { useAuthStore } from '@src/stores/auth.store';
import appConfig from '@src/utils/appConfig';
import { appToast } from '@src/utils/appToast';
import { handleToastApiError } from '@src/utils/handleErrors';
import Size from '@src/utils/useResponsiveSize';
import CountdownCircle from './components/CountdownCircle';
import PanicAlertGenericModal from './modals/PanicAlertGenericModal';

const emergencyTypes = [
  {
    title: 'Security',
    Icon: MaterialSymbolsShieldOutline,
    value: PanicAlertTypeData.SecurityEmergency,
  },
  {
    title: 'Fire',
    Icon: RiFireLine,
    value: PanicAlertTypeData.FireEmergency,
  },
  {
    title: 'Medical',
    Icon: RiHospitalLine,
    value: PanicAlertTypeData.MedicalEmergency,
  },
];

export interface PanicAlertScreenData {
  data: PanicAlertMetricsData;
  latitude: number;
  longitude: number;
}

type Props = AppScreenProps<'PANIC_ALERT_SCREEN'>;

const PanicAlertScreen = ({ route }: Props): React.JSX.Element => {
  const params = route?.params;
  const navigation = useAppNavigator();
  const { data, latitude, longitude } = params;
  const [panicType, setPanicType] = useState<PanicAlertType>(
    PanicAlertTypeData.SecurityEmergency,
  );
  const { handleRefreshTransactionalData: handleRefreshTransactions } =
    useHandleTransactionRefresh();
  const { selectedProperty } = useAuthStore();
  const {
    setIsAppModalLoading,
    isAppModalLoading,
    closeActiveModal,
    setActiveModal,
  } = useAppStateStore();

  const handleSendPanicAlert = async () => {
    if (isAppModalLoading) return;

    if (!selectedProperty?.id)
      return appToast.Error('Invalid property selected');

    setIsAppModalLoading(true);
    const response = await postPanicAlert({
      type: panicType,
      isWithinEstate: !!data?.isWithinEstate,
      latitude: latitude?.toString?.(),
      longitude: longitude?.toString?.(),
      propertyId: selectedProperty?.id,
    });
    setIsAppModalLoading(false);

    if (navigation.canGoBack()) {
      navigation.goBack?.();
    }

    if (response.ok) {
      handleRefreshTransactions();
      setActiveModal({
        modalType: 'EMPTY_MODAL',
        emptyModalComponent: (
          <PanicAlertGenericModal
            title="Panic alert sent"
            description={
              data?.isWithinEstate
                ? 'We have notified your estate security and emergency contact(s). Stay calm.'
                : 'We have notified your emergency contact(s). Stay calm.'
            }
            icon={MailIcon}
            yesButtonTitle="Okay, got it"
            onNoButtonClick={null}
            onYesButtonClick={closeActiveModal}
          />
        ),
      });
    } else {
      handleToastApiError(response);
    }
    return;
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppLoadingModal isLoading={isAppModalLoading} title="Please wait" />
      <View style={styles.banner}>
        <RiInformationFill
          height={Size.calcAverage(24)}
          width={Size.calcAverage(24)}
          color={data?.isWithinEstate ? colors.BLUE_600 : colors.RED_700}
        />
        <AppText style={styles.bannerText}>
          {data?.isWithinEstate
            ? 'It seems you are inside your estate. Your estate security and emergency contacts will be notified.'
            : 'It seems you are outside your estate. Your emergency contacts will be notified'}
        </AppText>
      </View>
      <View style={styles.contentContainer}>
        <View>
          <CountdownCircle
            duration={7}
            size={Size.calcAverage(200)}
            strokeWidth={Size.calcAverage(10)}
            color={colors.GREEN_150}
            onComplete={handleSendPanicAlert}
          />

          <View style={styles.debitContainer}>
            <AppImage
              style={styles.debitIcon}
              resizeMode="contain"
              source={BulbIconImage}
            />
            <AppText style={styles.debitText}>
              {appConfig.NAIRA_SYMBOL}
              {data?.panicAlertFes?.toLocaleString() || 0} will be debited from
              your wallet
            </AppText>
          </View>
        </View>

        <View>
          <AppText style={styles.emergencyTypeTitle}>
            Choose emergency type
          </AppText>
          <View style={styles.emergencyTypeContainer}>
            {emergencyTypes?.map(({ Icon, title, value }, key) => (
              <TouchableOpacity
                onPress={() => value !== panicType && setPanicType(value)}
                key={key}
                style={styles.emergencyType}
              >
                <Icon
                  height={Size.calcAverage(24)}
                  width={Size.calcAverage(24)}
                  color={colors.WHITE_200}
                />
                <AppText style={styles.emergencyTypeText}>{title}</AppText>
                {key === 0 && (
                  <AppText style={styles.defaultBadge}>Default</AppText>
                )}
                {value === panicType && (
                  <MaterialSymbolsCheckRounded
                    height={Size.calcAverage(24)}
                    width={Size.calcAverage(24)}
                    color={colors.WHITE_200}
                    style={{ marginLeft: 'auto' }}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <SubmitButton
          title="Terminate panic alert"
          onPress={() => navigation.goBack?.()}
          style={{ backgroundColor: colors.WHITE_200 }}
          titleStyle={{ color: colors.RED_100 }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  banner: {
    paddingLeft: Size.calcWidth(10),
    paddingRight: Size.calcWidth(17),
    paddingVertical: Size.calcHeight(10),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.BLUE_400,
  },

  bannerText: {
    fontFamily: fonts.INTER_500,
    paddingLeft: Size.calcWidth(10),
    flexShrink: 1,
  },

  container: {
    flex: 1,
    backgroundColor: colors.BLUE_700,
  },

  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: Size.calcHeight(50),
    paddingHorizontal: Size.calcWidth(21),
    paddingTop: Size.calcHeight(35),
  },

  defaultBadge: {
    backgroundColor: colors.WHITE_200,
    borderRadius: Size.calcAverage(100),
    paddingHorizontal: Size.calcWidth(8),
    paddingVertical: Size.calcHeight(1),
    shadowColor: colors.YELLOW_200,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    fontSize: Size.calcAverage(12),
    fontFamily: fonts.INTER_500,
    color: colors.YELLOW_100,
  },

  debitIcon: {
    height: Size.calcAverage(14),
    width: Size.calcAverage(14),
    resizeMode: 'contain',
  },

  debitContainer: {
    flexDirection: 'row',
    marginHorizontal: 'auto',
    alignItems: 'center',
    paddingHorizontal: Size.calcWidth(16),
    paddingVertical: Size.calcHeight(6),
    backgroundColor: colors.BLUE_300,
    borderRadius: Size.calcAverage(100),
    marginTop: Size.calcHeight(24),
    borderWidth: Size.calcAverage(1),
    borderColor: colors.BLUE_200,
  },

  debitText: {
    fontFamily: fonts.INTER_500,
    color: colors.WHITE_100,
    paddingLeft: Size.calcWidth(4),
    fontSize: Size.calcAverage(12),
  },

  emergencyType: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Size.calcWidth(12),
    paddingVertical: Size.calcHeight(16),
    backgroundColor: colors.BLUE_300,
  },

  emergencyTypeContainer: {
    borderRadius: Size.calcAverage(12),
    borderWidth: Size.calcHeight(0.8),
    borderColor: colors.BLUE_700,
    rowGap: Size.calcHeight(0.8),
    overflow: 'hidden',
  },

  emergencyTypeText: {
    fontFamily: fonts.INTER_500,
    color: colors.WHITE_200,
    paddingLeft: Size.calcWidth(8),
    paddingRight: Size.calcWidth(12),
  },

  emergencyTypeTitle: {
    fontFamily: fonts.INTER_600,
    color: colors.WHITE_200,
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(8),
  },
});

export default PanicAlertScreen;
