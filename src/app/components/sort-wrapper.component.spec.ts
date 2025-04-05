import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SortWrapperComponent} from './sort-wrapper.component';

describe('SortWrapperComponent', () => {
  let component: SortWrapperComponent;
  let fixture: ComponentFixture<SortWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortWrapperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SortWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
