import { handleActions, Action } from 'redux-actions';
// import { AppState } from '@models';
import { AppState } from '@domains';

const app = handleActions<AppState, any>(
  {},

  new AppState()
);

export default app;
