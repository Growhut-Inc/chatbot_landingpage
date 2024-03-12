import mongoose, { Schema } from "mongoose";

const chatSchema = new mongoose.Schema({
	chat_id: { type: String, required: true },
	msg_id: { type: String, required: true },
	prompt: { type: String, required: true },
	user_type: { type: String, default: "User" },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

chatSchema.pre("save", function (next) {
	this.updatedAt = new Date();
	next();
});

const ChatsModel = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

class Chats {
	constructor({ chat_id, msg_id, prompt, user_type }) {
		this.chat_id = chat_id;
		this.msg_id = msg_id;
		this.prompt = prompt;
		this.user_type = user_type;
	}
}

export { ChatsModel, Chats };
