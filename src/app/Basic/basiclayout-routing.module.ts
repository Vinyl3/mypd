import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginGuard } from '../guard/login.guard';
import { AboutusComponent } from './aboutus/aboutus.component';
const routes: Routes = [               
  { path: '', component: HomeComponent,canActivate:[LoginGuard]},
  { path: 'home',component: HomeComponent,canActivate:[LoginGuard]},
  { path: 'aboutus',component:AboutusComponent,canActivate:[LoginGuard]}
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class BasicRoutingModule { }
  export const routingComponents = [
    HomeComponent,
    AboutusComponent
  ]
  