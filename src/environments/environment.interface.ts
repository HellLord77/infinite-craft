export interface Environment {
  readonly dataKey: string;

  readonly apiRemote: boolean;
  readonly apiLocalUrl: string;
  readonly apiRemoteBaseUrl: string;

  readonly cacheStorage: boolean;
  readonly cacheNativeMaxSize: number;

  readonly soundHowler: boolean;

  readonly particlesMinFrameInterval: number;
  readonly particlesMaxFrameInterval: number;
  readonly particlesMinParticleCount: number;
  readonly particlesMaxParticleLineCount: number;
  readonly particlesMaxInstanceLineCount: number;
  readonly particlesMaxLineLength: number;

  readonly itemsInnerMaxElementCount: number;

  readonly instancesMaxTouchScrollAngle: number;

  readonly instanceMarginX: number;
  readonly instanceMarginY: number;
}
