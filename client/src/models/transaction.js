/**
 * Copyright © 2024-2025 Boardman Enterprises, LLC
 * All rights reserved.
 */

import Decimal from 'decimal.js';
import { DateTime } from 'luxon';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import Split from '@/models/split';

class Transaction {
  constructor(
    dateCreated = '',
    checkNumber = '',
    reason = '',
    amount = '',
    commission = '',
    numberOfShares = '',
    category = '',
    comment = '',
    image = '',
    status = '',
    splits = [],
    uuid = uuidv4(),
  ) {
    this.uuid = uuid;
    this.dateCreated = dateCreated;
    this.checkNumber = checkNumber;
    this.reason = reason;
    this.amount = amount;
    this.commission = commission;
    this.numberOfShares = numberOfShares;
    this.category = category;
    this.comment = comment;
    this.image = image;
    this.status = status;
    this.splits = splits;

    // transient fields
    this.dtDateCreated = undefined;
    this.displayAmount = '';
    this.displayCommission = '';
    this.balance = new Decimal('0');
  }

  asJsonStr() {
    return JSON.stringify(this);
  }

  toJson() {
    return JSON.stringify(this);
  }

  populate(jsonObj) {
    this.uuid = jsonObj.uuid;
    this.dateCreated = jsonObj.dateCreated;
    this.dtDateCreated = DateTime.fromFormat(
      this.dateCreated, 'MM/dd/yyyy');
    this.checkNumber = jsonObj.checkNumber;
    this.reason = jsonObj.reason;
    this.amount = jsonObj.amount;
    this.commission = jsonObj.commission;
    this.numberOfShares = jsonObj.numberOfShares;
    this.category = jsonObj.category;
    this.comment = jsonObj.comment;
    this.image = jsonObj.image;
    this.status = jsonObj.status;
    const spl = jsonObj.splits;
    if (spl.length > 0) {
      spl.forEach((spObj) => {
        const sp = new Split();
        sp.populate(spObj);
        this.splits.push(sp);
      });
    }
  }

  load(jsonstr) {
    if (jsonstr && jsonstr.length > 0) {
      const jsonObj = JSON.parse(jsonstr);
      this.populate(jsonObj);
    }
  }
}

export default Transaction;
