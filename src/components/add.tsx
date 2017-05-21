import * as React from 'react';
import { connect } from 'react-redux';
import { addTodoAction } from '../actions';

const addTodo = class extends React.Component<any, any> {
    render(){
        let input;
        return <div>
            <input ref={ node => {
                input = node;
            }} />
            <button onClick={() => {
                this.props.dispatch(addTodoAction(input.value));
                input.value = '';
            }}>
                Add Todo
            </button>
        </div>
    }
};

const AddTodo = connect()(addTodo);

export default AddTodo;