import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './router/app-routing.module';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderLayoutComponent } from './components/layout/header-layout/header-layout.component';
import { LoginComponent } from './components/auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailValidatorDirective } from './directives/validators/email-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HomeComponent,
    HeaderLayoutComponent,
    LoginComponent,
    EmailValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
