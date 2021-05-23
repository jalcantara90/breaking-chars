import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { CharacterDetailRoutingModule } from './character-detail-routing.module';
import { CharacterComponent } from './character/character.component';
import {MatChipsModule} from '@angular/material/chips';
import { CharacterInfoComponent } from './character-info/character-info.component';

@NgModule({
  declarations: [
    CharacterComponent,
    CharacterInfoComponent
  ],
  imports: [
    CommonModule,
    CharacterDetailRoutingModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
    MatChipsModule,
    MatCardModule
  ]
})
export class CharacterDetailModule { }
