import {Injectable} from '@angular/core';
import {concatMap, first, from, map, Observable, ReplaySubject} from 'rxjs';
import {createDbWorker, WorkerHttpvfs} from 'sql.js-httpvfs';
import {SplitFileConfig} from 'sql.js-httpvfs/dist/sqlite.worker';

import {environment} from '../../environments/environment';
import {Element, get, toResult} from '../models/element.model';
import {Result} from '../models/result.model';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ApiLocalService extends ApiService {
  private readonly config: SplitFileConfig = {
    from: 'inline',
    config: {
      serverMode: 'full',
      requestChunkSize: 4096,
      url: environment.apiLocalUrl,
    },
  };
  private readonly query = `
  SELECT
    result.text,
    result.emoji
  FROM
    pair
    JOIN element AS first ON first_id = first.id
    JOIN element AS second ON second_id = second.id
    JOIN element AS result ON result_id = result.id
  WHERE
    first.text = ?
    AND second.text = ?;
  `;
  private readonly worker$ = new ReplaySubject<WorkerHttpvfs>();

  constructor() {
    super();

    from(createDbWorker([this.config], 'sqlite.worker.js', 'sql-wasm.wasm')).subscribe((worker) => {
      this.worker$.next(worker);
    });
  }

  pair(element1: Element, element2: Element): Observable<Result> {
    if (element1.text > element2.text) {
      return this.pair(element2, element1);
    }

    return this.worker$.pipe(
      first(),
      concatMap(
        (worker) =>
          worker.db.query(this.query, [element1.text, element2.text]) as Promise<Element[]>,
      ),
      map((result) => {
        return result.length ? result[0] : get();
      }),
      map((element) => {
        return toResult(element);
      }),
    );
  }
}
