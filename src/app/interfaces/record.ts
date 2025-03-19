export interface Record {
  name: string;
  surname: string;
  phone: string;
  email: string;
  country: string;
  state: string;
  [key: string]: string;
}
