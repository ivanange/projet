// eslint-disable @typescript-eslint/naming-convention
// import { Duration, DateTime } from 'luxon';

import { Category } from "./Category";

export interface Location {
  address: string;
  city: string;
  region: string;
  country: string;
}

export class UnregisteredIncident {
  public title: string;
  public textual_description: string;
  public category_id: number;
  public locations: string;
  public start_date: string;
  public end_date: string;
  public videos: string[];
  public audios: string[];
  public images: string[];
  public category: Category;

  get place(): Location {
    return JSON.parse(this.locations);
  }

  set place(place: Location) {
    JSON.stringify(place);
  }
}

export class Incident extends UnregisteredIncident {

  public id: number;

}


// export interface IncidentResponse extends Response {
//   data: Incident;
// }

export interface IncidentAllResponse extends Response {
  count: number;
  previous: number | null;
  next: number | null;
  results: Incident[];
}

