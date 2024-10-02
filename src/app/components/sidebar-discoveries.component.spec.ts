import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SidebarDiscoveriesComponent} from './sidebar-discoveries.component';

describe('SidebarDiscoveriesComponent', () => {
  let component: SidebarDiscoveriesComponent;
  let fixture: ComponentFixture<SidebarDiscoveriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarDiscoveriesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarDiscoveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
