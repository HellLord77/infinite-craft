import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemsInnerComponent} from './items-inner.component';

describe('ItemsInnerComponent', () => {
  let component: ItemsInnerComponent;
  let fixture: ComponentFixture<ItemsInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsInnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemsInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
