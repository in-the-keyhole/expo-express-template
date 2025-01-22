import React, { ReactNode, useState } from 'react';
import { Redirect, Stack, useRouter } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import {
  faArrowRightFromBracket,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

import { useSession } from '@/ctx';
import { Collapsible } from '@/components/Collapsible';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { styles } from '@/styles';
import { ThemedIcon } from '@/components/ThemedIcon';
import { useThemeColor } from '@/hooks/useThemeColor';

const AppLayout = () => {
  const { session, isLoading, signOut } = useSession();
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);
  const theme = useColorScheme() ?? 'light';

  const backgroundColor = useThemeColor(
    { light: 'white', dark: '#151718' },
    'background'
  );

  const headerTintintColor = useThemeColor(
    { light: '#0a7ea4', dark: '#151718' },
    'headerTint'
  );

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return (
      <ThemedView style={styles.containerCenter}>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  // Redirect to signin screen if the user isn't signed in
  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  const createCollapsibleMenuItem = (
    title: string,
    icon: any,
    action: () => void
  ): ReactNode => {
    return (
      <Pressable
        onPress={() => {
          action();
        }}
      >
        <ThemedView style={styles.headerRow}>
          <ThemedView style={styles.headerIcon}>
            <ThemedIcon
              // @ts-ignore
              icon={icon}
              size={18}
            />
          </ThemedView>
          <ThemedText style={styles.headerText}>{title}</ThemedText>
        </ThemedView>
      </Pressable>
    );
  };

  // This layout can be deferred because it's not the root layout.
  return (
    <>
      <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
      {session && (
        <Collapsible isOpened={showMore}>
          <ThemedView style={styles.headerContent}>
            {createCollapsibleMenuItem(
              'Logout',
              faArrowRightFromBracket,
              () => {
                signOut();
              }
            )}
          </ThemedView>
        </Collapsible>
      )}
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTintColor: headerTintintColor,
            headerShown: true,
            headerShadowVisible: theme === 'dark',
            headerStyle: {
              backgroundColor,
            },
            headerTitle: '',
            headerRight: (props) => (
              <Pressable
                onPressIn={() => {
                  setShowMore(!showMore);
                }}
                style={styles.jrow}
              >
                <ThemedView
                  style={[
                    styles.headerButtonView,
                    styles.headerButton,
                    styles.headerRow,
                  ]}
                >
                  <ThemedText style={styles.headerText}>More</ThemedText>
                  <ThemedView style={styles.headerIcon}>
                    <ThemedIcon icon={faChevronDown} size={18} />
                  </ThemedView>
                </ThemedView>
              </Pressable>
            ),
            headerLeft: (props) => (
              <ThemedView
                style={[styles.headerButtonView, styles.headerButton]}
              >
                <Pressable
                  onPressIn={() => {
                    // When the user presses the Home button,
                    // most sites route to the root page
                    router.push('/');
                  }}
                >
                  <ThemedView style={styles.headerRow}>
                    <ThemedText style={styles.headerText}>
                      Expo Template
                    </ThemedText>
                  </ThemedView>
                </Pressable>
              </ThemedView>
            ),
          }}
        />
      </Stack>
    </>
  );
};

export default AppLayout;
