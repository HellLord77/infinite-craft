import {Component} from '@angular/core';

import {InstructionIconComponent} from './instruction-icon.component';

@Component({
  selector: 'app-instruction',
  standalone: true,
  imports: [InstructionIconComponent],
  templateUrl: './instruction.component.html',
  styleUrl: './instruction.component.css',
})
export class InstructionComponent {}
