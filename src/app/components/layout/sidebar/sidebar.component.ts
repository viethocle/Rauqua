import { Component, OnInit } from "@angular/core";
import { AuthService } from "app/services/auth/auth.service";

@Component({
  selector: "[app-sidebar]",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  public isManager: boolean;
  public isMod: boolean;
  public isProvider: boolean;
  menu_min = false;

  constructor(
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.isManager = this.authService.isCurrentUserAdmin;
    this.isMod = this.authService.isCurrentUserMod;
    this.isProvider = this.authService.isCurrentUserProvider;
  }

  ToggleSidebar() {
    this.menu_min = !this.menu_min;
  }
}
