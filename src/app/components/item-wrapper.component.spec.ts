import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemWrapperComponent} from './item-wrapper.component';

describe('ItemWrapperComponent', () => {
  let component: ItemWrapperComponent;
  let fixture: ComponentFixture<ItemWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemWrapperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
