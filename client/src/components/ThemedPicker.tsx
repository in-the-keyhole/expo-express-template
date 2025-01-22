import React from 'react';
import {
  StyleSheet,
  Platform,
  useColorScheme,
  ViewProps,
  Pressable,
  GestureResponderEvent,
  useWindowDimensions,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker, { DropDownDirectionType } from 'react-native-dropdown-picker';

import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedView } from './ThemedView';
import { getMobilePickerItems, getWebPickerItems } from '@/util/jsxUtil';
import { styles } from '@/styles';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ThemedIcon } from './ThemedIcon';

export type ThemedPickerProps = ViewProps & {
  value?: string;
  setValue: (val: string) => void;
  items?: any;
  pickerOpen?: boolean;
  setPickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  extraIcon?: IconProp;
  onExtraIconPress?:
    | ((event: GestureResponderEvent) => void)
    | null
    | undefined;
  dropDownDirection?: DropDownDirectionType;
  zIndex?: number;
  zIndexInverse?: number;
  lightTextColor?: string;
  darkTextColor?: string;
  lightBackgroundColor?: string;
  darkBackgroundColor?: string;
  lightBorderColor?: string;
  darkBorderColor?: string;
};

export const ThemedPicker = ({
  style,
  value,
  setValue,
  items,
  pickerOpen = false,
  setPickerOpen,
  extraIcon,
  onExtraIconPress,
  dropDownDirection = 'TOP',
  zIndex,
  zIndexInverse,
  lightTextColor,
  darkTextColor,
  lightBackgroundColor,
  darkBackgroundColor,
  lightBorderColor,
  darkBorderColor,
  ...rest
}: ThemedPickerProps) => {
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

  const theme = useColorScheme() ?? 'light';

  let maxWidth: any = 'auto';

  if (Platform.OS === 'ios' && dimensions.width > dimensions.height && dimensions.height < 600) {
    maxWidth = extraIcon ? dimensions.width - 112 : dimensions.width - 88;
  } else {
    maxWidth = extraIcon ? dimensions.width - 42 : 'auto';
  }

  const locStyles = StyleSheet.create({
    pickerView: {
      borderRadius: 7,
      borderWidth: 2,
      borderStyle: 'solid',
      fontFamily: 'Arial',
      height: 'auto',
      minWidth: 350,
      maxWidth: 350,
      paddingHorizontal: 0,
      paddingVertical: 4,
    },
    mobilePickerView: {
      height: Platform.OS === 'android' ? 40 : 44,
      minWidth: maxWidth,
      maxWidth,
      marginTop: Platform.OS === 'android' ? 4 : 0,
      marginBottom: Platform.OS === 'android' ? 8 : 0,
    },
    mobilePickerViewExtraIcon: {
      height: Platform.OS === 'android' ? 40 : 44,
      minWidth: maxWidth,
      maxWidth,
      marginTop: Platform.OS === 'android' ? 4 : 0,
      marginBottom: Platform.OS === 'android' ? 8 : 0,
    },
    picker: {
      marginVertical: 1,
      borderWidth: 0,
      minWidth: 346,
      maxWidth: 346,
    },
    pickerExtraIcon: {
      marginVertical: 1,
      borderWidth: 0,
      minWidth: 315,
      maxWidth: 315,
    },
    pickerIconStyle: {
      marginLeft: 8,
      marginRight: 7,
      marginTop: Platform.OS === 'android' ? 20 : 15,
    },
  });
  
  return (
    <>
      {Platform.OS === 'web' ? (
        <ThemedView
          style={[
            { color: textColor, backgroundColor, borderColor },
            locStyles.pickerView,
            styles.jrow,
            style,
          ]}
        >
          <Picker
            style={[
              {
                color: textColor,
                backgroundColor,
                borderColor,
                paddingVertical: theme === 'dark' ? 4 : 0,
              },
              extraIcon ? locStyles.pickerExtraIcon : locStyles.picker,
            ]}
            itemStyle={
              theme === 'light'
                ? {
                    backgroundColor,
                    color: textColor,
                  }
                : {}
            }
            selectedValue={value}
            onValueChange={(itemValue, itemIndex) => setValue(itemValue)}
          >
            <Picker.Item
              key="empty"
              value=""
              label=""
              style={
                theme === 'light'
                  ? {
                      backgroundColor,
                      color: textColor,
                    }
                  : {}
              }
            />
            {getWebPickerItems(items, theme, styles)}
          </Picker>
          {extraIcon && (
            <Pressable onPress={onExtraIconPress} style={styles.sidebarIcon}>
              <ThemedIcon icon={extraIcon} size={18} />
            </Pressable>
          )}
        </ThemedView>
      ) : (
        <ThemedView style={styles.jrow}>
          <DropDownPicker
            open={pickerOpen}
            value={value ?? null}
            setOpen={setPickerOpen}
            items={getMobilePickerItems(items)}
            containerStyle={
              extraIcon
                ? locStyles.mobilePickerViewExtraIcon
                : locStyles.mobilePickerView
            }
            multiple={false}
            setValue={(value: any) => {
              // why do they pass us a function???
              setValue(value());
            }}
            // @ts-ignore
            theme={theme.toUpperCase()}
            closeAfterSelecting
            dropDownDirection={dropDownDirection}
            zIndex={zIndex}
            zIndexInverse={zIndexInverse}
          />
          {extraIcon && (
            <Pressable onPress={onExtraIconPress} style={locStyles.pickerIconStyle}>
              <ThemedIcon icon={extraIcon} size={18} />
            </Pressable>
          )}
        </ThemedView>
      )}
    </>
  );
};
