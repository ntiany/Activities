﻿import { RootStore } from "./rootStore";
import { action, observable } from "mobx";


export default class CommonStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable token: string | null = null;
    @observable appLoaded = false;

    @action setToken = (token: string) => {
        window.localStorage.setItem('jwt', token);
        this.token = token;
    }

    @action setAppLoaded = () => {
        this.appLoaded = true;
    }
}