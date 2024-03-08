"use client";
import "./style.css";
import leftIcon from "@/assets/images/chatbot/leftIcon.svg";
import rightIcon from "@/assets/images/chatbot/rightIcon.svg";
import sendIcon from "@/assets/images/chatbot/sendIcon.svg";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const ChatBot = () => {
	const [userInput, setUserInput] = useState("");
	const [chatData, setChatData] = useState([
		{
			key: 1,
			type: "ai_message",
			message: "Hello! I am your Growhut assistant.",
		},
		{
			key: 2,
			type: "ai_message",
			message: "Want to get to know us better?",
		},
		{
			key: 3,
			type: "ai_message",
			message: "Go ahead! Type a query.",
		},
		{
			key: 4,
			type: "user_message",
			message: "How can I connect with growhut?",
		},
	]);
	const myDivRef = useRef(null);
	const handleInputChange = (e) => {
		setUserInput(e.target.value);
	};
	const handleSend = () => {
		if (userInput.trim() !== "") {
			setChatData((prevChatData) => [
				...prevChatData,
				{
					key: prevChatData.length + 1,
					type: "user_message",
					message: userInput,
				},
			]);
			setUserInput("");
		}
	};
	const scrollToBottom = () => {
		if (myDivRef.current) {
			myDivRef.current.scrollTop = myDivRef.current.scrollHeight;
		}
	};

	useEffect(() => {
		scrollToBottom();
	}, [chatData]);
	return (
		<div className="chatbot_wrapper">
			<div className="bg_star"></div>
			<h2>Experience it for yourself!</h2>
			<div className="chatbot_container">
				<div className="icon_left">
					<Image src={leftIcon} width={50} height={0} alt="icon" />
				</div>
				<div className="chatbot">
					<div className="icon_container_ss">
						<Image
							src={leftIcon}
							width={50}
							height={0}
							alt="icon"
						/>
						<Image
							src={rightIcon}
							width={50}
							height={0}
							alt="icon"
						/>
					</div>
					<div className="messages" ref={myDivRef}>
						{chatData.map((chat, index) => {
							return (
								<div
									className="bubble_container"
									key={chat.key}
								>
									<div
										className={`chat_bubble ${
											chat.type === "ai_message"
												? "left_message"
												: ""
										} ${
											chat.type === "user_message"
												? "right_message"
												: ""
										}`}
									>
										<p>{chat.message}</p>
									</div>
								</div>
							);
						})}
					</div>
					<div className="input_wrapper">
						<input
							type="text"
							name="message"
							autoComplete="off"
							placeholder="Write your prompt here..."
							value={userInput}
							onChange={handleInputChange}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									handleSend();
								}
							}}
						/>
						<div className="send_btn" onClick={handleSend}>
							<Image
								src={sendIcon}
								width={30}
								height={0}
								alt="send"
							/>
						</div>
					</div>
				</div>
				<div className="icon_right">
					<Image src={rightIcon} width={40} height={0} alt="icon" />
				</div>
			</div>
		</div>
	);
};

export default ChatBot;
