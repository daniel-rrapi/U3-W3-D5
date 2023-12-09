export interface AuthData {
  accessToken: string;
  user: {
    id: Number;
    email: string;
    nome: string;
    cognome: string;
  };
}
