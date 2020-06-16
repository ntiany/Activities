﻿import React, { useContext } from 'react';
import { Item, Button, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ActivityStore from '../../../app/stores/ActivityStore';
import {IActivity} from "../../../app/models/activity";


const ActivityListItem: React.FC<{ activity: IActivity }> = ({ activity }) => {
    const activityStore = useContext(ActivityStore);
    const { deleteActivity, submitting, target } = activityStore;


    return ( 
        <Item key={activity.id}>
            <Item.Content>
                <Item.Header as='a'>{activity.title}</Item.Header>
                <Item.Meta>{activity.date}</Item.Meta>
                <Item.Description>
                    <div>{activity.description}</div>
                    <div>{activity.city}, {activity.venue}</div>
                </Item.Description>
                <Item.Extra>
                    <Button
                        as={Link} to={`/activities/${activity.id}`}
                        floated='right'
                        content='View'
                        color='blue' />
                    <Button
                        name={activity.id}
                        loading={target === activity.id && submitting}
                        onClick={(e) => deleteActivity(e, activity.id)}
                        floated='right'
                        content='Delete' color='red' />
                    <Label basic content={activity.category} />
                </Item.Extra>
            </Item.Content>
        </Item >
    )
}

export default ActivityListItem