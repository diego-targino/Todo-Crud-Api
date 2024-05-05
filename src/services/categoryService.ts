import { CategoryRepository } from "../database/Repositories/categoryRepository";
import { TodoRepository } from "../database/Repositories/todoRepository";
import { CreateCategoryRequestDTO } from "../dtos/request/categories/createCategoryRequestDTO";
import { EditCategoryRequestDTO } from "../dtos/request/categories/editCategoryRequestDTO";
import { CategoryResponseDTO } from "../dtos/response/categories/categoryResponseDTO";
import { ListCategoriesResponseDTO } from "../dtos/response/categories/listCategoriesResponseDTO";
import { CategoryMapper } from "../mappers/categoryMapper";
import { CategoryValidator } from "../validators/categoryValidator";

export class CategoryService {
  categoryRepository: CategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  async ListCategories(userId: string): Promise<ListCategoriesResponseDTO> {
    const categories = await this.categoryRepository.GetCategoriesList(userId);

    const CategoryDTOList: CategoryResponseDTO[] = categories.map(
      (category) => {
        return {
          name: category.name,
          color: category.color,
          id: category._id?.toString() || "",
        };
      }
    );
    return { categories: CategoryDTOList };
  }

  async createCategory(
    createCategoryRequestDTO: CreateCategoryRequestDTO
  ): Promise<void> {
    CategoryValidator.createCategoryValidator(createCategoryRequestDTO);

    const category = CategoryMapper.mapCategory(createCategoryRequestDTO);

    await this.categoryRepository.AddCategory(category);
  }

  async editCategory(
    editCategoryRequestDTO: EditCategoryRequestDTO
  ): Promise<void> {
    CategoryValidator.editCategoryValidator(editCategoryRequestDTO);

    let category = await this.categoryRepository.GetCategoryById(
      editCategoryRequestDTO.id
    );

    if (!category) throw new Error("Categoria não encontrada");

    category.color = editCategoryRequestDTO.color;
    category.name = editCategoryRequestDTO.name;

    await this.categoryRepository.UpdateCategory(category);
  }

  async deleteCategory(categoryId: string): Promise<void> {
    const todoRepository = new TodoRepository();

    const category = await this.categoryRepository.GetCategoryById(categoryId);

    if (!category) throw Error("Categoria não encontrada");

    await this.categoryRepository.DeleteCategory(categoryId);

    let todos = await todoRepository.GetTodoList(category.userId, categoryId);

    todos.forEach((todo) => {
      todo.categoryId = undefined;
      todoRepository.UpdateTodo(todo);
    });
  }
}
