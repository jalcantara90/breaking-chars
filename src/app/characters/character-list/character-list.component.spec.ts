import { CharactersFacadeService } from './../+state/character-facade.service';
import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterListComponent } from './character-list.component';

import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { CharacterBuilder } from '../testing/character.builder';

describe('CharacterListComponent', () => {
  let component: CharacterListComponent;
  let fixture: ComponentFixture<CharacterListComponent>;

  const characterList = [
    new CharacterBuilder().random().build(),
    new CharacterBuilder().random().build(),
    new CharacterBuilder().random().build()
  ];

  const facadeService = {
    characterList$: of(characterList),
    loadCharacters: jasmine.createSpy(),
  }

  let spectator: Spectator<CharacterListComponent>;
  const createComponent = createComponentFactory({
    component: CharacterListComponent,
    providers: [
      { provide: CharactersFacadeService, useValue: facadeService }
    ]
  });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should print a bc-character-card for each character of characterList' , () => {
    const characterCardList = spectator.queryAll('bc-character-card');

    expect(characterCardList.length).toBe(characterList.length);
  });
});
