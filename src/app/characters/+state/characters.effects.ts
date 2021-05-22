import { getCharacterById } from './characters.selectors';
import { CharactersService } from '../characters.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as CharactersActions from './characters.actions';

@Injectable()
export class CharactersEffects {

  loadCharacters$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CharactersActions.loadCharacters),
      concatMap(() =>
        this.charactersService.getCharacters().pipe(
          map(characterList => CharactersActions.loadCharactersSuccess({ characterList })),
          catchError(error => of(CharactersActions.loadCharactersFailure({ error })))
        )
      )
    );
  });

  loadCharacterById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CharactersActions.loadCharacterById),
      concatMap(({id}) =>
        this.charactersService.getCharacterById(id).pipe(
          map(character => CharactersActions.loadCharacterByIdSuccess({ character })),
          catchError(error => of(CharactersActions.loadCharacterByIdFailure({ error })))
        )
      )
    );
  });



  constructor(private actions$: Actions, private charactersService: CharactersService) {}
}
