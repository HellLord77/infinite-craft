import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EmptySidebarIconComponent} from './empty-sidebar-icon.component';

describe('EmptySidebarIconComponent', () => {
  let component: EmptySidebarIconComponent;
  let fixture: ComponentFixture<EmptySidebarIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptySidebarIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmptySidebarIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
