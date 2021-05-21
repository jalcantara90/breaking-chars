import { Character } from './../models/character.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bc-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit {
  @Input() character: Character = {} as Character;

  constructor() { }

  ngOnInit(): void {
  }

  get backgroundImage() {
    return { backgroundImage: `url(${this.character.img})` };
  }
}
