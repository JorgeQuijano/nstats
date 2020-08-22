import { Component, OnInit } from '@angular/core';
import { PersonaService } from "../../_services/persona/persona.service";

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  tableData = [];
  temptableData = [];
  sortState: string;
  tableHeaders = [
    {'header': 'PID', 'value': 'personaid'},
    {'header': 'First Name', 'value': 'firstname'},
    {'header': 'Last Name', 'value': 'lastname'},
    {'header': 'Nationality', 'value': 'nationality'},
    {'header': 'Citizenship', 'value': 'citizenship'},
    {'header': 'Date of Birth (YMD)', 'value': 'fdob'},
    {'header': 'Nickname', 'value': 'notes'}
  ];

  constructor(
    private personaService: PersonaService
  ) { }

  ngOnInit(): void {
    this.gerPersonas();
  }
  

  gerPersonas(): void {
    this.personaService.getPersonas()
      .subscribe(res => {
        this.tableData = res;
        this.temptableData = res;
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

}
