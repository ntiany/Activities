import { RootStore } from "./rootStore";
import { IProfile, IPhoto } from "../models/profile";
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
    @observable photoLoading = false;

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

    @action setMain = async (photo: IPhoto) => {
        this.photoLoading = true;
        try {
            await agent.Profiles.setMain(photo.id);
            runInAction(() => {
                this.rootStore.userStore.user!.image = photo.url;
                this.profile!.photos.find(x => x.isMain)!.isMain = false;
                this.profile!.photos.find(x => x.id === photo.id)!.isMain = true;
                this.profile!.image = photo.url;
                this.photoLoading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.photoLoading = false;
            });
        }
    }

    @action deletePhoto = async (photo: IPhoto) => {
        this.photoLoading = true;
        try {
            await agent.Profiles.deletePhoto(photo.id);
            runInAction(() => {
                this.profile!.photos = this.profile!.photos.filter(a => a.id !== photo.id);
                this.photoLoading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.photoLoading = false;
            });
        }
    }

    @action updateProfile = async (profile: Partial<IProfile>) => {
        try {
            await agent.Profiles.updateProfile(profile);
            runInAction(() => {
                if (profile.displayName !== this.rootStore.userStore.user!.displayName) {
                    this.rootStore.userStore.user!.displayName = profile.displayName!;
                }
                this.profile = { ...this.profile!, ...profile }
            });
        } catch (error) {
            console.log(error);
        }
    }

    @action follow = async (username: string) => {
        this.photoLoading = true; 
        try {
            await agent.Profiles.follow(username);
            runInAction(() => {
                this.profile!.following = true;
                this.profile!.followersCount++;
                this.photoLoading = false;
            });

        } catch (error) {
            console.log("Problem following user");
            runInAction(() => {
                this.photoLoading = false;
            });
        }
    }

    @action unfollow = async (username: string) => {
        this.photoLoading = true;
        try {
            await agent.Profiles.unfollow(username);
            runInAction(() => {
                this.profile!.following = false;
                this.profile!.followersCount--;
                this.photoLoading = false;
            });

        } catch (error) {
            console.log("Problem unfollowing user");
            runInAction(() => {
                this.photoLoading = false;
            });
        }
    }
}