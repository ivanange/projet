import { Category } from './Category';
// import { User } from './User';
import { Response } from './Response';
// import { Duration, DateTime } from 'luxon';

export class UnregisteredIncident {
  public title: string;
  public textual_description: string;
  public category_id: number;
  public location: string;
  public date: string;
  public end_date: string;
  public videos: string;
  public audios: string;
  public images: string;
}

export class Incident extends UnregisteredIncident {

  public id: number;

}

export interface IncidentResponse extends Response {
  data: Incident;
}

export interface IncidentAllResponse extends Response {
  data: Incident[];
}

