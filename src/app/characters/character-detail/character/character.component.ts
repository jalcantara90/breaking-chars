import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { CharactersFacadeService } from './../../+state/character-facade.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from '../../models/character.model';
import { filter, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'bc-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  character$!: Observable<Character>;
  characterQuote$!: Observable<string>;
  isLoading$!: Observable<boolean>;

  constructor(private router: ActivatedRoute, private charactersFacadeService: CharactersFacadeService) { }

  ngOnInit(): void {
    this.character$ = this.router.params.pipe(
      switchMap(({id}) =>
        this.charactersFacadeService.getCharacter(id).pipe(
          tap(character => {
            if (!character?.char_id) {
              this.charactersFacadeService.loadCharacterById(id);
            }
          })
        )
      )
    );

    this.characterQuote$ = this.character$.pipe(
      filter(character => !!character?.name),
      switchMap(character => this.charactersFacadeService.getCharacterQuote(character.name)),
      catchError(() => of(''))
    );
  }
}
