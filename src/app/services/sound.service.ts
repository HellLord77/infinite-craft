import {Injectable} from '@angular/core';

@Injectable()
export abstract class SoundService {
  abstract isMuted(): boolean;
  abstract toggleMuted(): void;
  abstract playInstance(volume?: number): void;
  abstract playReward(): void;
  abstract playDelete(): void;
  abstract playError(): void;
  abstract playDiscovery(): void;
}
