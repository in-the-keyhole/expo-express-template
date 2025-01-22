/**
 * Copyright © 2024-2025 Boardman Enterprises, LLC
 * All rights reserved.
 */

import { CategoryType } from "@/types";

class Category {
  name: string;
  categoryType: CategoryType;

  constructor(
    name = "",
    categoryType: CategoryType = 'other',
  ) {
    this.name = name;
    this.categoryType = categoryType;
  }

  asJsonStr() {
    return JSON.stringify(this);
  }

  toJson() {
    return JSON.stringify(this);
  }

  populate(jsonObj: any) {
    this.name = jsonObj.name;
    this.categoryType = jsonObj.categoryType;
    return this;
  }

  load(jsonstr: string) {
    if (jsonstr && jsonstr.length > 0) {
      const jsonObj = JSON.parse(jsonstr);
      this.populate(jsonObj);
    }

    return this;
  }
}

export { Category };
