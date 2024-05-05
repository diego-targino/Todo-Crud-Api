import { Request, Response } from "express";
import { ListCategoriesResponseDTO } from "../dtos/response/categories/listCategoriesResponseDTO";
import { CategoryService } from "../services/categoryService";
import { CreateCategoryRequestDTO } from "../dtos/request/categories/createCategoryRequestDTO";
import { EditCategoryRequestDTO } from "../dtos/request/categories/editCategoryRequestDTO";

export class CategoryController {
  async getCategories(req: Request, res: Response): Promise<Response> {
    try {
      let userId: string = req.headers["userid"] as string;

      const categories: ListCategoriesResponseDTO =
        await new CategoryService().ListCategories(userId);

      return res.status(200).send(categories);
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  }

  async createCategory(
    req: Request<any, any, CreateCategoryRequestDTO>,
    res: Response
  ): Promise<Response> {
    try {
      let createCategoryRequestDTO = req.body;
      await new CategoryService().createCategory(createCategoryRequestDTO);

      return res.status(201).send({ message: "Categoria criada com sucesso" });
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  }

  async editCategory(
    req: Request<any, any, EditCategoryRequestDTO>,
    res: Response
  ): Promise<Response> {
    try {
      let editCategoryRequestDTO: EditCategoryRequestDTO = {
        ...req.body,
        id: req.params.id,
      };

      await new CategoryService().editCategory(editCategoryRequestDTO);

      return res.status(200).send({ message: "Categoria editada com sucesso" });
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  }

  async deleteCategory(req: Request, res: Response): Promise<Response> {
    try {
      let categoryId: string = req.params.id;

      await new CategoryService().deleteCategory(categoryId);

      return res
        .status(200)
        .send({ message: "Categoria excluída com sucesso" });
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  }
}
