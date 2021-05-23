import { Character } from '../models/character.model';
import { EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as CharactersActions from './characters.actions';
import * as FromAdapter from './characters.adapter';

export const charactersFeatureKey = 'characters';

export interface CharactersState extends EntityState<Character> {
  loaded: boolean;
}

export const initialState: CharactersState = FromAdapter.adapter.getInitialState({
  loaded: false
});


export const reducer = createReducer(
  initialState,
  on(CharactersActions.loadCharactersSuccess, (state, {characterList}) => FromAdapter.adapter.addMany(characterList, {...state, loaded: true})),
  on(CharactersActions.loadCharacterByIdSuccess, (state, { character }) => FromAdapter.adapter.addOne(character, {...state})),
);

