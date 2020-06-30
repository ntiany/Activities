import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Grid } from 'semantic-ui-react';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';
import { RootStoreContext } from '../../app/stores/rootStore';
import { RouteComponentProps } from 'react-router-dom';
import LoadingComponent from '../../app/layout/LoadingComponent';

interface RouteParams {
    username: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
}

const ProfilePage: React.FC<IProps> = ({match}) => {
    const rootStore = useContext(RootStoreContext);
    const { profileLoading, profile, loadProfile, follow, unfollow, isCurrentUser, photoLoading, setActiveTab } = rootStore.profileStore;

    useEffect(() => {
        loadProfile(match.params.username);
    }, [loadProfile, match]);

    if (profileLoading) return <LoadingComponent content="Loading profile..."/>;

    return (
        <Grid>
            <Grid.Column width={16}>
                <ProfileHeader profile={profile!} isCurrentUser={isCurrentUser} follow={follow} unfollow={unfollow} loading={photoLoading}/>
                <ProfileContent setActiveTab={setActiveTab}/>
            </Grid.Column>
        </Grid>
    );
}

export default observer(ProfilePage)