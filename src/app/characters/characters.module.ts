import { CharactersEffects } from './+state/characters.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterCardComponent } from './character-card/character-card.component';

import {MatCardModule} from '@angular/material/card';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { CharactersCardSkeletonComponent } from './characters-card-skeleton/characters-card-skeleton.component';
import * as FromCharacter from './+state/characters.reducer';
import { CharactersFacadeService } from './+state/character-facade.service';

@NgModule({
  declarations: [
    CharacterListComponent,
    CharacterCardComponent,
    CharactersCardSkeletonComponent
  ],
  imports: [
    CommonModule,
    CharactersRoutingModule,
    MatCardModule,
    ScrollingModule,
    StoreModule.forFeature(FromCharacter.charactersFeatureKey, FromCharacter.reducer),
    EffectsModule.forFeature([CharactersEffects])
  ],
  providers: [
    CharactersFacadeService
  ]
})
export class CharactersModule { }
