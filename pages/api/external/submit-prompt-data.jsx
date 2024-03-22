import ChatModel from "../../../lib/models/chat";
const { v4: uuid } = require("uuid");
import { WebSocket } from "ws";

const sendDataToWS = (data) => {
	try {
		const dev = process.env.NODE_ENV === "development";
		const ws_url = `${dev ? "ws" : "wss"}://${
			dev ? "localhost:3000" : "chatbot.growhut.in"
		}/ws`;
		const ws = new WebSocket(ws_url);
		ws.on("open", () => {
			console.error("WebSocket sent");
			ws.send(JSON.stringify(data));
			ws.close();
		});
		ws.on("error", (error) => {
			console.error("WebSocket error:", error);
		});
	} catch (error) {
		console.error("Error sending data to WebSocket:", error);
	}
};

const submitPromptData = async (req, res) => {
	const data = req.body;
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
		sendDataToWS(msg);
		res.status(200).json({
			status: "success",
			data: msg,
		});
		return;
	}
	res.status(500).json({ status: "error", error: "Error sending prompt" });
};

export default submitPromptData;
