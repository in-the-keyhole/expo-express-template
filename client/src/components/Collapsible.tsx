import { PropsWithChildren } from 'react';
import { Platform, StyleSheet, useWindowDimensions } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { styles } from '@/styles';

export function Collapsible({
  children,
  isOpened = false,
}: PropsWithChildren & { isOpened: boolean }) {
  const { height, width } = useWindowDimensions();
  let left = width - 210;
  let top = 70;

  if (Platform.OS === 'ios' && width > height && height < 600) {
    left = width - 280;
    top = 80;
  } else if (Platform.OS !== 'web') {
    top = 90;
  }

  const locStyles = StyleSheet.create({
    collapsibleLeftPos: {
      left,
      top,
    },
  });

  return (
    isOpened && (
      <ThemedView
        style={[styles.collapsibleContent, locStyles.collapsibleLeftPos]}
      >
        {children}
      </ThemedView>
    )
  );
}
