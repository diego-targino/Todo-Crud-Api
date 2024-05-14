import { ObjectId } from "mongodb";
import { TagRepository } from "../database/Repositories/tagRepository";
import { Tag } from "../database/Models/tag";
import { TagResponseDTO } from "../dtos/response/tags/tagResponseDTO";

export class TagService {
	tagRepository: TagRepository;

	constructor() {
		this.tagRepository = new TagRepository();
	}

	async GetTagList(todoId: string): Promise<TagResponseDTO[] | undefined> {
		const tags = await this.tagRepository.GetTagList(todoId);

		return tags.map((tag) => {
			return { id: tag._id!.toString(), name: tag.name };
		});
	}

	async createTags(tags: string[], todoId: string): Promise<void> {
		for (let tagString of tags) {
			const tag = new Tag(tagString, todoId, new ObjectId());
			await this.tagRepository.AddTag(tag);
		}
	}

	async deleteTagsByTodo(todoId: string): Promise<void> {
		const tags = await this.tagRepository.GetTagList(todoId);

		for (let tag of tags) {
			await this.tagRepository.DeleteTag(tag._id!.toString());
		}
	}
}
