/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../../src/App';

import renderer, {act, create} from 'react-test-renderer';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../../src/reducer';
import {sayBye} from '../../src/utils';
import Axios from 'axios';

const store = createStore(reducer, {msg: 'default msg!'});
const tree = create(
  <Provider store={store}>
    <App />
  </Provider>,
);

jest.mock('../../src/utils');

//test for change of ui
// 1. true -> ui not change at all
// 2. false -> ui change something -> fail test -> if changes acceptable -> npm test -u
test('snapshot', () => {
  expect(tree).toMatchSnapshot();
});

it('renders correctly', () => {
  renderer.create(<App />);
});

test('button pressed', () => {
  //mocking
  const mock = 'ABC';
  sayBye.mockReturnValue(mock);

  //verify
  const button = tree.root.findByProps({testID: 'btn-test'}).props;
  act(() => button.onPress());

  const text = tree.root.findByProps({testID: 'tv-test'}).props;
  expect(text.children).toEqual(mock);
});

test('async task', () => {
  //mocking
  const mock = 'ABC';
  sayBye.mockReturnValue(mock);

  //run
  act(() => jest.runAllTimers());

  //verify
  const text = tree.root.findByProps({testID: 'tv-test'}).props;
  expect(text.children).toEqual(mock);
});

test('reducer work properly', () => {
  expect(store.getState().msg).toEqual('default msg!');
});

test('test axios', () => {
  const mock = 'success';
  Axios.request.mockImplementation(() => Promise.resolve({data: {msg: mock}}));

  //run
  act(() => jest.runAllTimers());

  const text = tree.root.findByProps({testID: 'tv-test'}).props;
  expect(text.children).toEqual(mock);
});
