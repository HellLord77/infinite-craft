import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SortNameComponent} from './sort-name.component';

describe('SortNameComponent', () => {
  let component: SortNameComponent;
  let fixture: ComponentFixture<SortNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortNameComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SortNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
