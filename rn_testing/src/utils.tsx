import {track} from './analytics';

export function addNumber(x, y) {
  return x + y;
}

export function testMockFuction(name) {
  return track(name);
}

export function sayBye() {
  return 'Bye';
}
