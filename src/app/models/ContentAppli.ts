export interface ContentAppli {
  id: number;
  idContentKM: string;
  contentName: string;
  published: boolean;
  typeService: string;
  nbAffichages: number;
  nbLectures: number;
  _links: {
    self: {
      href: string
    },
    content: {
      href: string
    },
    appli: {
      href: string
    }
  };
}
