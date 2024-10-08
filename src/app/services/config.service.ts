import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  readonly dataKey = 'infinite-craft-data';

  readonly soundHowler = true;

  readonly cacheStorage = true;
  readonly cacheMaxSize = 1024;

  // readonly apiBaseUrl = 'https://neal.fun/api/infinite-craft';
  readonly apiBaseUrl = 'http://localhost:8000';

  readonly particlesMinFrameInterval = 15;
  readonly particlesMaxFrameInterval = 30;
  readonly particlesMinParticleCount = 150;
  readonly particlesMaxParticleLineCount = 3;
  readonly particlesMaxInstanceLineCount = 7;
  readonly particlesMaxLineLength = 250;

  readonly itemsInnerMaxElementCount = 200;

  readonly instancesMaxTouchScrollAngle = 0.7;

  readonly instanceMarginX = 6;
  readonly instanceMarginY = 18;
  readonly instanceMaxTouchHoldDistance = 10;
}
