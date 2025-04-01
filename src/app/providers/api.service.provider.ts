import {FactoryProvider} from '@angular/core';

import {ApiService} from '../services/api.service';
import {ApiLocalService} from '../services/api-local.service';
import {ApiRemoteService} from '../services/api-remote.service';
import {ConfigService} from '../services/config.service';

const apiServiceFactory = (configService: ConfigService): ApiService => {
  return configService.apiRemote ? new ApiRemoteService() : new ApiLocalService();
};

export const apiServiceProvider: FactoryProvider = {
  provide: ApiService,
  useFactory: apiServiceFactory,
  deps: [ConfigService],
};
