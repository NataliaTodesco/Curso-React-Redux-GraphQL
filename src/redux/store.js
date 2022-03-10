import { reduceUser,restoreSessionAction } from './userDuck'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
//import thunk from 'redux-thunk';
import createSagaMiddleware from '@redux-saga/core';
import mySaga from './sagas.js'

import { reduceCharacter, getCharacterAction } from './characterDuck';

let rootReducer = combineReducers({
    user: reduceUser,
    character: reduceCharacter,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware()

export default function generateStore() {
    //let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
    let store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))
    sagaMiddleware.run(mySaga)

    getCharacterAction()(store.dispatch,store.getState)
    restoreSessionAction()(store.dispatch)
    return store
}

