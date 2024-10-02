import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SidebarSortComponent} from './sidebar-sort.component';

describe('SidebarSortComponent', () => {
  let component: SidebarSortComponent;
  let fixture: ComponentFixture<SidebarSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarSortComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
