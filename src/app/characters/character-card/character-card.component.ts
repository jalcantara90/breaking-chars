import { Character } from './../models/character.model';
import { Component, Input, OnInit } from '@angular/core';
import * as AppRoutes from '@shared/routes';

@Component({
  selector: 'bc-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit {
  public readonly characterSegment = `/${AppRoutes.CHARACTER}`;
  @Input() character!: Character;

  constructor() { }

  ngOnInit(): void {
  }

  get backgroundImage() {
    return { backgroundImage: `url(${this.character.img})` };
  }
}
