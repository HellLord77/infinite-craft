import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SidebarInputComponent} from './sidebar-input.component';

describe('SidebarInputComponent', () => {
  let component: SidebarInputComponent;
  let fixture: ComponentFixture<SidebarInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
