import { Component, OnInit } from '@angular/core';
import { MatchService } from "../../_services/match/match.service";
import { PagerService } from "../../_services/pagination/pager.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  tableData = [];
  temptableData = [];
  pager: any = {};
  pagedItems: any[];
  currentPage = 1;
  showfilters = false;
  selectedMatchID: number;
  selectedMatchRaw: any;
  t1ActionsXI: any;
  t1ActionsSub: any;
  t2ActionsXI: any;
  t2ActionsSub: any;
  comps = [];
  seasons = [];
  uTeams = [];
  uniqueFilter = [];
  sortState: string;
  uniqueArray = [];
  tableHeaders = [
    {'header': 'C', 'value': 'compcode'},
    {'header': 'Date', 'value': 'matchdate'},
    {'header': 'T1', 'value': 't1shortname'},
    {'header': 'FT', 'value': 't1goalft'},
    {'header': 'T2', 'value': 't2shortname'}
  ];
  filterOptions = [
    {'option': 'Sort ASC'},
    {'option': 'Sort DESC'},
  ];

  constructor(
    private matchService: MatchService,
    private pagerService: PagerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getMatches();
  }

  getMatches(): void {
    this.matchService.getMatchesRaw()
      .subscribe(res => {
        this.tableData = res;
        this.temptableData = res;
        this.setPage(this.currentPage);
        this.getBetterFilters(res);
      } );
  }

  sortTable(x:string): void {
    if (this.sortState == undefined) {
      this.temptableData.sort((a, b) => a[x] < b[x] ? -1 : a[x] > b[x] ? 1 : 0);
      this.sortState = 'asc'
    } else if (this.sortState == 'desc'){
      this.temptableData.sort((a, b) => a[x] < b[x] ? 1 : a[x] > b[x] ? -1 : 0);
      this.sortState = 'asc'
    } else if (this.sortState == 'asc'){
      this.temptableData.sort((a, b) => a[x] < b[x] ? -1 : a[x] > b[x] ? 1 : 0);
      this.sortState = 'desc'
    }
    this.pager = this.pagerService.getPager(this.temptableData.length, this.currentPage);
    this.setPage(this.pager.currentPage);
  }

  filterTable(comp: any, season: any, team: any): void {
    this.temptableData = this.tableData.filter(x =>
      (comp === 'all' ? x.comp == x.comp : x.comp == comp) &&
      (season === 'all' ? x.season == x.season : x.season == season) &&
      (
        team === 'all' ? x.t1 == x.t1 : x.t1 == team ||
        team === 'all' ? x.t2 == x.t2 : x.t2 == team
      )      
    );
    
    this.pager = this.pagerService.getPager(this.temptableData.length, this.currentPage);
    this.setPage(this.pager.currentPage);
  }

  matchDetails(mid:string):void {
    let url = this.router.serializeUrl(
      this.router.createUrlTree([mid])
    );
  }

  setPage(page: number) { 
    this.pager = this.pagerService.getPager(this.temptableData.length, page);

    this.pagedItems = this.temptableData.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  getBetterFilters(x: any): void {
    let myComps = [... new Set(x.map(data => (
      {'comp': data.comp, 'compname': data.compname})))];
    let mySeasons = [... new Set(x.map(data => (
      {'season': data.season, 'seasonname': data.seasonname})))];
    let myTeams1 = [... new Set(x.map(data => (
      {'team': data.t1, 'teamshortname': data.t1shortname})))];
    let myTeams2 = [... new Set(x.map(data => (
      {'team': data.t2, 'teamshortname': data.t2shortname})))];
    let allTeams = myTeams1.concat(myTeams2);
    
    this.comps = this.findUnique(myComps, d => d.compname);
    this.seasons = this.findUnique(mySeasons, d => d.season);
    this.uTeams = this.findUnique(allTeams, d => d.team);
    this.comps.sort((a, b) => a.compname < b.compname ? -1 : a.compname > b.compname ? 1 : 0);
    this.seasons.sort((a, b) => a.seasonname < b.seasonname ? 1 : a.seasonname > b.seasonname ? -1 : 0);
    this.uTeams.sort((a, b) => a.teamshortname < b.teamshortname ? -1 : a.teamshortname > b.teamshortname ? 1 : 0);
  }

  hidefilters(): void {
    this.showfilters = !this.showfilters;
  }

  findUnique(arr, predicate) {
    var found = {};
    arr.forEach(d => {
      found[predicate(d)] = d;
    });
    return Object.keys(found).map(key => found[key]); 
  }
  
}
