import { Record } from 'immutable';
import { IApp } from './App';

export interface IState {
  // App共通設定
  app: IApp;
}

export interface State extends Map<keyof IState, Record<any>> {
  get<K extends keyof IState>(key: K): IState[K];
}

export { default as AppState } from './App';
