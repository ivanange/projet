// import { Duration, DateTime } from 'luxon';

import { Category } from './Category';

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
  public videos: string;
  public audios: string;
  public images: string;
  public category: Category;
  public confidence: number;

  get place(): Location {
    return JSON.parse(this.locations) || {
      country: '',
      region: '',
      city: '',
      address: '',
    };
  }

  set place(place: Location) {
    JSON.stringify(place);
  }

  get photos(): string[] {
    return JSON.parse(this.images) || [];
  }

  get music(): string[] {
    return JSON.parse(this.audios) || [];
  }

  get clips(): string[] {
    return JSON.parse(this.videos) || [];
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
  next: string | null;
  results: Incident[];
}

