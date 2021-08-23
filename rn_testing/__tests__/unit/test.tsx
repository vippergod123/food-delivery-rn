import 'react-native';
import React from 'react';
import App from '../../src/App';
import {addNumber, testMockFuction} from '../../src/utils';
import {track} from '../../src/analytics';

// Note: test renderer must be required after react-native.

test('add numbers', () => {
  expect(addNumber(1, 2)).toBeDefined();
});

jest.mock('../../src/analytics');

test('test with mocking', () => {
  const name = 'mocking';
  track.mockReturnValue(name);

  expect(testMockFuction(name)).toEqual(name);
  expect(track).toBeCalledWith(name);
});
