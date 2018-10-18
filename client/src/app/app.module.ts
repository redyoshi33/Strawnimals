import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgsRevealModule } from 'ng-scrollreveal';

import { AppComponent } from './app.component';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ShoworderComponent } from './showorder/showorder.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { StoreNavbarComponent } from './store-navbar/store-navbar.component';
import { StoreComponent } from './store/store.component';
import { StoreProductComponent } from './store-product/store-product.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    OrdersComponent,
    ProductsComponent,
    NavbarComponent,
    ShoworderComponent,
    DashboardComponent,
    ProductModalComponent,
    DeleteModalComponent,
    StoreNavbarComponent,
    StoreComponent,
    StoreProductComponent,
    CartComponent,
  ],
  entryComponents: [ProductModalComponent, DeleteModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    NgxSpinnerModule,
    NgsRevealModule.forRoot(),
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
