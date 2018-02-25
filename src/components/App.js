import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Articles from './routes/Articles';
import NotFound from './routes/NotFound';
import CommentsScreen from './routes/CommentsScreen';
import UserForm from './UserForm';
import Counter from './Counter';
import Filters from './Filters';
import {Switch, Route, Redirect, NavLink} from  'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import history from '../history';

export default class App extends Component{
    static childContextTypes={
        user: PropTypes.string
    }

    getChildContext(){
        return {
            user: this.state.username
        }
    }

    state={
        username:''
    }

    handleUserChange=(username) => this.setState({username})
    
    render(){
        return(
            <ConnectedRouter history={history}>
                <div>
                    <div>
                        <h2>Main menu</h2>
                        <div><NavLink activeStyle={{color:'red'}} to="/counter">Counter</NavLink></div>
                        <div><NavLink activeStyle={{color:'red'}} to="/filters">Filters</NavLink></div>
                        <div><NavLink activeStyle={{color:'red'}} to="/articles">Articles</NavLink></div>
                    </div>
                    <UserForm value={this.state.username} onChange={this.handleUserChange}/>
                    <Switch>
                        <Route path="/counter" component={Counter} />
                        <Route path="/filters" component={Filters} />
                        <Route path="/articles" component={Articles} />
                        <Route path="/comments" component={CommentsScreen} />
                        //<Redirect from='/comments/' to='/comments/1' />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </div>
            </ConnectedRouter>
        )
    }
}