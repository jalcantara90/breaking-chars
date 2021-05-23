import { Character, Status, Category } from './../models/character.model';

import * as facker from 'faker';

export class CharacterBuilder {
  private character: Character;

  constructor() {
    this.character = {
      char_id: 1,
      name: '',
      birthday: new Date(),
      occupation: [],
      img: '',
      status: Status.Unknown,
      nickname: '',
      appearance: [],
      portrayed: '',
      category: Category.BreakingBad,
      better_call_saul_appearance: []
    }
  }

  random(): CharacterBuilder {
    this.character = {
      char_id: facker.datatype.float(),
      name: facker.name.findName(),
      birthday: new Date(),
      occupation: [
        facker.name.jobTitle()
      ],
      img: facker.internet.url(),
      status: Status.Unknown,
      nickname: facker.name.findName(),
      appearance: [],
      portrayed: facker.name.findName(),
      category: Category.BreakingBad,
      better_call_saul_appearance: []
    }
    return this;
  }

  build(): Character {
    return this.character;
  }
}
