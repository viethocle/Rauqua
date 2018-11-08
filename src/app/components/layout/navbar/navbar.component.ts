import {
  Component,
  AfterViewInit,
  OnInit,
  ViewChild,
  ElementRef
} from "@angular/core";
import { SidebarService } from "../sidebar.service";
import { Router, Event, NavigationStart } from "@angular/router";
import { AuthService } from "../../../services/auth/auth.service";
import { localStorageKey } from "../../../constants/common";

@Component({
  selector: "[app-navbar]",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @ViewChild("button_sidebar") btnSidebar: ElementRef;
  status = false; // true mean open sidebar

  constructor(
    private sideSvc: SidebarService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.sideSvc.clickOutSide.subscribe(res => {
      if (this.btnSidebar.nativeElement.classList.contains("display")) {
        let el: HTMLElement = this.btnSidebar.nativeElement as HTMLElement;
        el.click();
      }
    });
  }

  ngAfterViewInit() {
    // this.getUsername();
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        if (this.btnSidebar.nativeElement.classList.contains("display")) {
          let el: HTMLElement = this.btnSidebar.nativeElement as HTMLElement;
          el.click();
        }
      }
    });
  }

  toogleBtnSidebar() {
    this.status = !this.status;
  }

  getUsername(): string {
    if (this.authService.currentUserData) {
      let user = JSON.parse(localStorage.getItem(localStorageKey.USER));
      return user.user.username;
    }
    return "admin";
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isLoggedOut(): boolean {
    return !this.authService.isLoggedIn();
  }

  logOut() {
    this.authService.logOut();
  }
}
