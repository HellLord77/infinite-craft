import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SidebarInnerComponent} from './sidebar-inner.component';

describe('SidebarInnerComponent', () => {
  let component: SidebarInnerComponent;
  let fixture: ComponentFixture<SidebarInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarInnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
