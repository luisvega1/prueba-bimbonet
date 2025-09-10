import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './core/pages/login/login.component';
import { LayoutComponent } from './core/layout/layout.component';
import { HomeComponent } from './core/pages/home/home.component';
import { loginGuard } from './core/guards/login.guard';
import { JokePageComponent } from './core/pages/joke-page/joke-page.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'joke',
        children: [
          { path: '', component: JokePageComponent },
          { path: ':id', component: JokePageComponent },
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
