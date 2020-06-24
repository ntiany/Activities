import React from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button } from 'semantic-ui-react';
import TextInput from '../../app/common/form/TextInput';
import { observer } from 'mobx-react-lite';

const LoginForm = () => {
    return (
        <FinalForm
            onSubmit={(values) => console.log(values)}
            render={({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <Field name="email" component={TextInput} placeholder="email" />
                    <Field name="password" component={TextInput} placeholder="password" type="password" />
                    <Button positive content="Login"/>
                </Form>)}>
        </FinalForm >);

}

export default observer(LoginForm)