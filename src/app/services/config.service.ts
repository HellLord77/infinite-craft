import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  readonly cacheMaxSize = 1024;

  // readonly apiBaseUrl = 'https://neal.fun/api/infinite-craft';
  readonly apiBaseUrl = 'http://localhost:8000';
  readonly apiPairUrl = `${this.apiBaseUrl}/pair`;

  readonly particleIsEnabled = true;
  readonly particleMinFrameInterval = 15;
  readonly particleMaxFrameInterval = 30;
  readonly particleMinParticleCount = 150;
  readonly particleMaxParticleLineCount = 3;
  readonly particleMaxInstanceLineCount = 7;
  readonly particleMaxLineLength = 250;
}
