import ChatModel from "../../../lib/models/chat";
const { v4: uuid } = require("uuid");
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ noServer: true });

const submitPromptData = async (req, res) => {
	const data = req.body;
	console.log(data);
	const chatId = data.chat_id;
	const prompt = data.prompt;
	const messageId = uuid();

	const create = await ChatModel.create({
		chat_id: chatId,
		msg_id: messageId,
		prompt: prompt,
		user_type: "Bot",
	});
	if (create) {
		const msg = await ChatModel.read({
			chat_id: chatId,
			msg_id: messageId,
		});
		console.log(wss.clients);
		wss.clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(JSON.stringify(msg));
			}
		});
		res.status(200).json({
			status: "success",
			data: msg,
		});
		return;
	}
	res.status(500).json({ status: "error", error: "Error sending prompt" });
};

export default submitPromptData;
