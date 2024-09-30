import {Injectable} from '@angular/core';
import {ItemsComponent} from '../components/items.component';
import {TrashComponent} from '../components/trash.component';

@Injectable({
  providedIn: 'root',
})
export class DeleteModeService {
  trashComponent!: TrashComponent;
  itemsComponent!: ItemsComponent;

  private deleteMode = false;

  isDeleteMode() {
    return this.deleteMode;
  }

  setDeleteMode(deleteMode: boolean) {
    this.deleteMode = deleteMode;
    this.trashComponent.trashActive = deleteMode;
    for (const itemComponent of this.itemsComponent.itemComponents()) {
      itemComponent.deleteMode = deleteMode;
    }
  }

  toggleDeleteMode() {
    this.setDeleteMode(!this.deleteMode);
  }
}
