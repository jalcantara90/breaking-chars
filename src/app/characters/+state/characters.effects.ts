import { TranslateService } from '@ngx-translate/core';
import { CharactersService } from '../characters.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

import * as CharactersActions from './characters.actions';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class CharactersEffects {

  loadCharacters$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CharactersActions.loadCharacters),
      concatMap(() =>
        this.charactersService.getCharacters().pipe(
          map(characterList => CharactersActions.loadCharactersSuccess({ characterList })),
          catchError((error: HttpErrorResponse) =>
            of(
              CharactersActions.loadCharactersFailure({
                error: {
                  title: 'character.load',
                  message: error.message
                }
              })
            )
          )
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
          catchError((error: HttpErrorResponse) =>
            of(
              CharactersActions.loadCharacterByIdFailure({
                error: {
                  title: 'character.ById.load',
                  message: error.message
                }
              })
            )
          )
        )
      )
    );
  });

  error$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CharactersActions.loadCharactersFailure,
        CharactersActions.loadCharacterByIdFailure
      ),
      tap(({error}) =>
        this.toastr.error(
          error.message,
          this.translateService.instant(error.title)
        )
      )
    ), { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private charactersService: CharactersService,
    private toastr: ToastrService,
    private translateService: TranslateService
  ) {}
}
