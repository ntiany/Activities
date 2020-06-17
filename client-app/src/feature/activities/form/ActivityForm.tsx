﻿import React, {useState, FormEvent, useContext, useEffect} from 'react'
import { Button, Segment, Form, Grid } from 'semantic-ui-react';
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../../app/stores/ActivityStore';
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from 'react-router-dom';
import {Form as FinalForm, Field} from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';


interface DetailParams {
    id: string
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {
    const activityStore = useContext(ActivityStore);
    const {
        createActivity,
        editActivity,
        submitting,
        activity: initialFormState,
        loadActivity,
        clearActivity
    }
    = activityStore;

    const [activity, setActivity] = useState<IActivity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
            if (match.params.id && activity.id.length === 0) {
                loadActivity(match.params.id).then(() => initialFormState && setActivity(initialFormState!)
                );
            }

            return () => {
                clearActivity();
            }
        },
        [loadActivity, match.params.id, clearActivity, initialFormState, activity.id.length]);

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setActivity({ ...activity, [name]: value });

    }

    const handleFinalFormSubmit = (values: any) => {

    }

    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <FinalForm
                        onSubmit={handleFinalFormSubmit}
                        render={({ handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <Field name="title" placeholder="Title" value={activity.title} component={TextInput}/>
                                <Form.TextArea onChange={handleInputChange} name="description" placeholder="Description" value={activity.description} />
                                <Form.Input onChange={handleInputChange} name="category" placeholder="Category" value={activity.category} />
                                <Form.Input onChange={handleInputChange} name="date" type="datetime-local" placeholder="Date" value={activity.date} />
                                <Form.Input onChange={handleInputChange} name="city" placeholder="City" value={activity.city} />
                                <Form.Input onChange={handleInputChange} name="venue" placeholder="Venue" value={activity.venue} />
                                <Button loading={submitting} floated="right" positive type="submit" content="Submit" />
                                <Button onClick={() => history.push('/activities')} floated="right" type="button" content="Cancel" />
                            </Form>
                        )}>
                    </FinalForm>
                </Segment>
            </Grid.Column>
        </Grid>
    );
};

export default observer(ActivityForm);