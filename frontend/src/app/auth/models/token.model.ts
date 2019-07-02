import { DjangoUser } from './djangoUser.model';

export class Token {
  constructor(
    public token: string,
    public user: DjangoUser,
  ){}
}
