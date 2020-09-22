import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatchService } from "../../_services/match/match.service";
import { ActionService } from "../../_services/action/action.service";
// import { ModalService } from '../../_modal/modal.service';


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
    // {'header': 'Season', 'value': 'seasonname'},
    // {'header': 'Stage', 'value': 'stageshort'},
    {'header': 'Date', 'value': 'fmatchdate'},
    {'header': 'T1', 'value': 't1shortname'},
    {'header': 'FT', 'value': 't1goalft'},
    {'header': 'T2', 'value': 't2shortname'},
    // {'header': 'Details', 'value': 'details'}
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
    private actionService: ActionService,
    // private modalService: ModalService,
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
    // this.matchService.getMatchRaw(mid)
    //   .subscribe(res => {
    //     this.actionService.getMatchActions(mid)
    //       .subscribe(x => {
    //         this.actionService.getMatchActionsSummaryt1(mid)
    //           .subscribe(xt1 => {
    //             this.actionService.getMatchActionsSummaryt2(mid)
    //               .subscribe(xt2 => {
    //                 this.t1ActionsSub = xt1.filter(x=> x.actionshort == 'Sub');
    //                 this.t1ActionsXI = xt1.filter(x=> x.actionshort == 'SXI');
    //                 this.t2ActionsXI = xt2.filter(x=> x.actionshort == 'SXI');
    //                 this.t2ActionsSub = xt2.filter(x=> x.actionshort == 'Sub');
    //                 this.selectedMatchRaw = res;
    //                 this.selectedMatchID = mid;
    //                 this.modalService.open(modalid);
    //               })
    //           })
            
    //       });
    //   } );
    // let url = this.router.serializeUrl(
    //   this.router.createUrlTree([mid])
    // );
    // window.open()

    this.router.navigate([]).then(result => {  window.open(mid, '_blank'); });
    // window.open(mid, '_blank');
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

  // closeModal(id: string) {
  //   this.modalService.close(id);
  // }

}
