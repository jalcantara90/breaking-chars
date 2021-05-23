import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Character, Quote } from './models/character.model';
import { environment } from '@environment/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCharacters() {
    return this.http.get<Character[]>(`${this.baseUrl}/characters`);
  }

  getCharacterById(characterId: number) {
    return this.http.get<Character[]>(`${this.baseUrl}/characters/${characterId}`).pipe(
      map(characterList => characterList[0])
    );
  }

  getCharacterQuote(characterName: string) {
    const params = new HttpParams({
      fromObject: {
        author: characterName
      }
    });

    return this.http.get<Quote[]>(`${this.baseUrl}/quote/random`, { params }).pipe(
      map(quoteList => quoteList[0]?.quote ?? 'character.hasNotQuotes')
    );
  }
}
