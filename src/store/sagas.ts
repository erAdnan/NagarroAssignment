import {all, take, cancel, fork, delay, put, race} from 'redux-saga/effects';
import {sagas as appSagas} from '@src/app/sagas';
import {sagas as loginSagas} from '@src/screens/login/saga';
import {sagas as dashboardSagas} from '@src/screens/dashboard/saga';
import * as z from 'zod';
import {Task} from 'redux-saga';

function* sagas() {
  yield all([
    timer('minute', 60),
    ...appSagas(),
    ...loginSagas(),
    ...dashboardSagas(),
  ]);
}

export function* timer(name: string, seconds: number) {
  try {
    do {
      const {stop} = yield race({
        delay: delay(seconds * 1000),
        stop: take(`timer/${name}/cancel`),
      });
      if (stop) {
        return;
      }
      yield put({type: `timer/${name}/tick`});
    } while (true);
  } finally {
    yield put({type: `timer/${name}/stop`});
  }
}

function createCancelableSaga(saga: z.infer<z.ZodAny>) {
  if (process.env.NODE_ENV !== 'development') {
    return saga;
  } else {
    return function* () {
      const sagaTask: Task = yield fork(saga);

      yield take(CANCEL_SAGAS_HMR);
      yield cancel(sagaTask);
    };
  }
}

const CANCEL_SAGAS_HMR = 'CANCEL_SAGAS_HMR';

const sagaManager = {
  startSagas(sagaMiddleware: {run: (arg0: any) => void}) {
    const saga = createCancelableSaga(sagas);
    sagaMiddleware.run(saga);
  },

  cancelSagas(store: {dispatch: (arg0: {type: string}) => void}) {
    store.dispatch({
      type: CANCEL_SAGAS_HMR,
    });
  },
};

export default sagaManager;
