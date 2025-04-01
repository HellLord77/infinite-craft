import {HttpClient, HttpParams} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {Element} from '../models/element.model';
import {Result} from '../models/result.model';
import {ApiService} from './api.service';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root',
})
export class ApiRemoteService extends ApiService {
  private readonly pairUrl!: string;

  httpClient = inject(HttpClient);
  configService = inject(ConfigService);

  constructor() {
    super();

    const baseUrl: string | null = prompt('apiBaseUrl', this.configService.apiBaseUrl);
    this.pairUrl = `${baseUrl || this.configService.apiBaseUrl}/pair`;
  }

  pair(element1: Element, element2: Element): Observable<Result> {
    const params = new HttpParams().set('first', element1.text).set('second', element2.text);
    return this.httpClient.get<Result>(this.pairUrl, {params: params});
  }
}
