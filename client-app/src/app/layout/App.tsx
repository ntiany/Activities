import React, { Fragment } from 'react';
import './styles.css';
import NavBar from '../../feature/nav/NavBar';
import ActivityDashboard from '../../feature/activities/dashboard/ActivityDashboard';
import { Container } from 'semantic-ui-react';
import { Route, withRouter, RouteComponentProps, Switch } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import HomePage from '../../feature/home/HomePage';
import ActivityForm from '../../feature/activities/form/ActivityForm';
import ActivityDetails from '../../feature/activities/details/ActivityDetails';
import NotFound from './NotFound';
import { ToastContainer } from 'react-toastify'
import LoginForm from '../../feature/user/LoginForm';


const App: React.FC<RouteComponentProps> = ({location}) => {


    return (
        <Fragment>
            <ToastContainer position='bottom-right' />
            <Route exact path='/' component={HomePage}/>
            <Route path={'/(.+)'} render={() => (
                
                <Fragment>
                    <NavBar />
                    <Container style={{ marginTop: '7em' }}>
                        <Switch>
                            <Route path='/activities/:id' component={ActivityDetails} />
                            <Route exact path='/activities' component={ActivityDashboard} />
                            <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
                            <Route path='/login' component={LoginForm} />
                            <Route component={NotFound} />
                        </Switch>
                    </Container>
                </Fragment>
                )} />
        </Fragment>
        );}

export default withRouter(observer(App));
  