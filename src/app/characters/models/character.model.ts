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

export interface Quote {
  quote_id: number;
  quote: string;
  author: string;
  series: string;
}

export enum Status {
  Alive = 'Alive',
  Deceased = 'Deceased',
  PresumedDead = 'Presumed dead',
  Unknown = 'Unknown',
}

export const statusColor = new Map<StatusType, string | undefined>([
  [Status.Alive, 'primary'],
  [Status.PresumedDead, 'warn'],
  [Status.Deceased, 'accent'],
  [Status.Unknown, undefined]
]);

export type StatusType = `${Status}`;

export type CategoryType = `${Category}`;
