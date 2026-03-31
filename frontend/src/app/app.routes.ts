import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () =>
            import('./home/home.page')
                .then(m => m.HomePage),
    },
    {
        path: 'register',
        loadComponent: () =>
            import('./pages/registration-form/registration-form')
                .then(m => m.RegistrationForm),
    },
    {
        path: 'users',
        loadComponent: () =>
            import('./pages/user-list/user-list')
                .then(m => m.UserList)
    },
    {
        path: '',
        // [Integration]: Redirigir al root de Spike 2 para validación del renderizado en browser
        redirectTo: 'home',
        pathMatch: 'full',
    }
];
