import { CharacterBuilder } from './../testing/character.builder';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';

import { CharactersEffects } from './characters.effects';
import { CharactersService } from '../characters.service';

import { hot } from 'jasmine-marbles';

import * as FromActions from './characters.actions';

describe('CharactersEffects', () => {
  let actions$: Observable<any>;
  let effects: CharactersEffects;

  let translateService = {
    instant: jasmine.createSpy()
  };

  let toastrService = {
    error: jasmine.createSpy()
  }

  let characterService: jasmine.SpyObj<CharactersService> = jasmine.createSpyObj('CharactersService', [
    'getCharacterById',
    'getCharacters'
  ]);

  const ERROR_MESSAGE = 'ERROR!';
  const character1 = new CharacterBuilder().random().build();
  const character2 = new CharacterBuilder().random().build();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CharactersEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        { provide: ToastrService, useValue: toastrService },
        { provide: TranslateService, useValue: translateService },
        { provide: CharactersService, useValue: characterService }
      ]
    });

    effects = TestBed.inject(CharactersEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadCharacters', () => {
    it('should return loadCharactersSuccess action', () => {
      const characterList = [
        character1,
        character2
      ];
      characterService.getCharacters.and.returnValue(of(characterList));

      actions$ = hot('-a-|', {
        a: FromActions.loadCharacters()
      });

      const expected$ = hot('-a-|', {
        a: FromActions.loadCharactersSuccess({
          characterList
        })
      });

      expect(effects.loadCharacters$).toBeObservable(expected$);
    });
    it('should return loadCharactersFailure action', () => {
      characterService.getCharacters.and.returnValue(throwError({ message: ERROR_MESSAGE }));

      actions$ = hot('-a-|', {
        a: FromActions.loadCharacters()
      });

      const expected$ = hot('-a-|', {
        a: FromActions.loadCharactersFailure({
          error: {
            title: 'character.load',
            message: ERROR_MESSAGE
          }
        })
      });

      expect(effects.loadCharacters$).toBeObservable(expected$);
    });
  });

  describe('loadCharacterById', () => {
    it('should return loadCharacterByIdSuccess action', () => {

      characterService.getCharacterById.and.returnValue(of(character1));

      actions$ = hot('-a-|', {
        a: FromActions.loadCharacterById({ id: character1.char_id })
      });

      const expected$ = hot('-a-|', {
        a: FromActions.loadCharacterByIdSuccess({
          character: character1
        })
      });

      expect(effects.loadCharacterById$).toBeObservable(expected$);
    });
    it('should return loadCharacterByIdFailure10 action', () => {
      characterService.getCharacterById.and.returnValue(throwError({ message: ERROR_MESSAGE }));

      actions$ = hot('-a-|', {
        a: FromActions.loadCharacterById({ id: character1.char_id })
      });

      const expected$ = hot('-a-|', {
        a: FromActions.loadCharacterByIdFailure({
          error: {
            title: 'character.ById.load',
            message: ERROR_MESSAGE
          }
        })
      });

      expect(effects.loadCharacterById$).toBeObservable(expected$);
    });
  });

  describe('error$', () => {
    it('should call toasterService.error and translateService.instant when receive loadCharactersFailure', () => {
      const error = {
        title: 'character.ById.load',
        message: ERROR_MESSAGE
      };

      translateService.instant.and.returnValue(error.title);
      actions$ = hot('-a-|', {
        a: FromActions.loadCharactersFailure({error})
      });

      effects.error$.subscribe(() => {
        expect(toastrService.error).toHaveBeenCalledWith(error.message, error.title);
        expect(translateService.instant).toHaveBeenCalledWith(error.title);
      });
    });
    it('should call toasterService.error and translateService.instant when receive loadCharacterByIdFailure', () => {
      const error = {
        title: 'character.load',
        message: ERROR_MESSAGE
      };

      translateService.instant.and.returnValue(error.title);
      actions$ = hot('-a-|', {
        a: FromActions.loadCharacterByIdFailure({error})
      });

      effects.error$.subscribe(() => {
        expect(toastrService.error).toHaveBeenCalledWith(error.message, error.title);
        expect(translateService.instant).toHaveBeenCalledWith(error.title);
      });
    });
  });
});
