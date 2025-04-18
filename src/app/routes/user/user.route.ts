import { Routes } from '@angular/router';
import { canDeactivateGuard } from '../../guards/can-deactivate.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./routes/user-list/user-list.component').then(c => c.UserListComponent)
    },
    {
        path: 'create',
        canDeactivate: [canDeactivateGuard],
        loadComponent: () => import('./routes/user-form/user-form.component').then(c => c.UserFormComponent)
    },
    {
        path: ':id',
        loadComponent: () => import('./routes/user-detail/user-detail.component').then(c => c.UserDetailComponent)
    },
    {
        path: ':id/edit',
        canDeactivate: [canDeactivateGuard],
        loadComponent: () => import('./routes/user-form/user-form.component').then(c => c.UserFormComponent)
    }
];
