import React from 'react';
import { Link, Stack } from 'expo-router';
import { Platform, StyleSheet, useColorScheme } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StatusBar } from 'expo-status-bar';

export default function NotFoundScreen() {
  const theme = useColorScheme() ?? 'light';

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
      <ThemedView style={[styles.container, { marginTop: Platform.OS === 'android' ? 40 : 0 }]}>
        <ThemedText type="title">This screen doesn't exist.</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
