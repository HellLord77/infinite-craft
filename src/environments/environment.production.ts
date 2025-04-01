import {environment as defaultEnvironment} from './environment.default';
import {Environment} from './environment.interface';

export const environment: Environment = {
  ...defaultEnvironment,

  apiRemote: false,

  soundHowler: true,
};
