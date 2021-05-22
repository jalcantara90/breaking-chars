import * as fromCharacters from './characters.reducer';
import { selectCharactersState } from './characters.selectors';

describe('Characters Selectors', () => {
  it('should select the feature state', () => {
    const result = selectCharactersState({
      [fromCharacters.charactersFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
