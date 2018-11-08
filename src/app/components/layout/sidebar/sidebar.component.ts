import { Component, OnInit } from "@angular/core";

@Component({
  selector: "[app-sidebar]",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  public isManager: boolean;
  menu_min = false;

  constructor() {}

  ngOnInit() {}

  ToggleSidebar() {
    this.menu_min = !this.menu_min;
  }
}
