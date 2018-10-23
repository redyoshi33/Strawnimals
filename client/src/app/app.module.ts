import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgsRevealModule } from 'ng-scrollreveal';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { AppComponent } from './app.component';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ShoworderComponent } from './showorder/showorder.component';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { StoreComponent } from './store/store.component';
import { StoreProductComponent } from './store-product/store-product.component';
import { CartComponent } from './cart/cart.component';
import { LoginregComponent } from './loginreg/loginreg.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PicturemodalComponent } from './picturemodal/picturemodal.component';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    ProductsComponent,
    NavbarComponent,
    ShoworderComponent,
    ProductModalComponent,
    DeleteModalComponent,
    StoreComponent,
    StoreProductComponent,
    CartComponent,
    LoginregComponent,
    MyaccountComponent,
    HomeComponent,
    PageNotFoundComponent,
    PicturemodalComponent,
  ],
  entryComponents: [ProductModalComponent, DeleteModalComponent, PicturemodalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    ScrollToModule.forRoot(),
    NgxSpinnerModule,
    NgsRevealModule.forRoot(),
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
