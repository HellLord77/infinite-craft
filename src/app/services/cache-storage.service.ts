import {HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {CacheService} from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class CacheStorageService extends CacheService {
  get(params: string): HttpResponse<unknown> | null {
    const value = sessionStorage.getItem(params);
    if (value === null) {
      return null;
    }

    return new HttpResponse({body: JSON.parse(value)});
  }

  set(url: string, httpResponse: HttpResponse<unknown>) {
    sessionStorage.setItem(url, JSON.stringify(httpResponse.body));
  }
}
