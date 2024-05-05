import { ObjectId } from "mongodb";
import { Category } from "../database/Models/category";

export class CategoryMapper {
  static mapCategory(object: any) {
    return new Category(
      object.name,
      object.color,
      object.userId,
      object.id ? ObjectId.createFromHexString(object.id) : new ObjectId()
    );
  }
}
