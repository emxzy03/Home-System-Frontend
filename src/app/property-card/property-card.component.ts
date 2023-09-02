import { Component, Input } from "@angular/core";
import { IPropertyBase } from "../Interface/IPropertybase";


@Component({
    selector: 'app-property-card',
    // template: `<h1> I am card </h1>`,
    // styles: ['h1 {font-weight: normal};']
   templateUrl: './property-card.component.html',
   styleUrls: ['./property-card.component.css']
  })
export class PropertyCardComponent{
  @Input() property: IPropertyBase |any;
  @Input() hideIcons: boolean | undefined;
  

}