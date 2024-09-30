import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PinwheelComponent} from './pinwheel.component';

describe('PinwheelComponent', () => {
  let component: PinwheelComponent;
  let fixture: ComponentFixture<PinwheelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PinwheelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PinwheelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
