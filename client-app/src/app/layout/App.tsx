import React, { useEffect, Fragment, useContext } from 'react';
import './styles.css';
import NavBar from '../../feature/nav/NavBar';
import ActivityDashboard from '../../feature/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent'
import ActivityStore from '../stores/ActivityStore';
import { observer } from "mobx-react-lite";
import { Container } from 'semantic-ui-react';

const App = () => {
    const activityStore = useContext(ActivityStore);

    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore]);

    if (activityStore.loadingInitial) return <LoadingComponent content="Loading activities..."/>;

    return (
        <Fragment>
            <NavBar/>
            <Container style={{ marginTop: '7em' }}>
                <ActivityDashboard/>
            </Container>
        </Fragment>
        );}

export default observer(App);
 