import {environment as defaultEnvironment} from './environment';
import {Environment} from './environment.interface';

export const environment: Environment = {
  ...defaultEnvironment,

  cacheStorage: false,
  cacheNativeMaxSize: 0,
};
