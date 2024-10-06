import {HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {Element} from '../models/element.model';
import {Result} from '../models/result.model';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly pairUrl!: string;

  httpClient = inject(HttpClient);
  configService = inject(ConfigService);

  constructor() {
    this.pairUrl = `${this.configService.apiBaseUrl}/pair`;
  }

  pair(element1: Element, element2: Element): Observable<Result> {
    const params = new HttpParams().set('first', element1.text).set('second', element2.text);
    return this.httpClient.get<Result>(this.pairUrl, {params: params});
  }

  requestIsPair(request: HttpRequest<unknown>) {
    return request.method === 'GET' && request.url === this.pairUrl;
  }
}
