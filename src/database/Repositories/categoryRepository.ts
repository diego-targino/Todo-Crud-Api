import { ObjectId } from "mongodb";
import { GetCollection } from "../configuration/mongoConfiguration";
import { Category } from "../Models/category";

export class CategoryRepository {
  async GetCategoriesList(userId: string): Promise<Category[]> {
    const categoriesCollection = await GetCollection("categories");
    const categories = await categoriesCollection
      .find({ userId: userId })
      .toArray();

    return categories.map(
      (category) =>
        new Category(
          category.name,
          category.color,
          category.userId,
          category._id
        )
    );
  }

  async GetCategoryById(categoryId: string): Promise<Category | undefined> {
    const categoriesCollection = await GetCollection("categories");

    const category = await categoriesCollection.findOne({
      _id: ObjectId.createFromHexString(categoryId),
    });

    if (category)
      return new Category(
        category.name,
        category.color,
        category.userId,
        category._id
      );
  }

  async AddCategory(category: Category): Promise<void> {
    const categoriesCollection = await GetCollection("categories");
    let insertResult = await categoriesCollection.insertOne(category);

    if (!insertResult.insertedId) throw new Error("Erro ao inserir registro");
  }

  async UpdateCategory(category: Category): Promise<void> {
    const categoriesCollection = await GetCollection("categories");

    let query = { _id: category._id };

    let result = await categoriesCollection.updateOne(query, {
      $set: category,
    });

    if (result.matchedCount === 0) throw "Categoria não encontrado";
  }

  async DeleteCategory(categoryId: string): Promise<void> {
    const categoriesCollection = await GetCollection("categories");

    let query = { _id: ObjectId.createFromHexString(categoryId) };

    let result = await categoriesCollection.deleteOne(query);

    if (result.deletedCount === 0) throw "Categoria não encontrado";
  }
}
