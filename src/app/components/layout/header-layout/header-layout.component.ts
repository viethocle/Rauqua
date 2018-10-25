import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-layout',
  templateUrl: './header-layout.component.html',
  styleUrls: ['./header-layout.component.css']
})
export class HeaderLayoutComponent implements OnInit {
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {}
}
