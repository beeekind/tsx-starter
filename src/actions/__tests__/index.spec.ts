import * as actions from '../index';
import * as types from '../constants';
import { todoFixtures } from '../../backend'
import { expect } from 'chai';
import thunk from 'redux-thunk'

const middlewares = [thunk];
import configureStore from 'redux-mock-store';
const mockStore = configureStore(middlewares);

describe('async actions', () => {
    let todo = undefined;

    beforeAll(done => {
        const text = 'sample';
        const store = mockStore({});

        return store.dispatch(actions.addTodoAction(text))
            .then(() => {
                const dispatches = store.getActions();
                expect(dispatches.length).to.eql(1);
                const action = dispatches[0];
                expect(action.response.text).to.eql(text);
                expect(action.response.completed).to.eql(false);
                todo = action.response;
                done();

            }).catch((err) => {
                expect(err).to.eql(undefined);
                done();
            });

    });

    it('FETCH_TODOS_SUCCESS when fetchTodos fulfills', done => {
        const filter = 'all';

        const expectedActions = [
            { type: types.FETCH_TODOS_REQUEST, filter: filter },
            { type: types.FETCH_TODOS_SUCCESS, filter: filter, response: todoFixtures }
        ];

        const store = mockStore({});

        return store.dispatch(actions.fetchTodosAction(filter))
            .then(() => {
                const actions = store.getActions();
                expect(actions).to.eql(expectedActions);
                done();
            });
    });

    it('ADD_TODO_SUCCESS when addTodo fulfills', done => {
        const text = 'sample';
        const store = mockStore({});

        return store.dispatch(actions.addTodoAction(text))
            .then(() => {
                const dispatches = store.getActions();
                expect(dispatches.length).to.eql(1);
                const action = dispatches[0];
                expect(action.type).to.eql(types.ADD_TODO_SUCCESS);
                expect(action.response.text).to.eql(text);
                expect(action.response.completed).to.eql(false);
                done();
            }).catch(err => {
                expect(err).to.eql(undefined);
                done();
            });
    });

    it('SET_VISIBILITY_FILTER when setVisibilityFilterAction', () => {
        const filter = 'all';
        const store = mockStore({});

        store.dispatch(actions.setVisibilityFilterAction(filter));

        const dispatches = store.getActions();
        expect(dispatches.length).to.eql(1);
        const action = dispatches[0];
        expect(action.type).to.eql(types.SET_VISIBILITY_FILTER);
        expect(action.filter).to.eql(filter);
    });

    it('TOGGLE_TODO_SUCCESS when addToggleAction fulfills', done => {
        expect(todo).to.not.eql(undefined);
        const filter = 'all';
        const store = mockStore({});

        return store.dispatch(actions.toggleTodoAction(todo.id, filter))
            .then(() => {
                const dispatches = store.getActions();
                expect(dispatches.length).to.eql(2);
                const action = dispatches[0];
                expect(action.type).to.eql(types.TOGGLE_TODO_SUCCESS);
                expect(action.response.id).to.eql(todo.id);
                expect(action.response.completed).to.not.eql(!todo.completed);
                expect(action.filter).to.eql(filter);
                done();
            }).catch(err => {
                done(err);
            });
    })
});