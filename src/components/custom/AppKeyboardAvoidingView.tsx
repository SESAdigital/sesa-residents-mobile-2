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
      keyboardVerticalOffset={Platform.OS === 'ios' ? 70 : 0}
      // behavior={'padding'}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      {...props}
    />
  );
};

export default AppKeyboardAvoidingView;
