import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { MatchService } from "../../_services/match/match.service";
import { TeamService } from "../../_services/team/team.service";

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {
  selectedTeam: any;
  sTeamMatches: any;

  matchLimit = 15;

  matchTableHeaders = [
    {'header': 'Date', 'value': 'matchdate'},
    {'header': 'C', 'value': 'compcode'},
    {'header': 'Side', 'value': 'side'},
    {'header': 'Score', 'value': 'score'},
    {'header': 'Against', 'value': 'against'},
    {'header': 'FT', 'value': 'resultft'},
    // {'header': 'HT', 'value': 'htscore'},
    // {'header': 'HT', 'value': 'resultht'}
  ];

  constructor(
    private route: ActivatedRoute,
    private matchService: MatchService,
    private teamService: TeamService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getTeam(+params['id'])
      this.teamRecentMatches(+params['id']);
    });
  }

  teamRecentMatches(team: number): void {
    // Fixed limit (15 matches), we can change this later -----TBD------
    this.matchService.getSincleColumnMatches(team, this.matchLimit)
      .subscribe(x=> {
        this.sTeamMatches = x;
      });
  }

  getTeam(teamid: number):void {
    this.teamService.getTeam(teamid)
      .subscribe(x => {
        this.selectedTeam = x;
      })
  }

}
