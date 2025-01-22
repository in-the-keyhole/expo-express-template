/**
 * Copyright © 2024-2025 Boardman Enterprises, LLC
 * All rights reserved.
 */

import { CategoryType } from '@/types';
import { Category } from './category';

class Categories {
  id: number | undefined;
  profileId: number | undefined;
  categories: Category[];

  constructor(profileId = undefined, id = undefined, categories = []) {
    this.id = id;
    this.profileId = profileId;
    this.categories = categories;
  }

  asJsonStr() {
    return JSON.stringify(this);
  }

  toJson() {
    return JSON.stringify(this);
  }

  populate(jsonObj: any) {
    this.id = jsonObj.id;
    this.profileId = jsonObj.profileId;
    const cats: Category[] = [];
    if (jsonObj.categories && jsonObj.categories.length > 0) {
      jsonObj.categories.forEach((tx: any) => {
        cats.push(new Category().populate(tx));
      });
    }

    this.categories = cats;

    return this;
  }

  load(jsonstr: string) {
    if (jsonstr && jsonstr.length > 0) {
      this.populate(JSON.parse(jsonstr));
    }

    return this;
  }

  findCategory(cat: string) {
    const chosenCat = this.categories.find((c) => c.name === cat);
    return chosenCat;
  }

  addCategory(cat: Category) {
    this.categories.push(cat);
  }

  updateCategory(oldCatName: string, catName: string, catType: CategoryType) {
    const chosenCat = this.findCategory(oldCatName);
    if (chosenCat) {
      chosenCat.name = catName;
      chosenCat.categoryType = catType;
    }
  }

  removeCategory(catName: string) {
    this.categories = this.categories.filter((val) => val.name !== catName);
  }
}

export default Categories;
