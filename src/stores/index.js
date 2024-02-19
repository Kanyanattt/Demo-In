import React, { Component, createContext, useContext } from "react";
import DataStore from "./dataStore";


export class Store {
  constructor() {
    this.dataStore = new DataStore();
  }
}

const StoreTmp = new Store();
const StoreContext = createContext(StoreTmp);

export const useStore = () => useContext(StoreContext);
export const getStore = () => StoreTmp;