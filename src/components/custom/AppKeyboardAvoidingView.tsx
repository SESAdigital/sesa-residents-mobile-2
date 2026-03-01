import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
} from 'react-native';

const AppKeyboardAvoidingView = (
  props: KeyboardAvoidingViewProps,
): React.JSX.Element => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 70 : 20}
      behavior={'padding'}
      {...props}
    />
  );
};

export default AppKeyboardAvoidingView;
