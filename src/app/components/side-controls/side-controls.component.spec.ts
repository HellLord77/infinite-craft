import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideControlsComponent } from './side-controls.component';

describe('SideControlsComponent', () => {
  let component: SideControlsComponent;
  let fixture: ComponentFixture<SideControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideControlsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SideControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
