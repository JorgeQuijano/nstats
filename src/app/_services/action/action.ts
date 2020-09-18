export interface Action {
    actionid: number;
    matchid: number;
    personaid: number;
    actiontime: number;
    actiontype: number;
    teamid: number;
    period: number;
  }

export interface ActionRaw {
  actionid: number;
  matchid: number;
  personaid: number;
  actiontime: number;
  actiontypeid: number;
  teamid: number;
  periodid: number;
  action: string;
  actionshort: string;
  firstname: string;
  lastname: string;
  mdate: Date;
  matchdate: string;
  actionteam: string;
  teamagainst: string;
  shortperiod: string;
  season: string;
  compcode: string;
  compid: number;
  seasonid: number;
  persona: string;
}

export interface MatchActionsSummary {
  matchid: number;
  personaid: number;
  teamid: number;
  actionshort: string;
  persona: string;
  firstname: string;
  lastname: string;
  sbo_time: number;
  sbi_time: number;
  wo_time: number;
  gcount: number;
  acount: number;
  ogcount: number;
  ycount: number;
  rcount: number;
}

export interface PersonaSummary {
  personaid: number;
  firstname: string;
  lastname: string;
  notes: string;
  seasonid: number;
  season: string;
  compid: number;
  compcode: string;
  sxi: number;
  sub: number;
  sbi: number;
  sbo: number;
  g: number;
  a: number;
  y: number;
  r: number;
  mp: number;
  ps: number;
  og: number;
  p: number;
  pc: number;
  m: number;
}