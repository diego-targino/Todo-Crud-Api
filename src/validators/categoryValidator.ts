import { CreateCategoryRequestDTO } from "../dtos/request/categories/createCategoryRequestDTO";
import { EditCategoryRequestDTO } from "../dtos/request/categories/editCategoryRequestDTO";

export class CategoryValidator {
  static createCategoryValidator(
    createCategoryRequestDTO: CreateCategoryRequestDTO
  ): void {
    if (!createCategoryRequestDTO.name)
      throw new Error("O nome da cartegoria é obrigatório");

    if (!createCategoryRequestDTO.color)
      throw new Error("A cor da cartegoria é obrigatória");

    if (!createCategoryRequestDTO.userId)
      throw new Error("A categoria deve ser associada a um usuário");
  }

  static editCategoryValidator(
    editCategoryRequestDTO: EditCategoryRequestDTO
  ): void {
    if (!editCategoryRequestDTO.id)
      throw new Error("O id da cartegoria é obrigatório");

    if (!editCategoryRequestDTO.name)
      throw new Error("O nome da cartegoria é obrigatório");

    if (!editCategoryRequestDTO.color)
      throw new Error("A cor da cartegoria é obrigatória");

    if (!editCategoryRequestDTO.userId)
      throw new Error("A categoria deve ser associada a um usuário");
  }
}
