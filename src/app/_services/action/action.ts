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