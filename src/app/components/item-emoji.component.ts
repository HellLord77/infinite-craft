import {Component, input} from '@angular/core';

@Component({
  selector: 'app-item-emoji',
  standalone: true,
  imports: [],
  templateUrl: './item-emoji.component.html',
  styleUrl: './item-emoji.component.css',
})
export class ItemEmojiComponent {
  emoji = input.required<string>();
}
