import { Picker } from '@react-native-picker/picker';
import { Platform, StyleSheet } from 'react-native';

const getWebPickerItems = (items: any, theme: string, styles: any) => {
  return Object.keys(items).map((item, index) => {
    // @ts-ignore
    const testID = `picker-item-testid-${item}-${items[item]}`;
    return (
      <Picker.Item
        style={
          theme === 'light' ? styles.pickerItemLight : styles.pickerItemDark
        }
        // @ts-ignore
        label={items[item]}
        // @ts-ignore
        value={item}
        // @ts-ignore
        key={item}
        testID={testID}
      />
    );
  });
};

const getMobilePickerItems = (items: any) => {
  return Object.keys(items).map((item, index) => {
    return {
      label: items[item],
      value: item,
    };
  });
};

// This function helps the UI avoid rendering underneat the phone's notch
// (black area at the top) when the phone is rotated to the right. Since
// there is no API to tell which way the phone is oriented it won't help
// if a user turns their phone to the left.
const getTotalWidth = (width: number, height: number, notchWidth: number) => {
  let locStyles: any;

  if (Platform.OS !== 'ios') {
    locStyles = StyleSheet.create({
      totalWidth: {},
    });
  } else {
    let maxWidth: any = 'auto';

    if (width > height && height < 600) {
      maxWidth = width - 200;
    }

    locStyles = StyleSheet.create({
      totalWidth: {
        minWidth: maxWidth,
        maxWidth: maxWidth,
      },
    });
  }

  return locStyles;
}

export {
  getMobilePickerItems,
  getTotalWidth,
  getWebPickerItems,
}
