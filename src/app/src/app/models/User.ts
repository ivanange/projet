// import { DateTime } from 'luxon';
export class Credentials {
  public password: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public _phone?: string;

  get phone(): string {
    // eslint-disable-next-line no-underscore-dangle
    return this._phone.replace(/(\+?237)?(\d+)/, '+237$2');
  }

  set phone(phone: string) {
    // eslint-disable-next-line no-underscore-dangle
    this._phone = phone.replace(/(\+?237)?(\d+)/, '+237$2');
  }
}
export class UnregisteredUser extends Credentials {
  public first_name: string;
  public last_name: string;
  public confirmed?: boolean;

  get name(): string {
    return this.first_name + ' ' + this.last_name;
  }

  set name(name: string) {
    [this.first_name, this.last_name] = name.split(' ');
  }

}

export class User extends UnregisteredUser {
  public id: number;
  public last_login: string;
  public confidence: number;
  public email?: string;
  public address?: string;
  public settings?: string;

}

export interface Details {
  valeur: number;
  tendance: number;
}
export class UserDetail extends User {
  total_declarer: number;
  total_confirmer: number;
  total_infirmer: number;
  declarer: Details;
  infirmer: Details;
  confirmer: Details;
}


// export interface UserAllResponse extends Response {
//   data: User[];
// }

// export interface Adress {
//   postalCode: string;
//   city: string;
//   country: string;
// }

