/**
 * Copyright © 2024-2025 Boardman Enterprises, LLC
 * All rights reserved.
 */

import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

class Split {
  constructor(description = '', category = '', amount = '', uuid = uuidv4()) {
    this.description = description;
    this.category = category;
    this.amount = amount;
    this.uuid = uuid;
  }

  asJsonStr() {
    return JSON.stringify(this);
  }

  toJson() {
    return JSON.stringify(this);
  }

  populate(jsonObj) {
    this.uuid = jsonObj.uuid;
    this.description = jsonObj.description;
    this.category = jsonObj.category;
    this.amount = jsonObj.amount;
  }

  load(jsonstr) {
    if (jsonstr && jsonstr.length > 0) {
      jsonObj = JSON.parse(jsonstr);
      this.populate(jsonObj);
    }
  }
}

export default Split;
