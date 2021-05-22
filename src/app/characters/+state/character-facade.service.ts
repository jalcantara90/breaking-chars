import { CharactersService } from './../characters.service';
import * as FromActions from './characters.actions';
import { CharactersState } from './characters.reducer';
import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as FromSelectors from './characters.selectors';
import { filter, first } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Character } from '../models/character.model';

@Injectable()
export class CharactersFacadeService {

  private readonly error$$ = new Subject<string>();
  readonly characterList$ = this.store.pipe(select(FromSelectors.getCharacters));
  readonly areLoaded$ = this.store.pipe(select(FromSelectors.areLoaded));
  readonly isLoading$ = this.store.pipe(select(FromSelectors.isLoading));
  readonly error$ = this.error$$.asObservable();

  constructor(private store: Store<CharactersState>, private characterService: CharactersService) {}

  loadCharacters() {
    this.areLoaded$.pipe(
      first(),
      filter(areLoaded => !areLoaded)
    ).subscribe(() =>
      this.store.dispatch(FromActions.loadCharacters())
    );
  }

  getCharacter(characterId: number) {
    return this.store.pipe(select(FromSelectors.getCharacterById(characterId)));
  }

  sendError(errorMessage: string) {
    this.error$$.next(errorMessage);

  }

  getCharacterQuote(characterName: string) {
    return this.characterService.getCharacterQuote(characterName);
  }

  loadCharacterById(id: number) {
    return this.store.dispatch(FromActions.loadCharacterById({id}));
  }
}
