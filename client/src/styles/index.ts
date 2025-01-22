import { Platform } from "react-native";
import { StyleSheet } from 'react-native';

let styles: any;
let baseMobileStyles;

if (Platform.OS === 'web') {
  ({ styles } = require('@/styles/web'))
} else if (Platform.OS === 'android') {
  baseMobileStyles = require('@/styles/baseMobileStyles');
  const androidStyles = require('@/styles/android');
  styles = StyleSheet.create({
    ...baseMobileStyles.default,
    ...androidStyles.default,
  });
  } else if (Platform.OS === 'ios') {
    const iosStyles = require('@/styles/ios');
    baseMobileStyles = require('@/styles/baseMobileStyles');
    styles = StyleSheet.create({
      ...baseMobileStyles.default,
      ...iosStyles.default,
    });
}

export { styles };
