import { v4 } from 'node-uuid';

// a mock backend

export let todoFixtures = [
    { id: v4(), text: "Example 1", completed: false },
    { id: v4(), text: "Example 2", completed: true },
    { id: v4(), text: "Example 3", completed: false },
    { id: v4(), text: "Example 4", completed: true },
    { id: v4(), text: "Example 5", completed: false }
];

export const generateFixturesForState = (quantity) => {
    let state = {};

    for (let i = 0; i < quantity; i++){
        let id = v4();
        state[id] = { id: id, text: `Example ${i}`, completed: (i % 2) }
    }

    return state
};

export let todoStateFixtures = {};

export const fetchTodos = (filter: string) => {
    return new Promise(resolve => {
        setTimeout(() => {
            switch(filter) {
                case 'all':
                    return resolve(todoFixtures);
                case 'completed':
                    return resolve(todoFixtures.filter(t => t.completed));
                case 'active':
                    return resolve(todoFixtures.filter(t => !t.completed));
            }
        }, 250)
    })
};

export const addTodo = (text) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const todo = { id: v4(), text: text, completed: false };
            todoFixtures.push(todo);
            resolve(todo);
        }, 250)
    })
};

export const toggleTodo = (id) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const todo = todoFixtures.find(t => t.id === id);
            todo.completed = !todo.completed;
            resolve(todo);
        }, 250)
    })
};