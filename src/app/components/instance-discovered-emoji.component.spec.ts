import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InstanceDiscoveredEmojiComponent} from './instance-discovered-emoji.component';

describe('InstanceDiscoveredEmojiComponent', () => {
  let component: InstanceDiscoveredEmojiComponent;
  let fixture: ComponentFixture<InstanceDiscoveredEmojiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstanceDiscoveredEmojiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InstanceDiscoveredEmojiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
