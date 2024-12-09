import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/game',
    },
    {
        path: 'game',
        loadComponent: () => import('./components/game/game.component').then(m => m.GameComponent)
    },
    {
        path: '**',
        loadComponent: () => import('./components/not-found/not-found.component').then(m => m.NotFoundComponent)
    }
    
];
