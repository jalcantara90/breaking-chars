export interface Character {
  char_id: number;
  name: string;
  birthday: Date;
  occupation: string[];
  img: string;
  status: StatusType;
  nickname: string;
  appearance: number[];
  portrayed: string;
  category: CategoryType;
  better_call_saul_appearance: number[];
}

export enum Category {
  BetterCallSaul = 'Better Call Saul',
  BreakingBad = 'Breaking Bad',
  BreakingBadBetterCallSaul = 'Breaking Bad, Better Call Saul',
}

export enum Status {
  Alive = 'Alive',
  Deceased = 'Deceased',
  PresumedDead = 'Presumed dead',
  Unknown = 'Unknown',
}

export type StatusType = `${Status}`;

export type CategoryType = `${Category}`;
