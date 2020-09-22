import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatchService } from "../../_services/match/match.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  matches = [];
  comps = [];
  tableHeaders = [
    {'header': 'C', 'value': 'compcode'},
    {'header': 'Date', 'value': 'fmatchdate'},
    {'header': 'T1', 'value': 't1shortname'},
    {'header': 'FT', 'value': 't1goalft'},
    {'header': 'T2', 'value': 't2shortname'}
  ];
  selectedMatchID: number;
  selectedMatchRaw: any;
  t1ActionsXI: any;
  t1ActionsSub: any;
  t2ActionsXI: any;
  t2ActionsSub: any;
  sortState: string;

  constructor(
    private matchService: MatchService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getLastxMatches();
  }

  getLastxMatches():void {
    this.matchService.getMatchRawL7()
      .subscribe(res => {
        this.matches = res;
        this.getComps(res);
      })
  }

  matchDetails(mid:string):void {
    this.router.navigate([]).then(result => {  window.open(mid, '_blank'); });
  }

  sortTable(x:string): void {
    if (this.sortState == undefined) {
      this.matches.sort((a, b) => a[x] < b[x] ? -1 : a[x] > b[x] ? 1 : 0);
      this.sortState = 'asc'
    } else if (this.sortState == 'desc'){
      this.matches.sort((a, b) => a[x] < b[x] ? 1 : a[x] > b[x] ? -1 : 0);
      this.sortState = 'asc'
    } else if (this.sortState == 'asc'){
      this.matches.sort((a, b) => a[x] < b[x] ? -1 : a[x] > b[x] ? 1 : 0);
      this.sortState = 'desc'
    }
  }

  getComps(x:any):void {
    this.comps = this.findUnique(x, y => y.compcode);
    
  }

  findUnique(arr: any, predicate: any) {
    let hash = [];
    for (let i = 0; i < arr.length; i++) {
        if (!hash[arr[i][predicate]]) hash[arr[i][predicate]] = [];
        hash[arr[i][predicate]].push(arr[i]);
    }
    return hash;
  }
}
