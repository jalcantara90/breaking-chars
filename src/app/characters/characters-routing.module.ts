import { CharacterListComponent } from './character-list/character-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as AppRoutes from '@shared/routes';

const routes: Routes = [
  { path: '', component: CharacterListComponent, data: { animationState: 'slideRight' } },
  { path: AppRoutes.CHARACTER, loadChildren: () => import('./character-detail/character-detail.module').then(m => m.CharacterDetailModule), data: { animationState: 'slideLeft' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharactersRoutingModule { }
