import { fetchTodos, addTodo, toggleTodo } from '../backend';
import { getIsFetching } from "../reducers";

export const toggleTodoAction = (id, filter) => (dispatch) => {
    toggleTodo(id).then(
        response => {
            dispatch({
                type: 'TOGGLE_TODO_SUCCESS',
                id: id,
                filter: filter
            })
        }
    )
};

export const addTodoAction = (text) => (dispatch) => {
    addTodo(text).then(
        response => {
            dispatch({
                type: 'ADD_TODO_SUCCESS',
                response: response
            })
        }
    )
};

export const fetchTodosAction = (filter) => (dispatch, getState) => {
    if (getIsFetching(getState(), filter)){
        return Promise.resolve();
    }

    dispatch({
        type: 'FETCH_TODOS_REQUEST',
        filter: filter
    });

    return fetchTodos(filter).then(
        response => {
            dispatch({
                type: 'FETCH_TODOS_SUCCESS',
                filter: filter,
                response: response,
            })
        },
        error => {
            dispatch({
                type: 'FETCH_TODOS_FAILURE',
                filter: filter,
                mesage: error.message || 'Something went wrong'
            })
        }
    )
};

export const setVisibilityFilterAction = (filter: string) => {
    return { type: 'SET_VISIBILITY_FILTER', filter: filter}
};