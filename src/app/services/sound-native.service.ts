import {inject, Injectable} from '@angular/core';

import {SoundService} from './sound.service';
import {UtilityService} from './utility.service';

@Injectable({
  providedIn: 'root',
})
export class SoundNativeService extends SoundService {
  utilityService = inject(UtilityService);

  private muted = false;
  private instanceRate = 1;

  private readonly audioInstance = new Audio('assets/sounds/instance.mp3');
  private readonly audioReward = new Audio('assets/sounds/reward.mp3');
  private readonly audioDelete = new Audio('assets/sounds/delete.mp3');
  private readonly audioError = new Audio('assets/sounds/error.mp3');
  private readonly audioDiscovery = new Audio('assets/sounds/discovery.mp3');

  constructor() {
    super();

    this.audioInstance.preservesPitch = false;

    this.audioReward.volume = 0.4;
    this.audioReward.preservesPitch = false;

    this.audioDelete.volume = 0.45;

    this.audioError.volume = 0.4;

    this.audioDiscovery.volume = 0.1;
    this.audioDiscovery.playbackRate = 1.1;
    this.audioDiscovery.preservesPitch = false;
  }

  isMuted() {
    return this.muted;
  }

  toggleMuted() {
    this.muted = !this.muted;

    this.audioInstance.muted = this.muted;
    this.audioReward.muted = this.muted;
    this.audioDelete.muted = this.muted;
    this.audioError.muted = this.muted;
    this.audioDiscovery.muted = this.muted;
  }

  playInstance(volume = 0.3) {
    this.instanceRate += 0.1;
    if (this.instanceRate > 1.3) {
      this.instanceRate = 0.9;
    }

    this.audioInstance.volume = volume;
    this.audioInstance.playbackRate = this.instanceRate;
    this.audioInstance.play().catch(() => undefined);
  }

  playReward() {
    this.audioReward.playbackRate = this.utilityService.arrayRandomItem([0.9, 1])!;
    this.audioReward.play().catch(() => undefined);
  }

  playDelete() {
    this.audioDelete.play().catch(() => undefined);
  }

  playError() {
    this.audioError.play().catch(() => undefined);
  }

  playDiscovery() {
    this.audioDiscovery.play().catch(() => undefined);
  }
}
