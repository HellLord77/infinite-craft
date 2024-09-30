import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SideControlsMobileComponent} from './side-controls-mobile.component';

describe('SideControlsMobileComponent', () => {
  let component: SideControlsMobileComponent;
  let fixture: ComponentFixture<SideControlsMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideControlsMobileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SideControlsMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
