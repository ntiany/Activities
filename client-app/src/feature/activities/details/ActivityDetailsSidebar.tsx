﻿import React, { Fragment } from 'react'
import { Segment, List, Label, Item, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IAttendee } from '../../../app/models/activity';

interface IProps {
    attendees: IAttendee[]
}

const ActivityDetailsSidebar: React.FC<IProps> = ({ attendees }) => {
    const isHost = false;
    return (<Fragment>
                <Fragment>
                    <Segment
                        textAlign='center'
                        style={{ border: 'none' }}
                        attached='top'
                        secondary
                        inverted
                        color='teal'>
                        {attendees.length} {attendees.length === 1 ? 'person' : 'people'} going
                    </Segment>
                    <Segment attached>
                        <List relaxed divided>
                            {attendees.map((attendee) => (
                        <Item key={attendee.username} style={{ position: 'relative' }}>
                            {isHost &&
                            <Label
                                style={{ position: 'absolute' }}
                                color='orange'
                                ribbon='right' 
                            >
                                Host
                        </Label>}
                            <Image size='tiny' src={attendee.image || '/assets/avatar.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Item.Header as='h3'>
                                    <Link to={`/profile/${attendee.username}`}>{attendee.displayName}</Link>
                                </Item.Header>
                                <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
                            </Item.Content>
                        </Item>
                        ))}
                        </List>
                    </Segment>
                </Fragment>

            </Fragment>);
}

export default ActivityDetailsSidebar;