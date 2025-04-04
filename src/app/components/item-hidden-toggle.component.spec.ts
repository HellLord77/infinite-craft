import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemHiddenToggleComponent} from './item-hidden-toggle.component';

describe('ItemHiddenToggleComponent', () => {
  let component: ItemHiddenToggleComponent;
  let fixture: ComponentFixture<ItemHiddenToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemHiddenToggleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemHiddenToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
