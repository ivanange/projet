export class Category {
  public id?: string;
  public name: string;
  public description: string;
}

export interface CategoryResponse extends Response {
  data: Category;
}

export interface CategoryAllResponse extends Response {
  data: Category[];
}
