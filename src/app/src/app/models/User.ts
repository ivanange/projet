import { Incident } from './Incident';
// import { DateTime } from 'luxon';
import { Role } from './Role';

// export class UnregisteredUser {
//   public name: string;
//   public email: string;
//   public password: string;
//   public confirmed?: boolean;
//   public gender?: string;
//   public birth?: string;
//   public is_enterprise?: boolean;
//   public phone?: string;
//   public address?: string;
//   public nic_image?: FileList;
//   public nic?: string;
//   public siren?: string;
//   public picture?: File;
//   public profession?: string;
// }

// export class User extends UnregisteredUser {
//   public id: string;
//   public created_at: string;
//   public updated_at: string;
//   public object?: string;
//   public nic_images?: string[];
//   public avatar?: string;
//   public projects?: { data: Project[] };
//   public roles?: { data: Role[] };
//   public notification_categories: string[];

//   get readableBirth(): string {
//     return this.birth
//       ? DateTime.fromISO(this.birth).toLocaleString(
//         DateTime.DATE_MED_WITH_WEEKDAY
//       )
//       : undefined;
//   }

//   get addresses(): Adress {
//     const addresses: string[] = (this.address || ',,')
//       .split(',')
//       .map((address) => address.trim());
//     return {
//       postalCode: addresses[0],
//       city: addresses[1],
//       country: addresses[2],
//     };
//   }

//   set addresses(address: Adress) {
//     // tslint:disable-next-line: max-line-length
//     this.address = `${address.postalCode || ''} ${address.city ? ',' + address.city : ''} ${address.country ? ',' + address.country : ''}`.trim();
//   }


//   get filledPersonalInfos(): boolean {
//     return ['name', 'gender', 'birth', 'phone', 'profession', 'address']
//       .concat(this.is_enterprise ? ['siren'] : ['nic']).filter(key => !this[key]).length === 0;
//   }

//   get filledDocuments(): boolean {
//     return ['avatar', 'nic_images'].filter(key => !this[key]).length === 0;
//   }

//   get filledAll(): boolean {
//     return this.filledDocuments && this.filledPersonalInfos;
//   }

//   get verified(): boolean {
//     return this.roles.data.find((role) => role.name === 'verified') ? true : false;
//   }

//   get waiting(): boolean {
//     return this.roles.data.find((role) => role.name === 'waiting_verification') ? true : false;
//   }

//   get admin(): boolean {
//     return this.roles.data.find((role) => role.name === 'admin') ? true : false;
//   }

// }

// export interface UserResponse extends Response {
//   data: User;
// }

// export interface UserAllResponse extends Response {
//   data: User[];
// }

// export interface Adress {
//   postalCode: string;
//   city: string;
//   country: string;
// }

