import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InstanceDiscoveredTextComponent} from './instance-discovered-text.component';

describe('InstanceDiscoveredTextComponent', () => {
  let component: InstanceDiscoveredTextComponent;
  let fixture: ComponentFixture<InstanceDiscoveredTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstanceDiscoveredTextComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InstanceDiscoveredTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
