import {testSaga} from 'redux-saga-test-plan';
import {timer} from '../sagas';
import {take, delay} from 'redux-saga/effects';
import {it, describe, expect, afterAll} from '@jest/globals';

describe('app sagas', () => {
  it('update timer', () => {
    const saga = testSaga(timer, 'test', 0);
    const delayFn = delay(0);
    const takeFn = take('timer/test/cancel');
    const payload = {
      type: 'timer/test/tick',
    };
    const stopPayload = {
      type: 'timer/test/stop',
    };
    expect(
      saga
        .next()
        .race({delay: delayFn, stop: takeFn})
        .next({stop: false})
        .put(payload)
        .next()
        .race({delay: delayFn, stop: takeFn})
        .next({stop: true})
        .put(stopPayload)
        .next().isDone,
    ).not.toThrow();
  });
});

afterAll(() => {
  jest.runAllTicks();
});
