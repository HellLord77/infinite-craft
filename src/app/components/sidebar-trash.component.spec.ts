import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SidebarTrashComponent} from './sidebar-trash.component';

describe('SidebarTrashComponent', () => {
  let component: SidebarTrashComponent;
  let fixture: ComponentFixture<SidebarTrashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarTrashComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarTrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
