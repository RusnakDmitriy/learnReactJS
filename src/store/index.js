import {createStore, applyMiddleware} from 'redux';
import reducer from '../reducer';
import logger from '../middlewares/logger';
import randomID from '../middlewares/randomID';
import api from '../middlewares/api';
import thunk from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';
import history from '../history';

const enhancer=applyMiddleware(thunk,routerMiddleware(history), logger,randomID,api);

const store=createStore(reducer,{},enhancer);

export default store