import {Component, ElementRef, inject, input, signal} from '@angular/core';
import {ItemComponent} from "../item/item.component";
import {InstanceElement} from "../../models/instance-element.model";
import {UtilityService} from "../../services/utility.service";

@Component({
    selector: 'app-instance',
    standalone: true,
    imports: [ItemComponent],
    templateUrl: './instance.component.html',
    styleUrl: './instance.component.css'
})
export class InstanceComponent {
    element = input.required<InstanceElement>();
    zIndex = signal(0);
    private elementRef = inject(ElementRef);
    private utilityService = inject(UtilityService);

    constructor() {
        this.zIndex.set(this.utilityService.zIndex);
    }

    get item(): HTMLElement {
        return this.elementRef.nativeElement.getElementsByTagName('app-item')[0];
    }

    onDblClick() {
        console.log('instance.onDblClick()');
        const boundingClientRect = this.elementRef.nativeElement.getBoundingClientRect();
        const center = this.utilityService.getCenter(boundingClientRect);
        center.x += 10;
        center.y -= 10;
        const instanceElement: InstanceElement = {...this.element(), 'center': center};
        this.utilityService.elements.push(instanceElement);
    }
}
