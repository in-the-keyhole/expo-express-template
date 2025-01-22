import { SafeAreaView as SAVWeb } from 'react-native-web';
import { Platform, SafeAreaView as SAVMobile } from 'react-native';

const SafeAreaView =
({ style, ...otherProps }
: any) => {
  if (Platform.OS === 'web') {
    return <SAVWeb style={style} {...otherProps} />;
  }

  return <SAVMobile style={style} {...otherProps} />;
};

export {
    SafeAreaView
};
