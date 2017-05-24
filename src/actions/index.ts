import { fetchTodos, addTodo, toggleTodo } from '../backend';
import * as types from './constants';

export const toggleTodoAction = (id, filter) => (dispatch) => {
    return toggleTodo(id).then(
        response => {
            dispatch({
                type: types.TOGGLE_TODO_SUCCESS,
                id: id,
                filter: filter,
                response: response
            });
        }
    )
};

export const addTodoAction = (text) => (dispatch) => {
    return addTodo(text).then(
        response => {
            dispatch({
                type: types.ADD_TODO_SUCCESS,
                response: response
            })
        }
    )
};

export const fetchTodosAction = (filter) => (dispatch, getState) => {
    dispatch({
        type: types.FETCH_TODOS_REQUEST,
        filter: filter
    });

    return fetchTodos(filter).then(
        response => {
            dispatch({
                type: types.FETCH_TODOS_SUCCESS,
                filter: filter,
                response: response,
            })
        },
        error => {
            dispatch({
                type: types.FETCH_TODOS_FAILURE,
                filter: filter,
                mesage: error.message || 'Something went wrong'
            })
        }
    )
};

export const setVisibilityFilterAction = (filter: string) => {
    return { type: types.SET_VISIBILITY_FILTER, filter: filter}
};