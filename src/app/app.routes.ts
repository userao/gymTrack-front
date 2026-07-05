import { Routes } from '@angular/router';
import { ProgramsComponent } from './pages/programs/programs.component';
import { AuthComponent } from './pages/auth/auth.component';
import { LayoutComponent } from './layout/layout.component';
import { ExerciseInfoComponent } from './pages/programs/exercise-info/exercise-info.component';

export const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: 'programs',
        loadComponent: () => import('./pages/programs/programs.component').then(c => c.ProgramsComponent),
      },
      {
        path: 'template/:templateId/exercise/:exerciseId',
        component: ExerciseInfoComponent,
      },
      {
        path: 'trainings',
        loadComponent: () => import('./pages/trainings/trainings.component').then(c => c.TrainingsComponent)
      },
      {
        path: 'exercises',
        loadComponent: () => import('./pages/exercises/exercises.component').then(c => c.ExercisesComponent)
      },

    ]
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth.component').then(c => c.AuthComponent)
  },
];
