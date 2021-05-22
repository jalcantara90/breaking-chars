import { createEntityAdapter } from "@ngrx/entity";
import { Character } from "../models/character.model";

export const adapter = createEntityAdapter<Character>({
  selectId: (character: Character) => character.char_id
});

export const{
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();
