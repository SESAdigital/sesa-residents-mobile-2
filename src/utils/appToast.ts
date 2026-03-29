import { ToastAndroid } from 'react-native';
import { toast } from 'sonner-native';

const Default = (message: string) => toast(message, {});

const Error = (message: string) => toast.error(message);

const Info = (message: string) => toast.info(message);

const Success = (message: string) => toast.success(message);

const Warning = (message: string) => toast.warning(message);

const Dismiss = () => toast.dismiss();

const Android = (message: string) =>
  ToastAndroid.showWithGravity(message, ToastAndroid.LONG, ToastAndroid.CENTER);

export const appToast = {
  Default,
  Warning,
  Success,
  Info,
  Error,
  Dismiss,
  Android,
};
