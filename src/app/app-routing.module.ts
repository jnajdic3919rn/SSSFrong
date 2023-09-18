import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ScrapeComponent } from './scrape/scrape.component';
import { AuthGuard } from 'src/guard/auth.guard';

const routes: Routes = [
  { path: '', 
    component: LoginComponent, 
    canDeactivate: [AuthGuard] 
  },
  {
    path: "auth",
    component: LoginComponent,
    canDeactivate: [AuthGuard]
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard]
},
  {
    path: "scrape",
    component: ScrapeComponent,
    canActivate: [AuthGuard]
  }
];

const routerOptions: ExtraOptions={
  scrollPositionRestoration:'enabled',
  anchorScrolling:'enabled'
}

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
