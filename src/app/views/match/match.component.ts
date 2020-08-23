import { Component, OnInit } from '@angular/core';
import { MatchService } from "../../_services/match/match.service";
import { CompService } from "../../_services/comp/comp.service";
import { SeasonService } from "../../_services/season/season.service";
import { TeamService } from "../../_services/team/team.service";

import { ModalService } from '../../_modal/modal.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  tableData = [];
  temptableData = [];
  selectedMatchID: number;
  selectedMatchRaw: any;
  comps = [];
  seasons = [];
  teams = [];
  sortState: string;
  uniqueArray = [];
  tableHeaders = [
    {'header': 'MID', 'value': 'matchid'},
    {'header': 'Comp', 'value': 'compcode'},
    {'header': 'Season', 'value': 'seasonname'},
    {'header': 'Stage', 'value': 'stageshort'},
    {'header': 'Date', 'value': 'fmatchdate'},
    {'header': 'HTeam', 'value': 't1shortname'},
    {'header': 'Result', 'value': 't1goalft'},
    {'header': 'ATeam', 'value': 't2shortname'},
    {'header': 'Stadium', 'value': 'stadiumname'},
    {'header': 'Neutral', 'value': 'neutral_match'},
    {'header': 'Details', 'value': 'details'}
  ];

  filterOptions = [
    {'option': 'Sort ASC'},
    {'option': 'Sort DESC'},
  ];

  constructor(
    private matchService: MatchService,
    private compService: CompService,
    private seasonService: SeasonService,
    private teamService: TeamService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.getMatches();
    this.getComps();
    this.getSeasons();
    this.getTeams();
  }
  getMatches(): void {
    this.matchService.getMatchesRaw()
      .subscribe(res => {
        this.tableData = res;
        this.temptableData = res;
      } );
  }

  getComps(): void {
    this.compService.getComps()
      .subscribe(res => {
        this.comps = res;
      } );
  }

  getSeasons(): void {
    this.seasonService.getSeasons()
      .subscribe(res => {
        this.seasons = res;
      } );
  }

  getTeams(): void {
    this.teamService.getTeams()
      .subscribe(res => {
        this.teams = res;
      } );
  }

  sortTable(x:string): void {
    if (this.sortState == undefined) {
      console.log(this.sortState);
      this.temptableData.sort((a, b) => a[x] < b[x] ? -1 : a[x] > b[x] ? 1 : 0);
      this.sortState = 'asc'
    } else if (this.sortState == 'desc'){
      console.log(this.sortState);
      this.temptableData.sort((a, b) => a[x] < b[x] ? 1 : a[x] > b[x] ? -1 : 0);
      this.sortState = 'asc'
    } else if (this.sortState == 'asc'){
      console.log(this.sortState);
      this.temptableData.sort((a, b) => a[x] < b[x] ? -1 : a[x] > b[x] ? 1 : 0);
      this.sortState = 'desc'
    }
    
  }

  filterTable(x:string, ft:string): void {
    console.log(x);
    console.log(ft);
    if (x == 'all') {
      this.temptableData = this.tableData;
    } else if (ft == 'team' && x !== 'all') {
      this.temptableData =  this.tableData.filter(row => row.t1 == x || row.t2 == x);
    } else {
      this.temptableData =  this.tableData.filter(row => row[ft] == x);
    }
  }

  matchDetails(mid:number, modalid:string):void {
    this.matchService.getMatchRaw(mid)
      .subscribe(res => {
        this.selectedMatchRaw = res;
        this.selectedMatchID = mid;
        this.modalService.open(modalid);
      } );    
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
