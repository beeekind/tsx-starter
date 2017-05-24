import { combineReducers } from 'redux';

const createList = (filter) => {
    const ids = (state = [], action) => {
        switch(action.type){
            case 'FETCH_TODOS_SUCCESS':
                return filter === action.filter ?
                    action.response.map(todo => todo.id) :
                    state;

            case 'ADD_TODO_SUCCESS':
                return filter !== 'completed' ?
                    [...state, action.response.id] :
                    state;

            case 'TOGGLE_TODO_SUCCESS':
                return [...state, action.response.id];

            default:
                return state
        }
    };

    const isFetching = (state = false, action) => {
        if (action.filter !== filter){
            return state;
        }

        switch (action.type){
            case 'FETCH_TODOS_REQUEST':
                return true;
            case 'FETCH_TODOS_SUCCESS':
                return false;
            case 'FETCH_TODOS_FAILURE':
                return false;
            default:
                return state
        }
    };

    const errorMessage = (state = null, action) => {
        if (filter !== action.filter) {
            return state;
        }

        switch (action.type){
            case 'FETCH_TODOS_FAILURE':
                return action.message;
            default:
                return state;
        }
    };

    return combineReducers({ ids, isFetching, errorMessage })
};

// private selectors
export const listByFilter = combineReducers({
    all: createList('all'),
    active: createList('active'),
    completed: createList('completed')
});

export const getIsFetching = (state) => state.isFetching;
export const getErrorMessage = (state) => state.errorMessage;
export const getIds = (state) => state.ids;

export default listByFilter;