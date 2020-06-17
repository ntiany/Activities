﻿import React, {useState, FormEvent, useContext, useEffect} from 'react'
import { Button, Segment, Form, Grid, TextArea } from 'semantic-ui-react';
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../../app/stores/ActivityStore';
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from 'react-router-dom';
import {Form as FinalForm, Field} from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaComp from '../../../app/common/form/TextAreaComp';
import SelectInput from '../../../app/common/form/SelectInput';
import { category } from '../../../app/common/options/categoryOptions';


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
                                <Field name="description" rows={4} placeholder="Description" value={activity.description} component={TextAreaComp}/>
                                <Field name="category" placeholder="Category" value={activity.category} options={category} component={SelectInput}/>
                                <Field name="date" placeholder="Date" value={activity.date} component={TextInput} />
                                <Field name="city" placeholder="City" value={activity.city} component={TextInput} />
                                <Field name="venue" placeholder="Venue" value={activity.venue} component={TextInput}/>
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