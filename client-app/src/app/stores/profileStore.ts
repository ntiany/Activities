import { RootStore } from "./rootStore";
import { IProfile } from "../models/profile";
import { observable, action, runInAction, computed } from "mobx";
import agent from "../api/agent";

export default class ProfileStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable profile: IProfile | null = null;
    @observable profileLoading = true;
    @observable photoUploading = false;

    @computed
    get isCurrentUser() {
        if (this.rootStore.userStore.user && this.profile) {
            return this.rootStore.userStore.user!.username === this.profile.userName;
        } else {
            return false;
        }
    }

    @action loadProfile = async (username: string) => {
        this.profileLoading = true;
        try {
            const profile = await agent.Profiles.get(username);
            runInAction(() => {
                this.profile = profile;
                this.profileLoading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.profileLoading = false;
            });
            console.log(error);
        }
    }

    @action uploadPhoto = async (file: Blob) => {
        this.photoUploading = true;
        try {
            const photo = await agent.Profiles.uploadPhoto(file);
            runInAction(() => {
                    if (this.profile) {
                        this.profile.photos.push(photo);
                        if (photo.isMain && this.rootStore.userStore.user) {
                            this.rootStore.userStore.user!.image = photo.url;
                            this.profile.image = photo.url;
                        }
                    }
                    this.photoUploading = false;
                }
            );
        } catch (error) {
            console.log(error);
            runInAction(() => {
                    this.photoUploading = false;
                }
            );
        }
    }
}