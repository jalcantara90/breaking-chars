import { Character } from './../models/character.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCharacters from './characters.reducer';
import * as FromAdapter from './characters.adapter';
import { Dictionary } from '@ngrx/entity';

export const selectCharactersState = createFeatureSelector<fromCharacters.CharactersState>(
  fromCharacters.charactersFeatureKey
);

export const getCharacters = createSelector(
  selectCharactersState,
  FromAdapter.selectAll
);

export const getCharacterEntities = createSelector(
  selectCharactersState,
  FromAdapter.selectEntities
);

export const getCharacterById = (characterId: number) => createSelector(
  getCharacterEntities,
  (characterList:  Dictionary<Character>) => characterList[characterId] || {} as Character
);

export const areLoaded = createSelector(
  selectCharactersState,
  (state) => state.loaded
);

export const isLoading = createSelector(
  selectCharactersState,
  state => state.isLoading
);
