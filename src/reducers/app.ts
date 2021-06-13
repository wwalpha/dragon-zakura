import { handleActions, Action } from 'redux-actions';
// import { AppState } from '@models';
import { AppState } from '@domains';
import { ActionTypes } from '@constants';
import { App01Payload, App02Payload } from '@actions/app';

const app = handleActions<AppState, any>(
  {
    [ActionTypes.APP_PLUS_REQUEST]: (state: AppState) => state,
    [ActionTypes.APP_PLUS_SUCCESS]: (state: AppState, { payload: { num } }: Action<App01Payload>) => state.plus(num),
    [ActionTypes.APP_PLUS_FAILURE]: (state: AppState) => state,

    [ActionTypes.APP_MINUS_REQUEST]: (state: AppState) => state,
    [ActionTypes.APP_MINUS_SUCCESS]: (state: AppState, { payload: { num } }: Action<App02Payload>) => state.minus(num),
    [ActionTypes.APP_MINUS_FAILURE]: (state: AppState) => state,
  },

  new AppState()
);

export default app;
