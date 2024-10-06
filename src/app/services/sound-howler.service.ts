import {inject, Injectable} from '@angular/core';
import {Howl} from 'howler';

import {SoundService} from './sound.service';
import {UtilityService} from './utility.service';

@Injectable({
  providedIn: 'root',
})
export class SoundHowlerService extends SoundService {
  utilityService = inject(UtilityService);

  private muted = false;
  private instanceRate = 1;

  private readonly instanceSound = new Howl({
    src: ['assets/sounds/instance.mp3'],
  });
  private readonly rewardSound = new Howl({
    src: ['assets/sounds/reward.mp3'],
    volume: 0.4,
  });
  private readonly deleteSound = new Howl({
    src: ['assets/sounds/delete.mp3'],
    volume: 0.45,
  });
  private readonly errorSound = new Howl({
    src: ['assets/sounds/error.mp3'],
    volume: 0.4,
  });
  private readonly discoverySound = new Howl({
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

    this.instanceSound.volume(volume);
    this.instanceSound.rate(this.instanceRate);
    this.instanceSound.play();
  }

  playReward() {
    this.rewardSound.rate(this.utilityService.arrayRandomItem([0.9, 1])!);
    this.rewardSound.play();
  }

  playDelete() {
    this.deleteSound.play();
  }

  playError() {
    this.errorSound.play();
  }

  playDiscovery() {
    this.discoverySound.play();
  }
}
