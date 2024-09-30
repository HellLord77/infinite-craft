import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemEmojiComponent} from './item-emoji.component';

describe('ItemEmojiComponent', () => {
  let component: ItemEmojiComponent;
  let fixture: ComponentFixture<ItemEmojiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemEmojiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemEmojiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
