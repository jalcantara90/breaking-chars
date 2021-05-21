import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterCardComponent } from './character-card/character-card.component';

import {MatCardModule} from '@angular/material/card';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { CharactersCardSkeletonComponent } from './characters-card-skeleton/characters-card-skeleton.component';

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
    ScrollingModule
  ]
})
export class CharactersModule { }
