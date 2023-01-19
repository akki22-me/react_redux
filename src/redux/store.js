import {createStore,applyMiddleware,combineReducers} from 'redux';
import userreducer from './reducer/allreducer';

const thunkmiddleware = require('redux-thunk').default;

const mainReducer=combineReducers(
    {
        user:userreducer
    }
)

const store =createStore(mainReducer,applyMiddleware(thunkmiddleware));

export default store;    