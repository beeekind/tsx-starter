const byId = (state={}, action) => {
    switch (action.type) {
        case 'FETCH_TODOS_SUCCESS':
            const nextState = { ...state };
            action.response.forEach(todo => {
                nextState[todo.id] = todo;
            });
            return nextState;

        case 'ADD_TODO_SUCCESS':
            return {
                ...state,
                [action.response.id]: action.response,
            };

        case 'TOGGLE_TODO_SUCCESS':
            console.log(2, state[action.id]);
            state[action.id].completed = !state[action.id].completed;
            console.log(4, state[action.id]);
            return state;

        default:
            return state
    }
};

export const getTodo = (state, id) => state[id];
export default byId;