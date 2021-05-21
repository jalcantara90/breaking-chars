import { Component } from '@angular/core';
import { CharactersService } from './../characters.service';
import { slideInRightList } from '@shared/animations';

@Component({
  selector: 'bc-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
  animations: [slideInRightList],
})
export class CharacterListComponent {
  characterList$ = this.charactersService.getCharacters();

  constructor(private charactersService: CharactersService) {}
}
