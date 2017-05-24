import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleTodoAction, fetchTodosAction } from '../actions';
import { getVisibleTodos, getIsFetching, getErrorMessage } from '../reducers';
import { FetchError } from './error';

export const TodoView = ({ onClick, completed, text }) => {
    return <li
        onClick={onClick}
        style={{textDecoration: completed ? 'line-through' : 'none'}}
    >
        {text}
    </li>
};

export const TodoList = ({ todos, onTodoClick, filter, parent }) => {
    return <ul>
        {todos.map(todo =>
            <TodoView
                key={todo.id}
                {...todo}
                onClick={() => onTodoClick(todo.id, filter)}
            />
        )}
    </ul>
};

let VisibleTodoList = class extends React.Component<any, any>{
    componentDidMount(){
        this.fetchData()
    }

    componentDidUpdate(prevProps){
        if (this.props.filter !== prevProps.filter){
            this.fetchData()
        }
    }

    fetchData(){
        const { filter, fetchTodosAction } = this.props;
        fetchTodosAction(filter).then(() => {  });
    }

    render(){
        const { todos, isFetching, toggleTodoAction, errorMessage, filter } = this.props;

        if (isFetching && !todos.length) {
            return <p> Loading... </p>
        }

        if (errorMessage && !todos.length){
            return <FetchError
                message={errorMessage}
                onRetry={() => this.fetchData()}
            />

        }

        return <TodoList todos={todos} onTodoClick={toggleTodoAction} filter={filter} parent={this}/>
    }
};

const mapStateToProps = (state, props) => {
    const filter = props.match.params.filter || 'all';

    return {
        todos: getVisibleTodos(state, filter),
        isFetching: getIsFetching(state, filter),
        errorMessage: getErrorMessage(state, filter),
        filter: filter
    }
};

VisibleTodoList = withRouter(connect(
    mapStateToProps,
    { toggleTodoAction, fetchTodosAction }
)(VisibleTodoList));

export default VisibleTodoList;