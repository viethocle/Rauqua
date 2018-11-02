import { SignUpComponent } from '../components/auth/signUp/sign-up.component';
import { routePath } from '../constants/common.js';
import { LoginComponent } from '../components/auth/login/login.component';
import { HomeComponent } from '../components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroDetailComponent } from '../components/hero-detail/hero-detail.component';
import { AuthGuardService } from '../services/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: routePath.HOME,
    pathMatch: 'full'
  },
  {
    path: routePath.HOME,
    component: HomeComponent
  },
  {
    path: routePath.HEROES,
    component: HeroDetailComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: routePath.LOGIN,
    component: LoginComponent
  },
  {
    path: routePath.SIGNUP,
    component: SignUpComponent,
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})


export class AppRoutingModule { }
