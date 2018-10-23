import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginregComponent } from './loginreg/loginreg.component';
import { OrdersComponent } from './orders/orders.component';
import { ShoworderComponent } from './showorder/showorder.component';
import { ProductsComponent } from './products/products.component';
import { StoreComponent } from './store/store.component';
import { StoreProductComponent } from './store-product/store-product.component';
import { CartComponent } from './cart/cart.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'

const routes: Routes = [
	{ path: "", component: HomeComponent },
	{ path: "store", component: StoreComponent },
	{ path: "store/show/:id", component: StoreProductComponent },
	{ path: "account", component: MyaccountComponent },
	{ path: "account/order/:id", component: ShoworderComponent }, 
	{ path: "cart", component: CartComponent },
	{ path: "login", component: LoginregComponent },
	{ path: "orders", component: OrdersComponent },
	{ path: "orders/:id", component: ShoworderComponent },
	{ path: "products", component: ProductsComponent },
	{ path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
