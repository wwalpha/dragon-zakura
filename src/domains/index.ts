import { AppState } from 'typings/domain';

export interface State {
  // App共通設定
  app: AppState;
}

export { default as AppState } from './App';
