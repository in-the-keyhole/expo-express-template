/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';
const steelGray = '#88888f';
const coal = 'rgba(21,23,24,1)';
const headerTintColorLight = '#0a7ea4';

export const Colors = {
  light: {
    background: '#fff',
    border: coal,
    icon:'rgb(2, 15, 25)',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    text: '#11181C',
    headerTint: headerTintColorLight,
    tint: tintColorLight,
  },
  dark: {
    background: coal,
    border: steelGray,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    text: '#ECEDEE',
    headerTint: coal,
    tint: tintColorDark,
  },
};
