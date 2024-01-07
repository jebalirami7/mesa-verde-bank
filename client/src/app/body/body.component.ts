import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  getBodyClass(): string {
    let styleClass = "";
    if (this.collapsed) {
      styleClass = "body-trimmed";
    } else {
      styleClass = "body-md-screen";
    }
    return styleClass;
  }
}
