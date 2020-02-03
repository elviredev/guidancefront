export interface User {
  id: number;
  username: string;
  password: string;
  activated: boolean;
  // roles: Role;
  // applis: string [];
  _links: {
    self: {
      href: string
    },
    userApp: {
      href: string
    },
    roles: {
      href: string
    },
    applis: {
      href: string
    }
  };
}
