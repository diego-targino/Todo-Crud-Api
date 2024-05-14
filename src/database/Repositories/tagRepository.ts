import { ObjectId } from "mongodb";
import { Tag } from "../Models/tag";
import { GetCollection } from "../configuration/mongoConfiguration";

export class TagRepository {
	async GetTagList(todoId: string): Promise<Tag[]> {
		const tagsCollection = await GetCollection("tags");
		const tags = await tagsCollection.find({ todoId: todoId }).toArray();

		return tags.map((tag) => new Tag(tag.name, tag.todoId, tag._id));
	}

	async AddTag(tag: Tag): Promise<void> {
		const tagsCollection = await GetCollection("tags");
		let insertResult = await tagsCollection.insertOne(tag);

		if (!insertResult.insertedId) throw new Error("Erro ao inserir tag");
	}

	async DeleteTag(tagId: string): Promise<void> {
		const tagsCollection = await GetCollection("tags");

		let query = { _id: ObjectId.createFromHexString(tagId) };

		let result = await tagsCollection.deleteOne(query);

		if (result.deletedCount === 0) throw "Tag não encontrado";
	}
}
