import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EmptySidebarComponent} from './empty-sidebar.component';

describe('EmptySidebarComponent', () => {
  let component: EmptySidebarComponent;
  let fixture: ComponentFixture<EmptySidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptySidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmptySidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
