import { Role } from './Role';

export interface Roles {
  _embedded: {
    roleApps: Array<Role>;
  };
}
