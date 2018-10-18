import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AdminComponent } from './admin/admin.component';
import { OrdersComponent } from './orders/orders.component';
import { ShoworderComponent } from './showorder/showorder.component';
import { ProductsComponent } from './products/products.component';
import { StoreComponent } from './store/store.component';
import { StoreProductComponent } from './store-product/store-product.component';
import { CartComponent } from './cart/cart.component'

const routes: Routes = [
	{ path: "store", component: StoreComponent},
	{ path: "store/show/:id", component: StoreProductComponent},
	{ path: "cart", component: CartComponent},
	{ path: "login", component: AdminComponent},
	{ path: "dashboard/orders", component: OrdersComponent},
	{ path: "dashboard/orders/:id", component: ShoworderComponent},
	{ path: "dashboard/products", component: ProductsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
