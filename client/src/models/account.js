/**
 * Copyright © 2024-2025 Boardman Enterprises, LLC
 * All rights reserved.
 */

import Decimal from 'decimal.js';
import Transaction from "@/models/transaction";

class Account {
  constructor(
    profileId = undefined,
    name = '',
    companyName = '',
    displayCurrentBalance = '0.00',
    retirement = false,
    hidden = false,
    accountType = '',
    url = '',
    status = '',
    id = undefined,
    transactions = []
  ) {
    this.id = id;
    this.profileId = profileId;
    this.name = name;
    this.companyName = companyName;
    this.retirement = retirement;
    this.hidden = hidden;
    this.accountType = accountType;
    this.url = url;
    this.status = status;
    this.transactions = transactions;
    this.currentBalance = new Decimal(0);
    this.displayCurrentBalance = displayCurrentBalance;
  }

  asJsonStr() {
    return JSON.stringify(this);
  }

  toJson() {
    return JSON.stringify(this);
  }

  populateNoTx(jsonObj) {
    this.id = jsonObj.id;
    this.profileId = jsonObj.profileId;
    this.name = jsonObj.name;
    this.companyName = jsonObj.companyName;
    this.displayCurrentBalance = jsonObj.displayCurrentBalance;
    this.retirement = jsonObj.retirement;
    this.hidden = jsonObj.hidden;
    this.accountType = jsonObj.accountType;
    this.url = jsonObj.url;
    this.status = jsonObj.status;
    return this;
  }

  loadNoTx(jsonstr) {
    if (jsonstr && jsonstr.length > 0) {
      jsonObj = JSON.parse(jsonstr);
      this.populateNoTx(jsonObj);
    }

    return this;
  }

  populate(jsonObj) {
    this.populateNoTx(jsonObj);
    let txs = jsonObj.transactions;
    txs.forEach((t) => {
      const tx = new Transaction();
      tx.populate(t);
      this.transactions.push(tx);
    });

    return this;
  }

  load(jsonstr) {
    if (jsonstr && jsonstr.length > 0) {
      const jsonObj = JSON.parse(jsonstr);
      this.populate(jsonObj);
    }

    return this;
  }
}

export default Account;
