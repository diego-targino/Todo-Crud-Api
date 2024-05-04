import { ObjectId } from "mongodb";
import { Todo } from "../database/Models/todo";

export class TodoMaper {
  static mapTodo(object: any): Todo {
    return new Todo(
      object.description,
      object.completed ?? false,
      object.userId,
      object.id ? ObjectId.createFromHexString(object.id) : new ObjectId()
    );
  }
}
