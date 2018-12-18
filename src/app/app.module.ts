import { AppErrorHandler } from "./common/errorHandle/appErrorHandler";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID, ErrorHandler } from "@angular/core";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./router/app-routing.module";
import { SharedModule } from "@shared/shared.module";
import { HeroDetailComponent } from "./components/hero-detail/hero-detail.component";
import { HomeComponent } from "./components/home/home.component";
import { HeaderLayoutComponent } from "./components/layout/header-layout/header-layout.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthGuardService } from "./services/auth/auth-guard.service";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SignUpComponent } from "./components/auth/signUp/sign-up.component";
import { CategotyComponent } from "./components/categoty/categoty.component";
import { DataTablesModule } from "angular-datatables";
import { UserComponent } from "./components/user/user.component";
import { ProductComponent } from "./components/product/product.component";
import { OrderComponent } from "./components/order/order.component";
import { PromotionComponent } from "./components/promotion/promotion.component";
import { CouponComponent } from "./components/coupon/coupon.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LaddaModule } from "angular2-ladda";
import { ClickOutsideModule } from "ng-click-outside";
import { LoadingBarHttpClientModule } from "@ngx-loading-bar/http-client";
import { SidebarComponent } from "./components/layout/sidebar/sidebar.component";
import { FooterComponent } from "./components/layout/footer/footer.component";
import { NavbarComponent } from "./components/layout/navbar/navbar.component";
import { BsModalModule } from "ng2-bs3-modal";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { ShopComponent } from './components/shop/shop.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TooltipModule } from 'ngx-tooltip';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import {ToastModule} from 'ng6-toastr/ng2-toastr';
import { HttpModule } from '@angular/http';
import { AdminRouteGuard } from "./services/auth/admin-route.guard";
import { ModRouteGuard } from "./services/auth/mod-route.guard";
import { ProviderRouteGuard } from "./services/auth/provider-route.guard";
import { NgSelectModule } from '@ng-select/ng-select';
import {NgxPaginationModule} from 'ngx-pagination';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

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
    ShopComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    SharedModule,
    NgxPaginationModule,
    DataTablesModule,
    NgbModule,
    HttpModule,
    Ng2SearchPipeModule,
    TooltipModule,
    PerfectScrollbarModule,
    LaddaModule.forRoot({
      style: "slide-left"
    }),
    LoadingBarHttpClientModule,
    ClickOutsideModule,
    BsModalModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
        }
    }),
    
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "en"
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler
    },
    AuthGuardService,
    AdminRouteGuard,
    ModRouteGuard,
    ProviderRouteGuard
  ], 
  bootstrap: [AppComponent]
})
export class AppModule {}
