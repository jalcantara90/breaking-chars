import { CharacterBuilder } from '../testing/character.builder';
import * as FromCharactersReducer from './characters.reducer';
import * as FromCharacterSelector from './characters.selectors';

describe('Characters Selectors', () => {
  let state: { [FromCharactersReducer.charactersFeatureKey] : FromCharactersReducer.CharactersState };
  const character1 = new CharacterBuilder().random().build();
  const character2 = new CharacterBuilder().random().build();

  beforeEach(() => {
    state = {
      [FromCharactersReducer.charactersFeatureKey]: {
        entities: {
          [character1.char_id]: character1,
          [character2.char_id]: character2
        },
        ids: [
          character1.char_id,
          character2.char_id
        ],
        loaded: false
      }
    };
  })
  it('should select the feature state', () => {
    const result = FromCharacterSelector.selectCharactersState(state);

    expect(result).toEqual(state[FromCharactersReducer.charactersFeatureKey]);
  });

  describe('getCharacters', () => {
    it('should return the stored characters', () => {
      const [
        characterFirst,
        characterSecond
      ] = FromCharacterSelector.getCharacters(state);

      expect(characterFirst).toEqual(character1);
      expect(characterSecond).toEqual(character2);
    });
  });

  describe('getCharacterEntities', () => {
    it('should return the entities stored', () => {
      const result = FromCharacterSelector.getCharacterEntities(state);

      expect(result).toEqual(state[FromCharactersReducer.charactersFeatureKey].entities);
    });
  });

  describe('getCharacterById', () => {
    it('should return the character with the settedId', () => {
      const result = FromCharacterSelector.getCharacterById(character1.char_id)(state);

      expect(result).toEqual(character1);
    });
  });

  describe('areLoaded', () => {
    it('should return the calue of loaded', () => {
      const result = FromCharacterSelector.areLoaded(state);

      expect(result).toEqual(state[FromCharactersReducer.charactersFeatureKey].loaded);
    });
  });
});
