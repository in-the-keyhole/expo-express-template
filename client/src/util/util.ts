/**
 * Copyright © 2024-2025 Boardman Enterprises, LLC
 * All rights reserved.
 */

import { DateTime } from 'luxon';
import Decimal from 'decimal.js';
import { Alert, Platform } from 'react-native';
import Account from '@/models/account';
import Transaction from '@/models/transaction';
import Split from '@/models/split';

const moneyfmt = (number: string): string => {
  // @ts-ignore make a guaranteed copy of the string
  let fmt = number.split()[0];
  let cents = '';
  const sign = number.length === 0 ? '' : number.charAt(0) === '-' ? '-' : '';

  // strip sign for now
  if (sign) {
    fmt = fmt.substring(1);
  }

  const decIndex = fmt.indexOf('.');
  // strip cents for now
  if (decIndex > -1) {
    cents = fmt.substring(decIndex);
    fmt = fmt.substring(0, decIndex);
  }

  // reverse the string
  fmt = fmt.split('').reverse().join('');
  let index = 0;

  while (index + 3 < fmt.length) {
    if (index + 3 < fmt.length) {
      fmt = fmt.substring(0, index + 3) + ',' + fmt.substring(index + 3);
      ++index;
    }

    index += 3;
  }

  // put the string back in the correct order
  fmt = fmt.split('').reverse().join('');

  // add back the sign
  if (sign) {
    fmt = '-' + fmt;
  }

  if (cents) {
    fmt = fmt + cents;
  }

  return fmt;
};

const testAmount = (amt: string): boolean => {
  let cleanedAmt = amt.replaceAll(/[^\-0-9\.]/g, '');
  if (!cleanedAmt || amt.length !== cleanedAmt.length) {
    return false;
  }

  return true;
};

const cleanAmount = (amt: string): string => {
  let cleanedAmt = amt.replaceAll(/[^\-0-9\.]/g, '');
  if (!cleanedAmt) {
    cleanedAmt = '0.00';
  }

  return cleanedAmt;
};

const cleanPhoneNumber = (phone: string): string => {
  let cleanedPhone = phone.replaceAll(/[^0-9]/g, '');
  if (cleanedPhone.startsWith('1')) {
    cleanedPhone = cleanedPhone.substring(1);
  }

  return cleanedPhone;
};

const calculateCurrentBalances = (accounts: Account[]): string => {
  let netWorth = new Decimal(0);
  accounts.forEach((account) => {
    let txForAcct = account.transactions;
    if (txForAcct && txForAcct.length > 0) {
      let currentBalance = new Decimal(0);
      let today = DateTime.now();

      txForAcct.forEach((tx: Transaction) => {
        let cleanedAmt = cleanAmount(tx.amount);
        let amt = new Decimal(cleanedAmt);
        const dtMillis = tx?.dtDateCreated?.toMillis() ?? 0;
        const todayMillis = today.toMillis();
        if (dtMillis < todayMillis) {
          currentBalance = currentBalance.add(amt);
        }
      });

      account.currentBalance = currentBalance;
      account.displayCurrentBalance = moneyfmt(currentBalance.toFixed(2));
      netWorth = netWorth.add(currentBalance);
    }
  });

  return moneyfmt(netWorth.toFixed(2));
};

const findInsertionIndexByDate = (
  transactions: Transaction[],
  newTx: Transaction,
  newTxDate: DateTime
): number => {
  let index = 0;
  transactions.forEach((tx) => {
    let txDate = DateTime.fromFormat(tx.dateCreated, 'MM/dd/yyyy');
    if (newTxDate?.toMillis() ?? 0 < txDate.toMillis()) {
      return index;
    }

    index += 1;
  });

  return index;
};

const checkSubscription = (sub: string): boolean => {
  let expired = false;

  // check for subscription expiration
  const today = DateTime.now();
  const subExp = DateTime.fromFormat(sub, 'MM/dd/yyyy');
  if (today.toMillis() > subExp.toMillis()) {
    expired = true;
  }

  return expired;
};

const getSubscription = (subscriptionType: string) => {
  let subExp = DateTime.now();
  let subscriptionCost = '0.00';

  // trial memberships expire after 30 days
  if (subscriptionType === 'TRI') {
    subExp = subExp.plus({ days: 30 });
    subscriptionCost = '0.00';
  } else if (subscriptionType === 'REG') {
    subExp = subExp.plus({ years: 1 });
    subscriptionCost = '19.99';
  } else {
    subExp = subExp.plus({ years: 1 });
    subscriptionCost = '9.99';
  }

  const expiry = subExp.toFormat('LL/dd/yyyy');
  return { subscriptionCost, expiry };
};

const sort = (a: any, b: any, prop: any) => {
  if (a[prop] < b[prop]) {
    return -1;
  }

  if (a[prop] > b[prop]) {
    return 1;
  }

  return 0;
};

const revsort = (a: any, b: any, prop: any) => {
  if (a[prop] > b[prop]) {
    return -1;
  }

  if (a[prop] < b[prop]) {
    return 1;
  }

  return 0;
};

const sortAccounts = (accounts: Account[], sortOrder: string) => {
  if (sortOrder === 'TYP') {
    // Alphabetical by Account Type Then Account Name
    accounts.sort((a, b) => sort(a, b, 'accountType'));
    accounts.sort((a, b) => sort(a, b, 'name'));
  } else if (sortOrder === 'COM') {
    // Alphabetical by Company Name Then Account Name
    accounts.sort((a, b) => sort(a, b, 'companyName'));
    accounts.sort((a, b) => sort(a, b, 'name'));
  } else if (sortOrder === 'RET') {
    // Alphabetical by Account Name Grouped By Retirement
    accounts.sort((a, b) => sort(a, b, 'retirement'));
    accounts.sort((a, b) => sort(a, b, 'name'));
  } else if (sortOrder === 'BAL') {
    // Order Increasing by Account Balance
    accounts.sort((a, b) => sort(a, b, 'currentBalance'));
  } else if (sortOrder === 'BAD') {
    // Order Decreasing by Account Balance
    accounts.sort((a, b) => revsort(a, b, 'currentBalance'));
  } else {
    // Alphabetical by Account Name
    accounts.sort((a, b) => sort(a, b, 'name'));
  }
};

const checkSplitTotal = (amount: string, splits: Split[]) => {
  let splitTotal = new Decimal(0);
  splits.forEach((e: Split) => {
    splitTotal.add(new Decimal(cleanAmount(e.amount)));
  });

  return splitTotal.equals(new Decimal(cleanAmount(amount)));
};

const platformAlert = (title: string | undefined | null, message: string) => {
  if (Platform.OS === 'web') {
    alert(message);
  } else {
    Alert.alert(title ?? '', message);
  }
};

const acctsFromJson = (accounts: string): Account[] => {
  const accts: Account[] = [];
  const jsonAccts = accounts ? JSON.parse(accounts) : [];
  jsonAccts.forEach((a: any) => {
    accts.push(new Account().populate(a));
  });

  return accts;
};

const checkForOppositeCategory = (
  cat: string,
  accountName: string | null | undefined
): string | undefined => {
  if (cat.startsWith('[') && cat.endsWith(']') && cat.length > 2) {
    const oppositeAcct = cat.substring(1, cat.length - 1);
    // Unless it is a tx into the same account
    if (oppositeAcct !== accountName) {
      return oppositeAcct;
    }
  }

  return undefined;
};

export {
  acctsFromJson,
  calculateCurrentBalances,
  checkForOppositeCategory,
  checkSplitTotal,
  checkSubscription,
  cleanAmount,
  cleanPhoneNumber,
  findInsertionIndexByDate,
  getSubscription,
  moneyfmt,
  platformAlert,
  sort,
  sortAccounts,
  testAmount,
};
