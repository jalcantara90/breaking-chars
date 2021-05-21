import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as AppRoutes from '@shared/routes';

const routes: Routes = [
  { path: AppRoutes.ROOT, loadChildren: () => import('./characters/characters.module').then(m => m.CharactersModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
