import { Character } from './models/character.model';
import { environment } from '@environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCharacters() {
    return this.http.get<Character[]>(`${this.baseUrl}/characters`);
  }
}
