import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InstructionIconComponent} from './instruction-icon.component';

describe('InstructionIconComponent', () => {
  let component: InstructionIconComponent;
  let fixture: ComponentFixture<InstructionIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructionIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InstructionIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
