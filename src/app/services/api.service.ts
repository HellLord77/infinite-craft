import {inject, Injectable} from '@angular/core';
import {Element} from '../models/element.model';
import {Observable} from 'rxjs';
import {Result} from '../models/result.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  httpClient = inject(HttpClient);
  configService = inject(ConfigService);

  pair(element1: Element, element2: Element): Observable<Result> {
    const params = new HttpParams().set('first', element1.text).set('second', element2.text);
    return this.httpClient.get<Result>(this.configService.apiPairUrl, {params: params});
  }
}
