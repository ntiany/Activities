import React, { useContext } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button } from 'semantic-ui-react';
import TextInput from '../../app/common/form/TextInput';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IUserFormValues } from '../../app/models/user';

const LoginForm = () => {
    const rootStore = useContext(RootStoreContext);
    const { login } = rootStore.userStore;

    return (
        <FinalForm
            onSubmit={(values: IUserFormValues) => login(values)}
            render={({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <Field name="email" component={TextInput} placeholder="email" />
                    <Field name="password" component={TextInput} placeholder="password" type="password" />
                    <Button positive content="Login"/>
                </Form>)}>
        </FinalForm >);

}

export default observer(LoginForm)