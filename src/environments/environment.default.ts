import {Environment} from './environment.interface';

export const environment: Environment = {
  dataKey: 'infinite-craft-data',
  dataDefaultDarkMode: true,
  dataDefaultMuted: false,

  apiRemote: true,
  apiLocalUrl: 'data.sqlite',
  apiRemoteBaseUrl: 'http://localhost:8000',

  cacheStorage: true,
  cacheNativeMaxSize: 1024,

  soundHowler: false,

  particlesMinFrameInterval: 15,
  particlesMaxFrameInterval: 30,
  particlesMinParticleCount: 150,
  particlesMaxParticleLineCount: 3,
  particlesMaxInstanceLineCount: 7,
  particlesMaxLineLength: 250,

  itemsInnerMaxElementCount: 200,

  instancesMaxTouchScrollAngle: 0.7,

  instanceMarginX: 6,
  instanceMarginY: 18,
};
