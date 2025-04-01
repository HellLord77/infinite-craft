import {FactoryProvider} from '@angular/core';

import {environment} from '../../environments/environment';
import {ApiService} from '../services/api.service';
import {ApiLocalService} from '../services/api-local.service';
import {ApiRemoteService} from '../services/api-remote.service';

const apiServiceFactory = (): ApiService => {
  return environment.apiRemote ? new ApiRemoteService() : new ApiLocalService();
};

export const apiServiceProvider: FactoryProvider = {
  provide: ApiService,
  useFactory: apiServiceFactory,
};
