import { Category } from './Category';
import { User } from './User';
import { Response } from './Response';
import { Duration, DateTime } from 'luxon';

export class UnregisteredProject {
  public name: string;
  public duration: number;
  public interest_rate: number;
  public min_amount: number;
  public max_amount: number;
  public description: string;
  public category_id: string;
  public reimbursement_deadline: string;
  public funding_deadline: string;
  public documents: FileList;
}

export class Project extends UnregisteredProject {
  public static readonly icons = {
    immobilier: 'far fa-building',
    agriculture: 'fas fa-tractor',
    numerique: 'fas fa-laptop',
    'energies renouvellable': 'fas fa-tree',
    santé: 'fas fa-notes-medical',
    environement: 'fas fa-globe-africa',
    media: 'fas fa-photo-video',
    nutrition: 'fas fa-utensils',
    education: 'fas fa-graduation-cap',
  };

  public static readonly types = {
    pdf: 'far fa-file-pdf',
    jpg: 'far fa-file-image',
    jpeg: 'far fa-file-image',
    webp: 'far fa-file-image',
    png: 'far fa-file-image',
    gif: 'far fa-file-image',
    mp4: 'far fa-file-video',
    ogg: 'far fa-file-video',
    avi: 'far fa-file-video',
    ppt: 'far fa-file-powerpoint',
    pptx: 'far fa-file-powerpoint',
    uop: 'far fa-file-powerpoint',
    odp: 'far fa-file-powerpoint',
    sdd: 'far fa-file-powerpoint',
    doc: 'far fa-file-word',
    docx: 'far fa-file-word',
    odt: 'far fa-file-word',
    sdw: 'far fa-file-word',
    uot: 'far fa-file-word',
    xls: 'far fa-file-excel',
    xlsx: 'far fa-file-excel',
    ods: 'far fa-file-excel',
    sdc: 'far fa-file-excel',
    uos: 'far fa-file-excel',
    csv: 'fas fa-file-csv',

    other: 'far fa-file',
  };

  public id: string;
  public user: { data: User };
  public category: { data: Category };
  public object: string;
  public amount: number;
  public min_remainder: number;
  public remainder: number;
  public max_remainder: number;
  public created_at: string;
  public updated_at: string;
  public reliability: number;
  public status: string;
  public files: ProjectDocument[];

  type(name: string): string {
    const ext: string = (/\.([^\.]+)$/.exec(name) || ['', ''])[1];
    return ext ? Project.types[ext.toLowerCase()] : Project.types.other;
  }

  get financed(): number {
    return this.amount - this.remainder;
  }

  get percentage(): number {
    return (this.financed / this.amount) * 100;
  }

  get readableDuration(): string {
    const duration = Duration.fromObject({ days: this.duration })
      .shiftTo('years', 'months', 'days')
      .toObject();
    return `${duration.years ? duration.years + ' ans' : ''}${
      duration.months ? ', ' + duration.months + ' mois' : ''
    } ${duration.days ? ' et ' + duration.days + ' jours' : ''}`.replace(/(?:^\s*,)?([A-z0-9\s,]+)(?:,\s*)?/, '$1');
  }

  get readableFundindDeadLine(): string {
    return this.format(this.funding_deadline);
  }

  format(date: string): string {
    return DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED);
  }

  get categoryIcon(): string {
    return Project.icons[this.category.data.name.toLowerCase()];
  }

  // readable status
  get readableStatus(): string {
    switch (this.status) {
      case 'active':
        return 'En cours';
      case 'inactive':
        return 'En Attente de Validation';
      case 'funded':
        return 'Financé';
      case 'not_funded':
        return 'Non Financé dans les délais';
      default:
        break;
    }
  }

  get images(): ProjectDocument[] {
    return this.files.filter((document) =>
      /\.(jpeg|jpg|png|gif|webp)$/g.test(document.path)
    );
  }
}

export interface ProjectResponse extends Response {
  data: Project;
}

export interface ProjectAllResponse extends Response {
  data: Project[];
}

export interface ProjectDocument {
  id: string;
  name: string;
  path: string;
  url: string;
}
