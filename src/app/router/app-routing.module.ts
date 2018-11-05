import { User } from './../models/user';
import { SignUpComponent } from '../components/auth/signUp/sign-up.component';
import { routePath } from '../constants/common';
import { LoginComponent } from '../components/auth/login/login.component';
import { HomeComponent } from '../components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroDetailComponent } from '../components/hero-detail/hero-detail.component';
import { AuthGuardService } from '../services/auth/auth-guard.service';
import { CategotyComponent } from '../components/categoty/categoty.component';
import { UserComponent } from '../components/user/user.component'
import { ProductComponent } from '../components/product/product.component'

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
    path: routePath.CATEGORY,
    component: CategotyComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: routePath.User,
    component: UserComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: routePath.Product,
    component: ProductComponent,
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
