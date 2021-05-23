import { environment } from '@environment/environment';

import { CharactersService } from './characters.service';
import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';

describe('CharactersService', () => {
  let spectator: SpectatorHttp<CharactersService>;
  const createHttp = createHttpFactory(CharactersService);

  beforeEach(() => spectator = createHttp());

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('getCharacters', () => {
    it(`should call ${environment.apiUrl}/characters with GET method`, () => {
      spectator.service.getCharacters().subscribe();
      spectator.expectOne(`${environment.apiUrl}/characters`, HttpMethod.GET);
    });
  });

  describe('getCharacterById', () => {
    const characterId = 1;
    it(`should call ${environment.apiUrl}/characters/${characterId} with GET method`, () => {
      spectator.service.getCharacterById(characterId).subscribe();
      spectator.expectOne(`${environment.apiUrl}/characters/${characterId}`, HttpMethod.GET);
    });
  });

  describe('getCharacterQuote', () => {
    const characterName = 'testChar';
    it(`should call ${environment.apiUrl}/characters/${characterName} with GET method`, () => {
      spectator.service.getCharacterQuote(characterName).subscribe();
      const req = spectator.expectOne(
        `${environment.apiUrl}/quote/random?author=${characterName}`,
        HttpMethod.GET
      );

      expect(req.request.params.get('author')).toBe(characterName);
    });
  });
});
