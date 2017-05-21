import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AddTodo from './add';
import VisibleTodoList from './list';
import Footer from './footer';

const App = () => {
    return <div>
               <AddTodo/>
               <VisibleTodoList/>
               <Footer/>
           </div>
};

const Root = ({ store }) => {
    return <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/:filter" component={App}/>
                <Route path="/" component={App}/>
            </Switch>
        </BrowserRouter>
    </Provider>
};

export default Root;