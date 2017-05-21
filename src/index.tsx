import * as ReactDOM from 'react-dom';
import * as React from 'react';
import{ configureStore } from './reducers';

import Root from './components';

const store = configureStore();

ReactDOM.render(
    <Root store={store} />,
    document.getElementById('app')
);