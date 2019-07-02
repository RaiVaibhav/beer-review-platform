export class DjangoUser {
  constructor(
    public pk: Number,
    public username: string,
    public email: string,
    public first_name: string,
    public last_name: string,
  ){}
}
