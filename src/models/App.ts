import { Record } from 'immutable';

export interface IApp extends AppProps, Record<AppProps> {
  get<K extends keyof AppProps>(key: K): AppProps[K];
}

export interface AppUIProps {}

export interface AppProps extends AppUIProps {
  // count
  count: number;
}

/**
 * App
 */
export default class AppState extends Record<AppProps>({
  count: 0,
}) {
  plus(num: number) {
    return this.set('count', this.count + num);
  }

  // inner update
  minus(num: number) {
    return this.set('count', this.count - num);
  }
}
