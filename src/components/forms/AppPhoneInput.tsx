import { useState } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { checkPermission, requestPermission } from 'react-native-contacts';

import AppPhoneInputModal from '@src/modals/AppPhoneInputModal';
import appConfig from '@src/utils/appConfig';
import AppText from '../AppText';
import AppTextInputWithoutValidation, {
  AppTextInputWithoutValidationProps,
} from './AppTextInputWithoutValidation';
import { MaterialSymbolsCall } from '../icons';
import Size from '@src/utils/useResponsiveSize';
import colors from '@src/configs/colors';

interface AppTextInputProps<TFieldValues extends FieldValues>
  extends AppTextInputWithoutValidationProps {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  isDisabled?: boolean;
}

function AppPhoneInput<TFieldValues extends FieldValues>(
  props: AppTextInputProps<TFieldValues>,
) {
  const [isActive, setIsActive] = useState(false);

  const { name, control, isDisabled, ...otherProps } = props;

  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  const checkPermissionFunc = async () => {
    let isSuccess = false;
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        );

        isSuccess = granted;
      } else {
        // For iOS, check permission through react-native-contacts
        const permission = await checkPermission();
        isSuccess = permission === 'authorized';
      }
    } catch (ERR) {
      console.error('Error checking permission:', ERR);
    }

    return isSuccess;
  };

  const requestPermissionFunc = async () => {
    if (await checkPermissionFunc()) return setIsActive(true);

    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts Permission',
            message: `${appConfig.APP_NAME} needs access to your contacts to display them.`,
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setIsActive(true);
        } else {
          Alert.alert(
            'Permission Denied',
            'Cannot access contacts without permission.',
          );
        }
      } else {
        // For iOS
        const permission = await requestPermission();
        if (permission === 'authorized') {
          setIsActive(true);
        } else {
          Alert.alert(
            'Permission Denied',
            'Cannot access contacts without permission.',
          );
        }
      }
    } catch (ERR) {
      Alert.alert('Error', `Failed to request permission. ${ERR}`);
    }
  };

  // const handlePickContacts = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
  //       {
  //         title: 'Contacts',
  //         message: `${appConfig.APP_NAME} app would like to view your contacts.`,
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       setIsActive(true);
  //     } else {
  //       appToast.Info('Contacts permission denied.');
  //     }
  //   } catch (error) {
  //     appToast.Warning(
  //       `Error requesting contacts permission : ${truncateText(
  //         JSON.stringify(error),
  //       )}`,
  //     );
  //   }
  // };

  return (
    <View>
      <AppTextInputWithoutValidation
        errorMessage={error?.message}
        onBlur={field.onBlur}
        onChangeText={field.onChange}
        value={field.value}
        maxLength={11}
        editable={!isDisabled}
        keyboardType="number-pad"
        rightIcon={
          <TouchableOpacity
            disabled={isDisabled}
            onPress={requestPermissionFunc}
          >
            <MaterialSymbolsCall
              height={Size.calcAverage(20)}
              width={Size.calcAverage(20)}
              color={colors.BLACK_200}
            />
          </TouchableOpacity>
        }
        {...otherProps}
      />
      <View style={styles.contactContainer}>
        <AppText style={styles.tapText}>Tap</AppText>
        <MaterialSymbolsCall
          height={Size.calcAverage(16)}
          width={Size.calcAverage(16)}
          color={colors.BLACK_200}
        />
        <AppText style={styles.tapText}>
          icon to select from your contacts
        </AppText>
      </View>

      <AppPhoneInputModal
        isVisible={isActive && !isDisabled}
        onSelect={val => {
          field.onChange(val);
          setIsActive(false);
        }}
        onClose={() => setIsActive(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: Size.calcWidth(3),
    paddingTop: Size.calcHeight(8),
  },

  tapText: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
  },
});

export default AppPhoneInput;
