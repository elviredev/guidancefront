export interface Role {
  id: number;
  roleName: string;
  _links: {
    self: {
      href: string
    },
    roleApp: {
      href: string
    }
  };
}
