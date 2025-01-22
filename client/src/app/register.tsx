import React, { useEffect, useState } from 'react';
import {
  Button,
  Platform,
  ScrollView,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';
import { Link, router, Stack } from 'expo-router';
import Checkbox from 'expo-checkbox';
import * as constants from '@/constants';
import { cleanPhoneNumber } from '@/util/util';

import { useSession } from '@/ctx';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedPicker } from '@/components/ThemedPicker';
import { styles } from '@/styles';
import { StatusBar } from 'expo-status-bar';
import { getTotalWidth } from '@/util/jsxUtil';

const Register = () => {
  const { height, width } = useWindowDimensions();

  const { messages, session, registration, setMessages } = useSession();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailOptIn, setEmailOptInChecked] = useState(false);
  const [sortOrder, setSortOrder] = useState(constants.SORT_UP);
  const [valid, setValid] = useState(false);
  const [password, setPassword] = useState('');
  const [valPassword, setValPassword] = useState('');
  const [sortOrderPickerOpen, setSortOrderPickerOpen] = useState(false);

  const theme = useColorScheme() ?? 'light';

  const locStyles = getTotalWidth(width, height, 200);

  // Enable the submit button when all fields are valid
  useEffect(() => {
    const cleanedPhone = cleanPhoneNumber(phone);

    if (
      firstName &&
      lastName &&
      email.length > 3 &&
      cleanedPhone.length === 10 &&
      sortOrder &&
      password.length >= 8 &&
      password === valPassword
    ) {
      setMessages('');
      setValid(true);
    } else {
      setMessages('Please enter all fields. Password must be at least 8 characters.');
      setValid(false);
    }
  }, [firstName, lastName, email, phone, sortOrder, password, valPassword]);

  useEffect(() => {
    if (session) {
      router.replace('/');
    }
  }, [session]);

  return (
    <>
      <Stack.Screen options={{ title: 'Registration' }} />
      <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
      <ThemedView style={styles.flex1}>
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
            <ThemedText style={styles.header}>Registration</ThemedText>
            <ThemedText style={styles.header2}>
              Welcome to the Expo Template App.
            </ThemedText>
            <ThemedText style={styles.bodyText}>
              Please (fake) Register to continue!
            </ThemedText>
            <ThemedView style={styles.inputView}>
              <ThemedText style={styles.inputText}>First name:</ThemedText>
              <ThemedTextInput
                autoComplete="given-name"
                value={firstName}
                onChangeText={setFirstName}
              />
            </ThemedView>
            <ThemedView style={styles.inputView}>
              <ThemedText style={styles.inputText}>Last name:</ThemedText>
              <ThemedTextInput
                autoComplete="family-name"
                value={lastName}
                onChangeText={setLastName}
              />
            </ThemedView>
            <ThemedView style={styles.inputView}>
              <ThemedText style={styles.inputText}>Email:</ThemedText>
              <ThemedTextInput
                autoComplete="email"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </ThemedView>
            <ThemedView style={styles.inputView}>
              <ThemedText style={styles.inputText}>Phone:</ThemedText>
              <ThemedTextInput
                autoComplete="tel"
                value={phone}
                onChangeText={setPhone}
              />
            </ThemedView>
            <ThemedView style={styles.inputView}>
              <ThemedText style={styles.inputText} >
                Password:
              </ThemedText>
              <ThemedTextInput
                autoComplete="password-new"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </ThemedView>
            <ThemedView style={styles.inputView}>
              <ThemedText style={styles.inputText}>
                Validate Password:
              </ThemedText>
              <ThemedTextInput
                autoComplete="password-new"
                value={valPassword}
                onChangeText={setValPassword}
                secureTextEntry
              />
            </ThemedView>
            <ThemedView style={styles.checkboxView}>
              <ThemedText style={styles.checkboxText}>
                Email Opt-In:
              </ThemedText>
              <Checkbox
                style={styles.checkbox}
                value={emailOptIn}
                onValueChange={setEmailOptInChecked}
              />
            </ThemedView>
            <ThemedView style={styles.inputView}>
              <ThemedText style={styles.inputText}>
                Sort Order:
              </ThemedText>
              <ThemedPicker
                value={sortOrder}
                setValue={setSortOrder}
                pickerOpen={sortOrderPickerOpen}
                setPickerOpen={setSortOrderPickerOpen}
                items={constants.SORT_ORDER}
              />
            </ThemedView>
            <ThemedView style={styles.inputView}>
              <ThemedText>{messages}</ThemedText>
            </ThemedView>
            <ThemedView style={styles.buttonWidth}>
              <Button
                title="Submit"
                disabled={!valid}
                onPress={() => {
                  const cleanedPhone = cleanPhoneNumber(phone);

                  registration({
                    firstName,
                    lastName,
                    email,
                    phone: cleanedPhone,
                    emailOptIn,
                    sortOrder,
                    password,
                  });
                }}
              />
            </ThemedView>
            <ThemedText style={styles.bodyText}>
              Already have an account?{' '}
              <Link replace href="/sign-in">
                Login instead
              </Link>
            </ThemedText>
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </>
  );
};

export default Register;
