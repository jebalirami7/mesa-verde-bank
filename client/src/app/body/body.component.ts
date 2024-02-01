import { Component, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {


  constructor(private auth: AuthService) { }

  // @Input() collapsed = false;
  // @Input() screenWidth = 0;
  isLoggedIn = this.auth.isLoggedIn();


  collapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.collapsed = data.collapsed;
  }

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
