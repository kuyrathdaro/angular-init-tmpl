import { Routes } from '@angular/router';
import { authChildGuard } from './guards/auth-child.guard';
import { RootComponent } from './components/root/root.component';
import { PageNotFoundComponent } from './routes/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    canActivateChild: [authChildGuard],
    component: RootComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./routes/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./routes/user/user.route').then((c) => c.routes),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./routes/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
