import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SidebarInputCloseComponent} from './sidebar-input-close.component';

describe('SidebarInputCloseComponent', () => {
  let component: SidebarInputCloseComponent;
  let fixture: ComponentFixture<SidebarInputCloseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarInputCloseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarInputCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
