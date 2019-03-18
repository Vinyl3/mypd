import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { CommonModule } from '@angular/common';
import { LoginGuard } from './guard/login.guard';
const routes: Routes = [
   {
    path:'',
    loadChildren:'./Basic/basiclayout.module#BasiclayoutModule' 
  },
  {
    path:'',
    loadChildren:'./Core/corelayout.module#CoreLayoutModule',
  },
  {
    path:'',
    loadChildren:'./Shared/shared.module#SharedModule'
  },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
