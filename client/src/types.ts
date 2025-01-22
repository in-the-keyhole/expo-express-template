/**
 * Copyright © 2024-2025 Boardman Enterprises, LLC
 * All rights reserved.
 */

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
