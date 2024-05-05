import { Collection, ObjectId, Document } from "mongodb";
import { Todo } from "../Models/todo";
import { GetCollection } from "../configuration/mongoConfiguration";

export class TodoRepository {
  async GetTodoList(userId: string, categoryId?: string): Promise<Todo[]> {
    const todoCollection = await GetCollection("todos");

    let query = { userId: userId, categoryId: categoryId };

    if (!categoryId) delete query.categoryId;

    const todos = await todoCollection.find({ userId: userId }).toArray();

    return todos.map(
      (todo) =>
        new Todo(
          todo.description,
          todo.completed,
          todo.userId,
          todo._id,
          todo.categoryId
        )
    );
  }

  async GetTodoById(id?: string): Promise<Todo | undefined> {
    const todoCollection: Collection<Document> = await GetCollection("todos");

    const todo = await todoCollection.findOne({
      _id: ObjectId.createFromHexString(id || ""),
    });

    if (todo)
      return new Todo(
        todo.description,
        todo.completed,
        todo.userId,
        todo._id,
        todo.categoryId
      );
  }

  async AddTodo(todo: Todo): Promise<void> {
    const todoCollection = await GetCollection("todos");
    let insertResult = await todoCollection.insertOne(todo);

    if (!insertResult.insertedId) throw new Error("Erro ao inserir registro");
  }

  async UpdateTodo(todo: Todo): Promise<void> {
    const todoCollection = await GetCollection("todos");

    let query = { _id: todo._id };

    let result = await todoCollection.updateOne(query, { $set: todo });

    if (result.matchedCount === 0) throw "Todo não encontrado";
  }

  async DeleteTodo(todoId: string): Promise<void> {
    const todoCollection = await GetCollection("todos");

    let query = { _id: ObjectId.createFromHexString(todoId) };

    let result = await todoCollection.deleteOne(query);

    if (result.deletedCount === 0) throw "Todo não encontrado";
  }
}
