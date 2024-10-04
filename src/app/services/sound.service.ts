import {inject, Injectable} from '@angular/core';
import {UtilityService} from './utility.service';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  utilityService = inject(UtilityService);

  private readonly audioElement = new Audio();

  private instanceRate = 1;

  play(src: string, volume: number, playbackRate = 1) {
    this.audioElement.src = src;
    this.audioElement.load();

    this.audioElement.volume = volume;
    this.audioElement.playbackRate = playbackRate;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    this.audioElement.play().catch(() => {});
  }

  isMuted() {
    return this.audioElement.muted;
  }

  toggleMuted() {
    this.audioElement.muted = !this.audioElement.muted;
  }

  playInstance(volume = 0.3) {
    this.instanceRate += 0.1;
    if (this.instanceRate > 1.3) {
      this.instanceRate = 0.9;
    }

    this.play('assets/sounds/instance.mp3', volume, this.instanceRate);
  }

  playReward() {
    this.play('assets/sounds/reward.mp3', 0.4, this.utilityService.arrayRandomItem([0.9, 1]));
  }

  playDelete() {
    this.play('assets/sounds/delete.mp3', 0.45);
  }

  playError() {
    this.play('assets/sounds/error.mp3', 0.4);
  }

  playDiscovery() {
    this.play('assets/sounds/discovery.mp3', 0.1, 1.1);
  }
}
