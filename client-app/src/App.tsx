import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

class App extends Component {
    state = {
        values: []
    }

    componentDidMount() {
        axios.get('http://localhost:59409/api/Values')
            .then((response) => {
                this.setState({
                    values: response.data
                });
            });
    }

    render() {
        return (
            <div>
                <Header as='h2' icon='users' content='Users' />
                <List>
                    {this.state.values.map((value: any) => 
                        (<List.Item key={value.id}>{value.name}</List.Item>
                        ))}

                </List>
            </div>
        );}
}

export default App;
