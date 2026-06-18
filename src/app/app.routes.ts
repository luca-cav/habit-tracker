import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard').then((m) => m.DashboardComponent),
  },
  {
    path: 'heatmap',
    loadComponent: () =>
      import('./heatmap/heatmap').then((m) => m.HeatmapComponent),
  },
  {
    path: 'archive',
    loadComponent: () =>
      import('./archive/archive').then((m) => m.ArchiveComponent),
  },
  { path: '**', redirectTo: '/dashboard' },
];
