import { v4 } from 'node-uuid';
import { expect } from 'chai';
import * as types from '../../actions/constants';
import createList from '../createList';

let sampleId = v4();

let initialState = {
    all: { ids: [], isFetching: false, errorMessage: null },
    active: { ids: [], isFetching: false, errorMessage: null },
    completed: { ids: [], isFetching: false, errorMessage: null }
};

let customState = {
    all: { ids: [], isFetching: false, errorMessage: null },
    active: { ids: [], isFetching: false, errorMessage: null },
    completed: { ids: [ sampleId ], isFetching: false, errorMessage: null }
};

describe('createList reducer', () => {
    it('should return an initial state', () => {
        let state = createList(undefined, {type: types.NOOP });
        expect(state).to.eql(initialState);
    });

    it('Should handle ids#ADD_TODO_SUCCESS', () => {
        let id = v4();
        let state = createList(undefined, {
            type: types.ADD_TODO_SUCCESS,
            response : {
                id: id,
                text: 'Example 1',
                completed: false
            }
        });

        expect(state['all'].ids).to.contain(id);
    });

    it('Should handle ids#FETCH_TODOS_SUCCESS', () => {
        let state = createList(customState, {
            type: types.FETCH_TODOS_SUCCESS,
            response: [{ id: sampleId }]
        });

        expect(state['completed']['ids']).to.eql([sampleId])
    });

    it('Should handle errorMessage#FETCH_TODOS_FAILURE', () => {
        let errorMessage = "An error occurred";
        let state = createList(undefined, {
            type: types.FETCH_TODOS_FAILURE,
            filter: 'all',
            message: errorMessage
        });

        expect(state['all']['errorMessage']).to.eql(errorMessage)
    })
});
