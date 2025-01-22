export interface BaseState {
  session?: string | null;
  isLoading: boolean;
  isRegistered: boolean;
}

export interface RegData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  emailOptIn: boolean;
  sortOrder: string;
  password?: string;
}

export interface SigninData {
  email?: string;
  password?: string;
}
