import {HttpEvent} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';

import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  configService = inject(ConfigService);

  private readonly cache = new Map<string, HttpEvent<unknown>>();

  get(url: string): HttpEvent<unknown> | undefined {
    const value = this.cache.get(url);
    if (value !== undefined) {
      this.cache.delete(url);
      this.cache.set(url, value);
    }
    return value;
  }

  set(url: string, event: HttpEvent<unknown>) {
    if (this.cache.size === this.configService.cacheMaxSize) {
      const keyIterator = this.cache.keys().next();
      this.cache.delete(keyIterator.value);
    }
    this.cache.set(url, event);
  }
}
