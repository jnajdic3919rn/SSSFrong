import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ScrapeComponent } from './scrape/scrape.component';
import { AuthGuard } from 'src/guard/auth.guard';
import { LegitimationComponent } from './legitimation/legitimation.component';
import { LoginGuard } from 'src/guard/login.guard';
import { AdminGuard } from 'src/guard/admin.guard';

const routes: Routes = [
  { path: '', 
    component: LoginComponent, 
    canActivate: [LoginGuard]
  },
  {
    path: "auth",
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: "home",
    component: LegitimationComponent,
},
{
  path: "survey",
  component: HomeComponent,
  canActivate: [AuthGuard]
},
  {
    path: "scrape",
    component: ScrapeComponent,
    canActivate: [AuthGuard, AdminGuard]
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
