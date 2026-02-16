import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BulbIconImage from '@src/assets/images/icons/bulb-icon.png';
import AppText from '@src/components/AppText';
import SubmitButton from '@src/components/forms/SubmitButton';
import colors from '@src/configs/colors';
import Size from '@src/utils/useResponsiveSize';
import {
  MaterialSymbolsCheckRounded,
  MaterialSymbolsShieldOutline,
  RiFireLine,
  RiHospitalLine,
  RiInformationFill,
} from '@src/components/icons';
import { PanicAlertType, PanicAlertTypeData } from '@src/api/constants/default';
import fonts from '@src/configs/fonts';
import { useHandlePanicAlert } from '@src/hooks';
import { formatMoneyToTwoDecimals } from '@src/utils';

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

const PanicAlertScreen = (): React.JSX.Element => {
  const [panicType, setPanicType] = useState<PanicAlertType>(
    PanicAlertTypeData.SecurityEmergency,
  );
  const { data } = useHandlePanicAlert();

  return (
    <SafeAreaView style={styles.container}>
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
          <View style={styles.countDownContainer}>
            <AppText style={styles.countDownText}>5</AppText>
          </View>

          <View>
            <AppText>
              {formatMoneyToTwoDecimals({ amount: data?.panicAlertFes || 0 })}{' '}
              will be debited from your wallet
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
          onPress={() => {}}
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

  countDownContainer: {
    height: Size.calcAverage(230),
    width: Size.calcAverage(230),
    backgroundColor: colors.WHITE_200,
    borderRadius: Size.calcAverage(230),
    marginHorizontal: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },

  countDownText: {
    fontSize: Size.calcAverage(90),
    fontFamily: fonts.INTER_500,
    color: colors.BLUE_110,
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
