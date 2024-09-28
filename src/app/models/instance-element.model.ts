import {Element} from "./element.model";
import {Point} from "@angular/cdk/drag-drop";

export interface InstanceElement extends Element {
  center: Point;
}
