import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemHiddenToggleIconComponent} from './item-hidden-toggle-icon.component';

describe('ItemHiddenToggleIconComponent', () => {
  let component: ItemHiddenToggleIconComponent;
  let fixture: ComponentFixture<ItemHiddenToggleIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemHiddenToggleIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemHiddenToggleIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
