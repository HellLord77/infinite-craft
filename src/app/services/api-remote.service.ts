import {HttpClient, HttpParams} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {Element} from '../models/element.model';
import {Result} from '../models/result.model';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ApiRemoteService extends ApiService {
  httpClient = inject(HttpClient);
  private readonly pairUrl!: string;

  constructor() {
    super();

    const baseUrl: string | null = document.URL.includes('localhost')
      ? null
      : prompt('apiBaseUrl', environment.apiRemoteBaseUrl);
    this.pairUrl = `${baseUrl || environment.apiRemoteBaseUrl}/pair`;
  }

  pair(element1: Element, element2: Element): Observable<Result> {
    const params = new HttpParams().set('first', element1.text).set('second', element2.text);
    return this.httpClient.get<Result>(this.pairUrl, {params: params});
  }
}
