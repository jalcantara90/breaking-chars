import { CharacterBuilder } from './../testing/character.builder';
import { TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { CharactersService } from './../characters.service';
import { TranslateService } from '@ngx-translate/core';
import { CharactersFacadeService } from './character-facade.service';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { NgModule } from "@angular/core";
import * as FromReducer from './characters.reducer';
import { CharactersEffects } from './characters.effects';
import { throwError } from 'rxjs';
import * as FromActions from './characters.actions';

describe('CharacterFacadeService', () => {
  let store: Store;
  let facadeService: CharactersFacadeService;

  const characterService = jasmine.createSpyObj('CharactersService', [
    'getCharacterQuote'
  ]);
  const translateService = {
    instant: jasmine.createSpy()
  };
  const toastrService = {
    error: jasmine.createSpy()
  };

  const ERROR_MESSAGE = 'ERROR!';

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature(FromReducer.charactersFeatureKey, FromReducer.reducer),
        EffectsModule.forFeature([CharactersEffects])
      ],
      providers: [
        CharactersFacadeService,
        { provide: CharactersService, useValue: characterService },
        { provide: TranslateService, useValue: translateService },
        { provide: ToastrService, useValue: toastrService }
      ]
    })
    class CustomFeatureModule {}

    @NgModule({
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        CustomFeatureModule
      ]
    })
    class RootModule {}

    TestBed.configureTestingModule({
      imports: [RootModule]
    });

    store = TestBed.inject(Store);
    facadeService = TestBed.inject(CharactersFacadeService);
  });

  describe('getCharacterQuote', () => {
    it('Should call toasterService.error when an error exists', () => {
      const errorTitle = 'character.quote.load'
      characterService.getCharacterQuote.and.returnValue(throwError({ message: ERROR_MESSAGE }));
      translateService.instant.and.returnValue(errorTitle);

      facadeService.getCharacterQuote('name').subscribe(
        () => {},
        error => {
          expect(toastrService.error).toHaveBeenCalledWith(ERROR_MESSAGE, errorTitle);
          expect(translateService.instant).toHaveBeenCalledWith(errorTitle);
        }
      );
    });
  });

  describe('loadCharacterById', () => {
    it('should dispatch loadCharacterById with the setted id', () => {
      const spy = spyOn(store, 'dispatch');
      const characterId = 1;

      facadeService.loadCharacterById(characterId);

      expect(spy).toHaveBeenCalledWith(FromActions.loadCharacterById({id: characterId}));
    });
  });

  describe('loadCharacters', () => {
    it('Should dispatch loadCharacters if are not loaded yet', () => {
      const spy = spyOn(store, 'dispatch');

      facadeService.loadCharacters();

      expect(spy).toHaveBeenCalled();
    });

    it ('should not dispatch because character are loaded', () => {
      const character1 = new CharacterBuilder().random().build();
      const character2 = new CharacterBuilder().random().build();

      store.dispatch(FromActions.loadCharactersSuccess({
        characterList: [
          character1,
          character2
        ]
      }));

      const spy = spyOn(store, 'dispatch');

      facadeService.loadCharacters();

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
