import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirstPageRoutingModule as HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home-component/home.component';
import { OperationCardComponent } from './home-component/operation-card/operation-card.component';


@NgModule({
  declarations: [HomeComponent, OperationCardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
