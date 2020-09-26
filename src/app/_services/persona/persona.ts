export interface Persona {
    personaid: number;
    fullname: string;
    firstname: string;
    lastname: string;
    nationality: string;
    citizenship: string;
    dob: Date;
    notes: string;
    fdob: string;
  }

export interface PersonaRaw {
  personaid: number;
  fullname: string;
  firstname: string;
  lastname: string;
  nationality: string;
  citizenship: string;
  dob: Date;
  notes: string;
  fdob: string;
  nat_country: string;
  cit_country: string;
}