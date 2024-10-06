import {HttpResponse} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';

import {CacheService} from './cache.service';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root',
})
export class CacheNativeService extends CacheService {
  configService = inject(ConfigService);

  private readonly cache = new Map<string, HttpResponse<unknown>>();

  get(params: string): HttpResponse<unknown> | null {
    const value = this.cache.get(params);
    if (value === undefined) {
      return null;
    }
    this.cache.delete(params);
    this.cache.set(params, value);
    return value;
  }

  set(params: string, httpResponse: HttpResponse<unknown>) {
    if (this.cache.size === this.configService.cacheMaxSize) {
      const keyIterator = this.cache.keys().next();
      this.cache.delete(keyIterator.value);
    }
    this.cache.set(params, httpResponse);
  }
}
