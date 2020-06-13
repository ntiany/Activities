import React, { useState, useEffect, Fragment } from 'react';
import './styles.css';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { IActivity } from "../models/activity"
import NavBar from '../../feature/nav/nav';
import ActivityDashboard from '../../feature/activities/dashboard/ActivityDashboard';

const App = () => {
    const [activities, setActivities] = useState<IActivity[]>([]);

    useEffect(() => {
        axios
            .get<IActivity[]>('http://localhost:59409/api/activities')
            .then((response) => {
                setActivities(response.data);
            });
    }, []);

    return (
        <Fragment>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
                <ActivityDashboard activities={activities}/>
            </Container>
        </Fragment>
        );}

export default App;
 