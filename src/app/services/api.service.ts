import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {Element} from '../models/element.model';
import {Result} from '../models/result.model';

@Injectable()
export abstract class ApiService {
  abstract pair(element1: Element, element2: Element): Observable<Result>;
}
