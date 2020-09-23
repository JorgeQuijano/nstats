import { Component, OnInit } from '@angular/core';
import { TeamService } from "../../_services/team/team.service";
import { ModalService } from '../../_modal/modal.service';
import { MatchService } from "../../_services/match/match.service";
import { PagerService } from "../../_services/pagination/pager.service";
import { Team } from "../../_services/team/team";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  pager: any = {};
  tableData = [];
  temptableData = [];
  sortState: string;
  pagedItems: any[];
  currentPage = 1;

  matchLimit = 15;
  teams: any;
  selectedTeam: any;
  sTeamMatches: any;
  teamTableHeaders = [
    {'header': 'Team', 'value': 'teamshortname'},
    {'header': 'Country', 'value': 'countryname'}
  ];

  constructor(
    private teamService: TeamService,
    private pagerService: PagerService
  ) { }

  ngOnInit(): void {
    this.getTeams();
  }

  getTeams():void {
    this.teamService.getTeams()
      .subscribe(x=>{
        this.tableData = x;
        this.temptableData = x;
        this.setPage(this.currentPage);
      })
  }

  searchTeam(event: any):void{
    this.temptableData = this.tableData;
    let term = event.target.value;
    let filteredPersonas = this.temptableData.filter(
      x =>
      x.teamfullname.toLowerCase().includes(term.toLowerCase())
    )
    this.temptableData = filteredPersonas;
    this.setPage(this.pager.currentPage);
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

  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.temptableData.length, page);
    this.pagedItems = this.temptableData.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
