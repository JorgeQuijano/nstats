import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";

import { MatchService } from "../../_services/match/match.service";
import { ActionService } from "../../_services/action/action.service";

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.css']
})
export class MatchDetailsComponent implements OnInit {
  // private sub: any;
  selectedMatchRaw: any;
  matchid: any;

  // t1
  t1ActionsXI: any;
  t1ActionsSub: any;
  t1ActionsMgr: any;

  // t2
  t2ActionsXI: any;
  t2ActionsSub: any;
  t2ActionsMgr: any;

  constructor(
    private route: ActivatedRoute,
    private matchService: MatchService,
    private actionService: ActionService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.matchid = +params.get('id');
      this.getMatchStats();
      this.getMatchActions();
    });
  }

  getMatchStats(): void {
    
    this.matchService.getMatchRaw(this.matchid)
      .subscribe(x => {
        this.selectedMatchRaw = x;
      });
  }

  getMatchActions(): void {
    this.actionService.getMatchActionsSummaryt1(this.matchid)
      .subscribe(xt1 => {
        this.actionService.getMatchActionsSummaryt2(this.matchid)
          .subscribe(xt2 => {
            // t1
            this.t1ActionsSub = xt1.filter(x=> x.actionshort == 'Sub');
            this.t1ActionsXI = xt1.filter(x=> x.actionshort == 'SXI');
            this.t1ActionsMgr = xt1.filter(x=> x.actionshort == 'M');

            // t2
            this.t2ActionsXI = xt2.filter(x=> x.actionshort == 'SXI');
            this.t2ActionsSub = xt2.filter(x=> x.actionshort == 'Sub');
            this.t2ActionsMgr = xt2.filter(x=> x.actionshort == 'M');            
        })
    });
  }
}
