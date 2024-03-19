import ChatModel from "../../lib/models/chat";
const { v4: uuid } = require("uuid");

const submitPrompt = async (req, res) => {
	const data = req.body;
	const chatId = data.chat_id;
	const prompt = data.prompt;
	const messageId = uuid();

	const msges = await ChatModel.readAll({
		chat_id: chatId,
	});
	const create = await ChatModel.create({
		chat_id: chatId,
		msg_id: messageId,
		prompt: prompt,
	});
	if (create) {
		const msg = await ChatModel.read({
			chat_id: chatId,
			msg_id: messageId,
		});
		const allMessages = msges?.map((msg) => {
			return {
				user_type: msg.user_type,
				prompt: msg.prompt,
			};
		});

		try {
			fetch(
				// `https://mu8bio7fq9.execute-api.ap-south-1.amazonaws.com/default/GrowHut_Dashboard_OpenAI_Chat?chat_id=${chatId}`,
				`https://5by6agyet1.execute-api.ap-south-1.amazonaws.com/default/GrowHut_Dashboard_MistralAI_Chat?chat_id=${chatId}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						prompt_text: prompt,
						chat_history: allMessages,
					}),
				}
			);
		} catch (error) {
			console.error("Error:", error);
		}
		res.status(200).json({
			status: "success",
			data: msg,
		});
		return;
	}
	res.status(500).json({ status: "error", error: "Error sending prompt" });
};

export default submitPrompt;
