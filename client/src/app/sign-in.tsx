import React, { useEffect, useState } from 'react';
import {
  Button,
  Platform,
  ScrollView,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';
import { router, Stack } from 'expo-router';

import { useSession } from '@/ctx';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { styles } from '@/styles';
import { StatusBar } from 'expo-status-bar';
import { getTotalWidth } from '@/util/jsxUtil';

const SignIn = () => {
  const { height, width } = useWindowDimensions();
  const { errors, signIn } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(false);

  const theme = useColorScheme() ?? 'light';

  const locStyles = getTotalWidth(width, height, 200);

  // Enable the submit button when all fields are valid
  useEffect(() => {
    let pwValid = true;
    if (!password) {
      pwValid = false;
    }

    if (email?.length > 3 && pwValid) {
      setValid(true);
    } else {
      setValid(false);
    }

  }, [email, password]);

  return (
    <>
      <Stack.Screen options={{ title: 'Login' }} />
      <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
      <ThemedView style={[styles.flex1]}>
        <ScrollView
          scrollEnabled
          nestedScrollEnabled
          contentContainerStyle={[
            styles.container,
            locStyles.totalWidth,
            { marginTop: Platform.OS !== 'web' ? 40 : 0 },
          ]}
        >
          <ThemedView style={[styles.container, styles.containerPadding]}>
            <ThemedText style={styles.header}>Login</ThemedText>
            <ThemedText style={styles.header2}>
              Welcome to the Expo Template.
            </ThemedText>
            <ThemedText style={styles.bodyTextSmallPad}>
              Please enter your email below to begin the signin process.
            </ThemedText>
            <ThemedView style={styles.inputView}>
              <ThemedText style={styles.inputText}>Email:</ThemedText>
              <ThemedTextInput
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                onChangeText={setEmail}
                spellCheck={false}
                value={email}
              />
            </ThemedView>
            <ThemedView
              style={styles.inputView}
            >
              <ThemedText style={[styles.inputText]}>
                Password:
              </ThemedText>
              <ThemedTextInput
                autoComplete="password"
                autoCorrect={false}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                spellCheck={false}
              />
            </ThemedView>
            <ThemedText style={styles.bodyText}>{errors}</ThemedText>
            <ThemedView style={[styles.buttonView, styles.jrow]}>
              <ThemedView style={styles.buttonWidth}>
                <Button
                  title="Submit"
                  disabled={!valid}
                  onPress={() => {
                    signIn({ email, password });
                  }}
                ></Button>
              </ThemedView>
              <ThemedView style={styles.buttonWidth}>
                <Button
                  title="Register"
                  onPress={() => {
                    router.replace('/register');
                  }}
                ></Button>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </>
  );
};

export default SignIn;
