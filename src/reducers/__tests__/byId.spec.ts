import { v4 } from 'node-uuid';
import { expect } from 'chai';
import { generateFixturesForState } from '../../backend'
import * as types from '../../actions/constants';
import byId from '../byId';

describe('byId reducer', () => {
    it('will return a default state', () => {
        expect(byId(undefined, {})).to.eql({})
    });

    it('should handle FETCH_TODOS_SUCCESS', () => {
        let initialState = generateFixturesForState(5);

        let state = byId(initialState, {
            type: types.FETCH_TODOS_REQUEST,
            filter: 'all'
        });

        expect(initialState).to.eql(state);
    });

    it('should handle ADD_TODO_SUCCESS', () => {
        let numInitialTodos = 5;
        let initialState = generateFixturesForState(numInitialTodos);

        let state = byId(initialState, {
            type: types.ADD_TODO_SUCCESS,
            response: {
                id: v4(),
                text: `Example ${numInitialTodos + 1}`,
                completed: false
            }
        });

        expect(Object.keys(state).length).to.eql(numInitialTodos + 1);
    });

    it('should handle TOGGLE_TODO', () => {
        let id = v4();
        let initialState = {
            [id]: { id: id, text: `Example 1`, completed: false }
        };

        let nextState = byId(initialState, {
            type: types.TOGGLE_TODO_SUCCESS,
            response: { id, text: 'Example 1', completed: true }
        });

        expect(initialState[id]['completed']).to.not.eql(nextState[id]['completed']);
    })
});