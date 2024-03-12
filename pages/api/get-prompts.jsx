import ChatModel from "../../lib/models/chat";

const getPrompts = async (req, res) => {
	const data = req.body;
	const chatId = data.chat_id;
	const msges = await ChatModel.readAll({
		chat_id: chatId,
	});
	res.status(200).json({
		status: "success",
		data: msges,
	});
};

export default getPrompts;
