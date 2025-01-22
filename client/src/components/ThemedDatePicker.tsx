import React, { createElement } from 'react';
import { StyleSheet, Platform, useColorScheme, ViewProps, Pressable, useWindowDimensions } from 'react-native';
import { DateTime } from 'luxon';
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';

import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedView } from './ThemedView';
import { styles } from '@/styles';
import { ThemedTextInput } from './ThemedTextInput';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { ThemedIcon } from './ThemedIcon';

export type ThemedDatePickerProps = ViewProps & {
  value: string;
  setDateCreated: React.Dispatch<React.SetStateAction<string>>;
  onDateChange: any;
  onDatePicked: ((event: DateTimePickerEvent, date?: Date) => void) | undefined;
  showDatePicker?: boolean;
  setShowDatePicker: React.Dispatch<React.SetStateAction<boolean>>;
  lightBorderColor?: string;
  darkBorderColor?: string;
};

export const ThemedDatePicker = ({
  style,
  value,
  setDateCreated,
  onDateChange,
  onDatePicked,
  showDatePicker = false,
  setShowDatePicker,
  lightBorderColor,
  darkBorderColor,
  ...rest
}: ThemedDatePickerProps) => {
  const dimensions = useWindowDimensions();
  const borderColor = useThemeColor(
    { light: lightBorderColor, dark: darkBorderColor },
    'border'
  );

  const theme = useColorScheme() ?? 'light';

  const createWebDateInput = (onChange: any, value: string) => {
    return createElement('input', {
      type: 'date',
      autoComplete: 'off',
      onChange,
      value,
      style: {
        colorScheme: theme,
        borderColor,
        ...locStyles.pickerView,
      },
    });
  };

  const locStyles = StyleSheet.create({
    pickerView: {
      minWidth: 346,
      maxWidth: dimensions.width - 42,
      paddingTop: 4,
      paddingBottom: 4,
      borderRadius: 7,
      borderWidth: 2,
      borderStyle: 'solid',
    },
  });
  
  return (
    <>
      {Platform.OS === 'web' ? (
        createWebDateInput(onDateChange, value)
      ) : (
        <>
          {showDatePicker && Platform.OS === 'ios' && (
            <RNDateTimePicker
              value={DateTime.fromFormat(value, 'yyyy-MM-dd').toJSDate()}
              onChange={onDatePicked}
            />
          )}

          <ThemedView style={styles.jrow}>
            <ThemedTextInput
              value={value}
              onChangeText={setDateCreated}
              extraIcon
            />
            <Pressable
              onPress={() => {
                if (Platform.OS === 'ios') {
                  setShowDatePicker(true);
                } else {
                  DateTimePickerAndroid.open({
                    value: DateTime.fromFormat(
                      value,
                      'yyyy-MM-dd'
                    ).toJSDate(),
                    onChange: onDatePicked,
                  });
                }
              }}
              style={styles.sidebarIcon}
            >
              <ThemedIcon
                icon={faCalendar}
                size={18}
              />
            </Pressable>
          </ThemedView>
        </>
      )}
    </>
  );
};
