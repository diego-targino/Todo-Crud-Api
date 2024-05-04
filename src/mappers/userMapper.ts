import { ObjectId } from "mongodb";
import { User } from "../database/Models/user";

export class UserMapper {
  static mapUser(object: any) {
    return new User(
      object.name,
      object.email,
      object.password,
      object.id ? ObjectId.createFromHexString(object.id) : new ObjectId()
    );
  }
}
