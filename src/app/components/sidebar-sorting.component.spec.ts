import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SidebarSortingComponent} from './sidebar-sorting.component';

describe('SidebarSortingComponent', () => {
  let component: SidebarSortingComponent;
  let fixture: ComponentFixture<SidebarSortingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarSortingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
