import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { CharacterDetailRoutingModule } from './character-detail-routing.module';
import { CharacterComponent } from './character/character.component';

@NgModule({
  declarations: [
    CharacterComponent
  ],
  imports: [
    CommonModule,
    CharacterDetailRoutingModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule
  ]
})
export class CharacterDetailModule { }
