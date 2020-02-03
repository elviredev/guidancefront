export interface Appli {
  /* id: number;
  idAppliKM: string;
  appliName: string;
  contents: []; */
  id: number;
  idAppliKM: string;
  appliName: string;
  _links: {
    self: {
      href: string
    },
    appli: {
      href: string
    },
    contents: {
      href: string
    },
    users: {
      href: string
    }
  };
}
