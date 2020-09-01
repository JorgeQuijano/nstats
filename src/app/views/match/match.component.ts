import { Component, OnInit } from '@angular/core';
import { MatchService } from "../../_services/match/match.service";
import { SeasonService } from "../../_services/season/season.service";
import { TeamService } from "../../_services/team/team.service";
import { ActionService } from "../../_services/action/action.service";
import { PagerService } from "../../_services/pagination/pager.service";
import { ModalService } from '../../_modal/modal.service';

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
    {'header': 'Comp', 'value': 'compcode'},
    {'header': 'Season', 'value': 'seasonname'},
    {'header': 'Stage', 'value': 'stageshort'},
    {'header': 'Date', 'value': 'fmatchdate'},
    {'header': 'T1', 'value': 't1shortname'},
    {'header': 'Result', 'value': 't1goalft'},
    {'header': 'T2', 'value': 't2shortname'},
    {'header': 'Details', 'value': 'details'}
  ];

  filterOptions = [
    {'option': 'Sort ASC'},
    {'option': 'Sort DESC'},
  ];

  constructor(
    private matchService: MatchService,
    private modalService: ModalService,
    private actionService: ActionService,
    private pagerService: PagerService
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
        this.getFilters(res);
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

  filterTable(xvalue:string, xcolumn:string): void {
    if (xvalue == 'all') {
      this.temptableData = this.tableData;
    } else if (xcolumn == 'team' && xvalue !== 'all') {
      this.temptableData =  this.tableData.filter(row => row.t1 == xvalue || row.t2 == xvalue);
    } else {
      this.temptableData =  this.tableData.filter(row => row[xcolumn] == xvalue);
    }
    this.pager = this.pagerService.getPager(this.temptableData.length, this.currentPage);
    this.setPage(this.pager.currentPage);
  }

  matchDetails(mid:number, modalid:string):void {
    this.matchService.getMatchRaw(mid)
      .subscribe(res => {
        this.actionService.getMatchActions(mid)
          .subscribe(x => {
            this.actionService.getMatchActionsSummaryt1(mid)
              .subscribe(xt1 => {
                this.actionService.getMatchActionsSummaryt2(mid)
                  .subscribe(xt2 => {
                    this.t1ActionsSub = xt1.filter(x=> x.actionshort == 'Sub');
                    this.t1ActionsXI = xt1.filter(x=> x.actionshort == 'SXI');
                    this.t2ActionsXI = xt2.filter(x=> x.actionshort == 'SXI');
                    this.t2ActionsSub = xt2.filter(x=> x.actionshort == 'Sub');
                    this.selectedMatchRaw = res;
                    this.selectedMatchID = mid;
                    this.modalService.open(modalid);
                  })
              })
            
          });
      } );    
  }

  setPage(page: number) { 
    // get pager object from service
    this.pager = this.pagerService.getPager(this.temptableData.length, page);

    // get current page of items
    this.pagedItems = this.temptableData.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  getFilters(x:any):void {
    this.comps = this.findUnique(x, d => d.compcode);
    this.comps.sort((a, b) => a.compcode < b.compcode ? -1 : a.compcode > b.compcode ? 1 : 0);
    this.seasons = this.findUnique(x, d => d.season);
    this.seasons.sort((a, b) => a.seasonname < b.seasonname ? 1 : a.seasonname > b.seasonname ? -1 : 0);
    this.uTeams = this.findUnique(x, d => d.t1 || d.t2);
    this.uTeams.sort((a, b) => a.t1shortname < b.t1shortname ? -1 : a.t1shortname > b.t1shortname ? 1 : 0);
  }

  findUnique(arr, predicate) {
    var found = {};
    arr.forEach(d => {
      found[predicate(d)] = d;
    });
    return Object.keys(found).map(key => found[key]); 
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
