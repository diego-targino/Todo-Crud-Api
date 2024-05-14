import { ObjectId } from "mongodb";

export class Tag {
	constructor(
		public name: string,
		public todoId: string,
		public _id?: ObjectId,
	) {}
}
