import { CharactersFacadeService } from './../+state/character-facade.service';
import { Character } from './../models/character.model';
import { Component, OnInit } from '@angular/core';
import { CharactersService } from './../characters.service';
import { slideInRightList } from '@shared/animations';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'bc-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
  animations: [slideInRightList],
})
export class CharacterListComponent implements OnInit {
  characterList$ = this.charactersFacadeService.characterList$.pipe(
    filter(characterList => !!characterList.length)
  );

  constructor(private charactersFacadeService: CharactersFacadeService) {}

  ngOnInit(): void {
    this.charactersFacadeService.loadCharacters();
  }

  public trackById(_: number ,character: Character) {
    return character.char_id;
  }
}
