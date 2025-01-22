/**
 * Copyright © 2024-2025 Boardman Enterprises, LLC
 * All rights reserved.
 */

class Profile {
  constructor(
    email = '',
    firstName = '',
    lastName = '',
    phone = '',
    agreedTermsOfUse = false,
    subscriptionCost = undefined,
    subscriptionType = 'TRI',
    subscriptionExpiration = undefined,
    emailVerified = false,
    id = undefined,
    phoneVerified = false,
    lastLogin = undefined,
    allowedCountries = [],
    allowedNotifications = [],
    showHidden = false,
    soundEffects = false,
    animations = false,
    oneLineDisplay = true,
    sortOrder = 'ALP',
    theme = undefined,
    tfa = false,
  ) {
    this.id = id;
    this.email = email;
    this.emailVerified = emailVerified;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.phoneVerified = phoneVerified;
    this.lastLogin = lastLogin;
    this.allowedCountries = allowedCountries;
    this.agreedTermsOfUse = agreedTermsOfUse;
    this.allowedNotifications = allowedNotifications;
    this.showHidden = showHidden;
    this.soundEffects = soundEffects;
    this.animations = animations;
    this.oneLineDisplay = oneLineDisplay;
    this.sortOrder = sortOrder;
    this.theme = theme;
    this.subscriptionCost = subscriptionCost;
    this.subscriptionType = subscriptionType;
    this.subscriptionExpiration = subscriptionExpiration;
    this.tfa = tfa;
  }

  asJsonStr() {
    return JSON.stringify(this);
  }

  toJson() {
    return JSON.stringify(this);
  }

  populate(jsonObj) {
    this.id = jsonObj.id;
    this.email = jsonObj.email;
    this.emailVerified = jsonObj.emailVerified;
    this.firstName = jsonObj.firstName;
    this.lastName = jsonObj.lastName;
    this.phone = jsonObj.phone;
    this.phoneVerified = jsonObj.phoneVerified;
    this.lastLogin = jsonObj.lastLogin;
    this.allowedCountries = jsonObj.allowedCountries;
    this.agreedTermsOfUse = jsonObj.agreedTermsOfUse;
    this.allowedNotifications = jsonObj.allowedNotifications;
    this.showHidden = jsonObj.showHidden;
    this.soundEffects = jsonObj.soundEffects;
    this.animations = jsonObj.animations;
    this.oneLineDisplay = jsonObj.oneLineDisplay === undefined ? true : jsonObj.oneLineDisplay;
    this.sortOrder = jsonObj.sortOrder;
    this.theme = jsonObj.theme;
    this.subscriptionCost = jsonObj.subscriptionCost;
    this.subscriptionType = jsonObj.subscriptionType;
    this.subscriptionExpiration = jsonObj.subscriptionExpiration;
    this.tfa = jsonObj.tfa;

    return this;
  }

  load(jsonstr) {
    if (jsonstr && jsonstr.length > 0) {
      this.populate(JSON.parse(jsonstr));
    }

    return this;
  }
}

export default Profile;
