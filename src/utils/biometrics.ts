import {
  BiometricStrength,
  isSensorAvailable,
  simplePrompt,
} from '@sbaiahmed1/react-native-biometrics';

const authenticate2 = async () => {
  try {
    const sensorInfo = await isSensorAvailable();
    console.log(sensorInfo);
    if (sensorInfo.available && sensorInfo.biometryType === 'TouchID') {
      console.log('TouchID is supported');
      const result = await simplePrompt('Confirm fingerprint');
      if (result) {
        console.log('Successful authentication');
      } else {
        console.log('User cancelled or authentication failed');
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const authenticate1 = async () => {
  try {
    const result = await simplePrompt('Please authenticate to continue', {
      biometricStrength: BiometricStrength.Weak, // or BiometricStrength.Strong
    });

    if (result) {
      console.log('✅ Authentication successful!', result);
      // Proceed with authenticated action
    } else {
      console.log('❌ Authentication failed or cancelled');
    }
  } catch (error) {
    console.log('💥 Authentication error:', error);
  }
};

import { authenticateWithOptions } from '@sbaiahmed1/react-native-biometrics';

const enhancedAuth = async (options: any) => {
  console.log(options);
  try {
    const result = await authenticateWithOptions(options);

    if (result.success) {
      console.log('✅ Authentication successful!');
      // User authenticated successfully
      //   navigateToSecureArea();
    } else {
      console.log('❌ Authentication failed:', result.error);
      console.log('🔢 Error code:', result.errorCode);
      // Handle authentication failure
      //   handleAuthFailure(result.errorCode);
    }
  } catch (error) {
    console.error('💥 Authentication error:', error);
  }
};

// Example: Different authentication scenarios
const authScenarios = {
  // Strict biometric only (no fallback)
  strictBiometric: {
    title: 'Biometric Required',
    subtitle: 'Touch sensor or look at camera',
    allowDeviceCredentials: false,
    disableDeviceFallback: true,
  },

  main: {
    title: '🔐 Secure Login',
    subtitle: 'Verify your identity',
    description: 'Use your biometric to access your account securely',
    cancelLabel: 'Cancel',
    fallbackLabel: 'Use Password',
    allowDeviceCredentials: true, // Allow PIN/password fallback
    disableDeviceFallback: false, // Enable fallback options
  },
  // Flexible authentication (with fallbacks)
  flexibleAuth: {
    title: 'Secure Access',
    subtitle: 'Use biometric or device passcode',
    allowDeviceCredentials: true,
    disableDeviceFallback: false,
    fallbackLabel: 'Use Passcode',
  },

  // Custom branded experience
  brandedAuth: {
    title: 'MyApp Security',
    subtitle: 'Protect your data',
    description: 'Authenticate to access your personal information',
    cancelLabel: 'Not Now',
    fallbackLabel: 'Enter PIN',
  },
};

const authenticate3 = async () => {
  enhancedAuth(authScenarios.flexibleAuth);
};

export const biometrics = {
  authenticate2,
  authenticate1,
  authenticate3,
};
