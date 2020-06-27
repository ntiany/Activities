import React, { Fragment, useContext, useEffect } from 'react';
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
import { RootStoreContext } from '../stores/rootStore';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import ProfilePage from '../../feature/profiles/ProfilePage';


const App: React.FC<RouteComponentProps> = ({location}) => {
    const rootStore = useContext(RootStoreContext);
    const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
    const { getUser } = rootStore.userStore;

    useEffect(() => {
            if (token) {
                getUser().finally(() => setAppLoaded());
            } else {
                setAppLoaded();
            }
        },
        [getUser, setAppLoaded, token]);

    if (!appLoaded) return <LoadingComponent content='Loading activities...'/>;

    return (
        <Fragment>
            <ModalContainer/>
            <ToastContainer position='bottom-right'/>
            <Route exact path='/' component={HomePage}/>
            <Route path={'/(.+)'} render={() => (
                
                <Fragment>
                    <NavBar />
                    <Container style={{ marginTop: '7em' }}>
                        <Switch>
                            <Route path='/activities/:id' component={ActivityDetails} />
                            <Route exact path='/activities' component={ActivityDashboard} />
                            <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
                            <Route path='/profile/:username' component={ProfilePage} />
                            <Route component={NotFound} />
                        </Switch>
                    </Container>
                </Fragment>
                )}/>
        </Fragment>
        );}

export default withRouter(observer(App));
  