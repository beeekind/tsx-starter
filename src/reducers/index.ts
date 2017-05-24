import { createStore, applyMiddleware, combineReducers } from 'redux';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import byId, * as fromById from './byId';
import listByFilter, * as fromList from './createList';

// selectors
export const getIsFetching = (state, filter) => {
    return fromList.getIsFetching(state.listByFilter[filter]);
};

export const getErrorMessage = (state, filter) => {
    return fromList.getErrorMessage(state.listByFilter[filter])
};

export const getVisibleTodos = (state, filter) => {
    const ids = fromList.getIds(state.listByFilter[filter]);
    return ids.map(id => fromById.getTodo(state.byId, id));
};

// compose the root reducer
const rootReducer = combineReducers({ byId, listByFilter });

const configureStore = (testing=false) => {
    const middlewares = testing ? [promise, thunk] :[createLogger(),promise,thunk ];
    return createStore(rootReducer, applyMiddleware(...middlewares));
};

export { configureStore };