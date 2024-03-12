import "../mongodb";
import { Chats, ChatsModel } from "../schema/chats";

class ChatModel {
	static async create(chatData) {
		const response = await new ChatsModel(chatData).save();
		return response;
	}

	static async read(chatData) {
		return await ChatsModel.findOne(chatData).exec();
	}

	static async readAll(chatData) {
		return await ChatsModel.find(chatData).sort({ createdAt: 1 }).exec();
	}

	static async update(id, updateData) {
		const response = await ChatsModel.updateOne(
			{ _id: id },
			{ $set: updateData }
		);
		return response.modifiedCount;
	}
}

export default ChatModel;
