import { Routes } from '@angular/router';
import { ProgramsComponent } from './pages/programs/programs.component';
import { AuthComponent } from './pages/auth/auth.component';
import { LayoutComponent } from './layout/layout/layout.component';

export const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: 'programs',
        loadComponent: () => import('./pages/programs/programs.component').then(c => c.ProgramsComponent)
      },
    ]
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth.component').then(c => c.AuthComponent)
  },
];
