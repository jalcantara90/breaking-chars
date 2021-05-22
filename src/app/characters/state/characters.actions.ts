import { Character } from '../models/character.model';
import { createAction, props } from '@ngrx/store';

export const loadCharacters = createAction(
  '[Characters] Load Characters'
);

export const loadCharactersSuccess = createAction(
  '[Characters] Load Characters Success',
  props<{ characterList: Character[] }>()
);

export const loadCharactersFailure = createAction(
  '[Characters] Load Characters Failure',
  props<{ error: string }>()
);

export const loadCharacterById = createAction(
  '[Characters details] Load Character By Id',
  props<{ id: number }>()
);

export const loadCharacterByIdSuccess = createAction(
  '[Characters details] Load Character By Id Success',
  props<{ character: Character }>()
);

export const loadCharacterByIdFailure = createAction(
  '[Characters details] Load Character By Id Failure',
  props<{ error: string }>()
);
