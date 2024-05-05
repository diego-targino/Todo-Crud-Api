import { ObjectId } from "mongodb";

export class Category {
  constructor(
    public name: string,
    public color: string,
    public userId: string,
    public _id?: ObjectId
  ) {}
}
