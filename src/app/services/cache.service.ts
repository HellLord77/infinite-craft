import {HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export abstract class CacheService {
  abstract get(params: string): HttpResponse<unknown> | null;

  abstract set(params: string, httpResponse: HttpResponse<unknown>): void;
}
