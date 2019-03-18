import { NgModule } from '@angular/core';
import { BasicRoutingModule} from './basiclayout-routing.module';
import { CommonModule } from '@angular/common';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,BasicRoutingModule
  ],
  declarations:[AboutusComponent,HomeComponent],
  providers:[]
})
export class BasiclayoutModule { }
