import {Point} from "@angular/cdk/drag-drop";
import {Element} from "./element.model";

export interface Instance {
  element: Element;
  id: number;
  center: Point;
  zIndex: number;
}
