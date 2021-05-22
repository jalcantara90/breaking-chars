import { Character, statusColor, StatusType } from './../../models/character.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'bc-character-info',
  templateUrl: './character-info.component.html',
  styleUrls: ['./character-info.component.scss']
})
export class CharacterInfoComponent {
  @Input() quote: string = '';
  @Input() character!: Character;

  constructor() { }

  public characterStatusChipColor(state: StatusType) {
    return statusColor.get(state);
  }

}
