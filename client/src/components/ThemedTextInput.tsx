import {
  TextInput,
  type TextInputProps,
  StyleSheet,
  Platform,
  useWindowDimensions,
} from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextInputProps = TextInputProps & {
  extraIcon?: boolean;
  lightTextColor?: string;
  darkTextColor?: string;
  lightBackgroundColor?: string;
  darkBackgroundColor?: string;
  lightBorderColor?: string;
  darkBorderColor?: string;
};

export const ThemedTextInput = ({
  style,
  extraIcon,
  lightTextColor,
  darkTextColor,
  lightBackgroundColor,
  darkBackgroundColor,
  lightBorderColor,
  darkBorderColor,
  multiline = false,
  numberOfLines = 1,
  ...rest
}: ThemedTextInputProps) => {
  const dimensions = useWindowDimensions();
  const textColor = useThemeColor(
    { light: lightTextColor, dark: darkTextColor },
    'text'
  );

  const backgroundColor = useThemeColor(
    { light: lightBackgroundColor, dark: darkBackgroundColor },
    'background'
  );

  const borderColor = useThemeColor(
    { light: lightBorderColor, dark: darkBorderColor },
    'border'
  );

  let maxWidth: any = 'auto';

  if (Platform.OS === 'ios' && dimensions.width > dimensions.height && dimensions.height < 600) {
    maxWidth = extraIcon ? dimensions.width - 112 : dimensions.width - 88;
  } else {
    maxWidth = extraIcon ? dimensions.width - 42 : 'auto';
  }

  const styles = StyleSheet.create({
    default: {
      borderRadius: 7,
      borderWidth: 2,
      borderStyle: 'solid',
      fontFamily: 'Arial',
      height: 'auto',
      minWidth: 350,
      maxWidth,
      width: maxWidth,
      paddingHorizontal: Platform.OS === 'web' ? 0 : 4,
      paddingVertical: 4,
    },
  });
  
  return (
    <TextInput
      multiline={multiline}
      numberOfLines={numberOfLines}
      style={[
        { color: textColor, backgroundColor, borderColor },
        styles.default,
        style,
      ]}
      {...rest}
    />
  );
};
