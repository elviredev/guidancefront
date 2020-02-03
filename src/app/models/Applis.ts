import { Appli } from './Appli';

export interface Applis {
  _embedded: {
    applis: Array<Appli>;
  };
}
