import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { ShoworderComponent } from './showorder/showorder.component';
import { ProductsComponent } from './products/products.component'

const routes: Routes = [
	{ path: "dashboard", component: DashboardComponent},
	{ path: "dashboard/orders", component: OrdersComponent},
	{ path: "dashboard/orders/:id", component: ShoworderComponent},
	{ path: "dashboard/products", component: ProductsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
