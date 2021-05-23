import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { CharactersService } from './../characters.service';
import * as FromActions from './characters.actions';
import { CharactersState } from './characters.reducer';
import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as FromSelectors from './characters.selectors';
import { filter, first, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class CharactersFacadeService {

  readonly characterList$ = this.store.pipe(select(FromSelectors.getCharacters));
  readonly areLoaded$ = this.store.pipe(select(FromSelectors.areLoaded));

  constructor(
    private store: Store<CharactersState>,
    private characterService: CharactersService,
    private translateService: TranslateService,
    private toastrService: ToastrService
  ) {}

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

  getCharacterQuote(characterName: string) {
    return this.characterService.getCharacterQuote(characterName).pipe(
      catchError((error: HttpErrorResponse) => {
        this.toastrService.error(
          error.message,
          this.translateService.instant('character.quote.load')
        );
        return throwError(error);
      })
    );
  }

  loadCharacterById(id: number) {
    return this.store.dispatch(FromActions.loadCharacterById({id}));
  }
}
