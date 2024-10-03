import {inject, Injectable} from '@angular/core';
import {Howl, Howler} from 'howler';
import {UtilityService} from './utility.service';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  utilityService = inject(UtilityService);

  private muted = false;
  private instanceRate = 1;

  private readonly instance = new Howl({
    src: ['assets/sounds/instance.mp3'],
    volume: 0.5,
  });
  private readonly reward = new Howl({
    src: ['assets/sounds/reward.mp3'],
    volume: 0.4,
  });
  private readonly delete = new Howl({
    src: ['assets/sounds/delete.mp3'],
    volume: 0.45,
  });
  private readonly error = new Howl({
    src: ['assets/sounds/error.mp3'],
    volume: 0.4,
  });
  private readonly discovery = new Howl({
    src: ['assets/sounds/discovery.mp3'],
    volume: 0.1,
    rate: 1.1,
  });

  isMuted() {
    return this.muted;
  }

  toggleMuted() {
    Howler.mute((this.muted = !this.muted));
  }

  playInstance(volume = 0.3) {
    this.instanceRate += 0.1;
    if (this.instanceRate > 1.3) {
      this.instanceRate = 0.9;
    }
    this.instance.rate(this.instanceRate);
    this.instance.volume(volume);
    this.instance.play();
  }

  playReward() {
    this.reward.rate(this.utilityService.arrayRandomItem([0.9, 1]));
    this.reward.play();
  }

  playDelete() {
    this.delete.play();
  }

  playError() {
    this.error.play();
  }

  playDiscovery() {
    this.discovery.play();
  }
}
