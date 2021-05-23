import { reducer, initialState } from './characters.reducer';
import * as FromCharacterActions from './characters.actions';
import { CharacterBuilder } from '../testing/character.builder';

describe('Characters Reducer', () => {
  describe('On loadCharactersSuccess', () => {
    it('Should update the entities and Ids', () => {
      const character1 = new CharacterBuilder().random().build();
      const character2 = new CharacterBuilder().random().build();
      const characterList = [
        character1,
        character2
      ];
      const action = FromCharacterActions.loadCharactersSuccess({characterList});

      const {
        entities,
        ids,
        loaded
      } = reducer(initialState, action);

      expect(entities[character1.char_id]).toEqual(character1);
      expect(entities[character2.char_id]).toEqual(character2);
      expect(ids.length).toBe(characterList.length);
      expect(loaded).toBeTrue();
    });
  });

  describe('On loadCharacterByIdSuccess', () => {
    it('Should add character if not exist', () => {
      const character = new CharacterBuilder().random().build();
      const action = FromCharacterActions.loadCharacterByIdSuccess({character});

      const {
        entities,
        ids
      } = reducer(initialState, action);

      expect(entities[character.char_id]).toEqual(character);
      expect(ids.length).toBe(1);
      expect(ids[0]).toEqual(character.char_id);
    });

    it('Should not add if the character exists yet in the store', () => {
      const character = new CharacterBuilder().random().build();
      const updatedState = {
        ...initialState,
        ids: [character.char_id],
        entities: {
          [character.char_id]: character
        }
      };

      const action = FromCharacterActions.loadCharacterByIdSuccess({character});

      const {
        entities,
        ids
      } = reducer(updatedState, action);

      expect(entities[character.char_id]).toEqual(character);
      expect(ids.length).toBe(1);
      expect(ids[0]).toEqual(character.char_id);
    });
  })
});
