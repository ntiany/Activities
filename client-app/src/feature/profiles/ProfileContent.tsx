﻿import React from 'react'
import { observer } from 'mobx-react-lite'
import { Grid, Tab } from 'semantic-ui-react';

const panes = [
    {
        menuItem: 'About',
        render: () =>
            <Tab.Pane>
                About content
            </Tab.Pane>
    },
    {
    menuItem: 'Photos',
        render: () => 
        <Tab.Pane>
            About content
        </Tab.Pane>
    },
    {
        menuItem: 'Activities',
        render: () =>
            <Tab.Pane>
                About content
            </Tab.Pane>
    },
    {
        menuItem: 'Followers',
        render: () =>
            <Tab.Pane>
                About content
            </Tab.Pane>
    },
    {
        menuItem: 'Following',
        render: () =>
            <Tab.Pane>
                About content
            </Tab.Pane>
    }
];

const ProfileContent = () => {
    return (
        <Tab
            menu={{ fluid: true, vertical: true }}
            menuPosition='right'
            panes={panes}
        />
    );
}

export default observer(ProfileContent)