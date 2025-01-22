import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
} from 'react';
import { Platform } from 'react-native';
import { router } from 'expo-router';
import storage from '@/storage';

import {
  RegData,
  SigninData,
} from '@/types';

const AuthContext = createContext<{
  registration: (data: RegData) => void;
  signIn: (data: SigninData) => void;
  signOut: () => void;
  setSession: (token: string | null) => void;
  setRegister: (val: boolean) => void;
  setIsLoading: (val: boolean) => void;
  setErrors: (val: string | null) => void;
  setMessages: (val: string | null) => void;
  register: boolean;
  session?: string | null;
  isLoading: boolean;
  errors: string;
  messages: string;
}>({
  registration: (data: RegData) => null,
  signIn: (data: SigninData) => null,
  signOut: () => null,
  setSession: (token: string | null) => null,
  setRegister: (val: boolean) => null,
  setIsLoading: (val: boolean) => null,
  setErrors: (val: string | null) => null,
  setMessages: (val: string | null) => null,
  register: false,
  session: null,
  isLoading: false,
  errors: '',
  messages: '',
});

// This hook can be used to access the user info.
const useSession = () => {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
};

const setOrClearString = (key: string, val: string | null) => {
  if (val) {
    storage.set(key, val);
  } else {
    storage.delete(key);
  }
};

const STORAGE_REGISTER = 'expo-template-register';
const STORAGE_TOKEN = 'expo-template-token';

const SessionProvider = ({ children }: PropsWithChildren) => {
  const [register, changeRegister] = useState(
    storage.getBoolean(STORAGE_REGISTER) ?? false
  );
  const [session, changeSession] = useState<string | null>(
    storage.getString(STORAGE_TOKEN) ?? null
  );

  // Transient values
  const [isLoading, changeIsLoading] = useState(false);
  const [errors, changeErrors] = useState<string | null>(null);
  const [messages, changeMessages] = useState<string | null>(null);

  const createHeaders = (withSession = true) => {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    let token = session;
    if (!token) {
      token = storage.getString('token') ?? null;
    }

    if (token) {
      // @ts-ignore
      headers['Authorization'] = token ?? '';
    }

    return headers;
  };

  let api;

  if (Platform.OS === 'web') {
    api =
      process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test'
        ? location?.origin ?? 'your prod website here'
        : 'http://localhost:5002';
  } else {
    api =
      process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test'
        ? 'your prod website here'
        : 'http://localhost:5002';
  }

  const setIsLoading = (val: boolean) => {
    changeIsLoading(val);
  };

  const setErrors = (val: string | null) => {
    changeErrors(val);
  };

  const setMessages = (val: string | null) => {
    changeMessages(val);
  };

  const setRegister = (val: boolean) => {
    storage.set(STORAGE_REGISTER, val);
    changeRegister(val);
  };

  const setSession = (val: string | null) => {
    setOrClearString(STORAGE_TOKEN, val);
    changeSession(val);
  };

  // The setTimeout functions from here down allow the setIsLoading(true)
  // to complete, displaying the loading screen while the remote call
  // is being made.

  const registration = (data: RegData) => {
    setErrors('');
    setMessages('');
    setIsLoading(true);

    setTimeout(async () => {
      // Call registration. Here's an example.

      // const response = await fetch(`${api}/api/v1/register`, {
      //   mode: 'cors',
      //   method: 'POST',
      //   headers: createHeaders(false),
      //   body: JSON.stringify({
      //     data,
      //   }),
      // });

      // if (!response.ok) {
      //   setRegister(false);
      // } else {
      //   const apiResponse = await response.json();
      //   if (apiResponse.status === constants.STATUS_CODE_SUCCESS) {
      //     setSession(apiResponse.data.token);
      //     setRegister(true);
      //   } else if (apiResponse.status === constants.STATUS_CODE_PENDING) {
      //     // verify email, one-time pw or auth token
      //   }
      // }

      setSession('12345');
      setRegister(true);

      setIsLoading(false);
    }, 100);
  };

  const signIn = (data: SigninData) => {
    setErrors('');
    setMessages('');
    setIsLoading(true);

    setTimeout(async () => {
      // call Login here. Here's an example.

      // const response = await fetch(`${api}/api/v1/login`, {
      //   mode: 'cors',
      //   method: 'POST',
      //   headers: createHeaders(false),
      //   body: JSON.stringify({
      //     data,
      //   }),
      // });
  
      // if (!response.ok) {
      //   setSession(null);
      // } else {
      //   const apiResponse = await response.json();
      //   if (apiResponse.status === constants.STATUS_CODE_SUCCESS) {
      //     setSession(apiResponse.data.token);
      //     setRegister(false);
  
      //     let msgs = '';
      //     apiResponse.messages?.forEach((msg: any) => {
      //       msgs += msg.join(':');
      //     });
  
      //     setMessages(msgs);
      //     router.push('/');
      //   } else if (apiResponse.status === constants.STATUS_CODE_PENDING) {
      //     // one-time pw or auth token processing
      //   } else {
      //     let errs = '';
      //     apiResponse.errors?.forEach((err: any) => {
      //       errs += err.join(':');
      //     });
  
      //     setErrors(errs);
      //   }
      // }

      setSession('12345');
      setRegister(false);
      router.push('/');

      setIsLoading(false);
    }, 100);
  };

  const signOut = () => {
    setErrors('');
    setMessages('');
    setRegister(false);

    setTimeout(async () => {
      // Call logout. Here's an example.

      // const response = await fetch(`${api}/api/v1/logout`, {
      //   mode: 'cors',
      //   method: 'POST',
      //   headers: createHeaders(),
      // });

      setSession(null);
      router.dismissAll();
      router.push('/sign-in');
    }, 100);
  };

  return (
    <AuthContext.Provider
      value={{
        setIsLoading,
        setErrors,
        setMessages,
        setRegister,
        registration,
        signIn,
        signOut,
        setSession,

        register,
        session,
        isLoading,
        errors: errors ?? '',
        messages: messages ?? '',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { SessionProvider, useSession };
