import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  readonly dataKey = 'infinite-craft-data';

  readonly cacheMaxSize = 1024;

  // readonly apiBaseUrl = 'https://neal.fun/api/infinite-craft';
  readonly apiBaseUrl = 'http://localhost:8000';

  readonly particlesIsEnabled = true;
  readonly particlesMinFrameInterval = 15;
  readonly particlesMaxFrameInterval = 30;
  readonly particlesMinParticleCount = 150;
  readonly particlesMaxParticleLineCount = 3;
  readonly particlesMaxInstanceLineCount = 7;
  readonly particlesMaxLineLength = 250;
}
