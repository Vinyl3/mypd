import { NgModule } from '@angular/core';
import { BasicRoutingModule, routingComponents } from './basiclayout-routing.module';

@NgModule({
  imports: [
    BasicRoutingModule,
  ],
  declarations:[routingComponents],
  providers:[   
  ]
})
export class BasiclayoutModule { }
