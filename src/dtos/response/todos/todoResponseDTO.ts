export interface TodoResponseDTO {
  id: string;
  description: string;
  completed: boolean;
  categoryId?: string;
}
