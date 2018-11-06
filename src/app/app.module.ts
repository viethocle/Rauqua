import { AppErrorHandler } from './common/errorHandle/appErrorHandler';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, ErrorHandler } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './router/app-routing.module';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderLayoutComponent } from './components/layout/header-layout/header-layout.component';
import { LoginComponent } from './components/auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { SignUpComponent } from './components/auth/signUp/sign-up.component';
import { CategotyComponent } from './components/categoty/categoty.component';
import { DataTablesModule } from 'angular-datatables';
import { UserComponent } from './components/user/user.component';
import { ProductComponent } from './components/product/product.component';
import { OrderComponent } from './components/order/order.component';
import { PromotionComponent } from './components/promotion/promotion.component';
import { CouponComponent } from './components/coupon/coupon.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LaddaModule }         from 'angular2-ladda';
import { ClickOutsideModule } from 'ng-click-outside';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HomeComponent,
    HeaderLayoutComponent,
    LoginComponent,
    SignUpComponent,
    CategotyComponent,
    UserComponent,
    ProductComponent,
    OrderComponent,
    PromotionComponent,
    CouponComponent,
    SidebarComponent,
    FooterComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    DataTablesModule,
    NgbModule,
    LaddaModule.forRoot({
      style: "slide-left"
    }),
    LoadingBarHttpClientModule,
    ClickOutsideModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'en',
    },
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler,
    },
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
