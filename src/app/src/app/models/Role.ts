

export class UnregisteredRole {
  public name: string;
  public descriptionoptionnel: string;
  public display_nameoptionnel: string;
}

export class Role extends UnregisteredRole {
  public id: string;
  public level: number;
  public permissions: { data: Permission[] };
}

export interface RoleResponse extends Response {
  data: Role;
}

export interface RoleAllResponse extends Response {
  data: Role[];
}

export interface Permission {
  name: string;
  display_name: string;
  description: string;
  id: string;
}

export interface Assign {
  user_id: string;
  roles_ids: string[];
}
