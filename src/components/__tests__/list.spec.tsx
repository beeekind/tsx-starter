import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {mount, render, shallow} from 'enzyme'
import VisibleTodoList, {TodoList, TodoView} from '../list';

import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
chai.use(chaiEnzyme());

import { todoFixtures } from '../../backend';
import * as actions from '../../reducers'
import * as types from '../../actions/constants';

let store = actions.configureStore(true);

function setup() {
    const props = { match: { params: { filter: 'all' }}};


    const wrapper = mount(
        <Provider store={store}>
            <BrowserRouter>
                <VisibleTodoList/>
            </BrowserRouter>
        </Provider>
    );

    return {
        props,
        wrapper
    }
}

describe('components#VisibleTodoList', () => {
    it('renders a loading page', () => {
        const { wrapper } = setup();
        expect(wrapper.html()).to.eql('<p> Loading... </p>');
    });

    it('renders presentational views after loading', (done) => {
        const { wrapper } = setup();

        setTimeout(() => {
            wrapper.update();
            expect(wrapper).to.have['descendants'](TodoList);
            expect(wrapper).to.have['descendants'](TodoView);
            done()
        }, 400)
    });

    it('renders loaded data', (done) => {
        const { wrapper } = setup();

        let nodes = [
            '<li style="text-decoration: none;">Example 1</li>',
            '<li style="text-decoration: line-through;">Example 2</li>',
            '<li style="text-decoration: none;">Example 3</li>',
            '<li style="text-decoration: line-through;">Example 4</li>',
            '<li style="text-decoration: none;">Example 5</li>'
        ];

        setTimeout(() => {
            wrapper.update();
            expect(wrapper.find('li').nodes.length).to.eql(todoFixtures.length);

            done()
        }, 400)
    })
});