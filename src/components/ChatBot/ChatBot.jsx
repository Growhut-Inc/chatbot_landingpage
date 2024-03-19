"use client";
import "./style.css";
import leftIcon from "@/assets/images/chatbot/leftIcon.svg";
import rightIcon from "@/assets/images/chatbot/rightIcon.svg";
import sendIcon from "@/assets/images/chatbot/sendIcon.svg";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import markdown from "@wcj/markdown-to-html";

const ChatBot = () => {
	const [isWaitForBotMessage, setWaitForBotMessage] = useState(false);
	const [id, setId] = useState("");
	const [userInput, setUserInput] = useState("");
	const [chatData, setChatData] = useState([
		{
			type: "bot",
			message: "Hello! I am your Growhut assistant.",
		},
		{
			type: "bot",
			message: "Want to get to know us better?",
		},
		{
			type: "bot",
			message: "Go ahead! Type a query.",
		},
	]);
	const myDivRef = useRef(null);
	const handleInputChange = (e) => {
		setUserInput(e.target.value);
	};
	const handleSend = async () => {
		if (userInput.trim()?.length) {
			try {
				const response = await fetch("/api/submit-prompt", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						chat_id: id,
						prompt: userInput.trim(),
					}),
				});

				if (!response.ok) {
					throw new Error(`Error: ${response.json()}`);
				}

				const result = await response.json();
				if (result.status == "success") {
					setChatData((prevChatData) => [
						...prevChatData,
						{
							type: "user",
							message: markdown(userInput.trim()),
						},
					]);
					setUserInput("");
					setWaitForBotMessage(true);
				} else {
					alert(result.error || "Error sending message");
				}
			} catch (error) {
				console.error("Error:", error);
			}
		}
	};
	const scrollToBottom = () => {
		if (myDivRef.current) {
			myDivRef.current.scrollTop = myDivRef.current.scrollHeight;
		}
	};

	const checkWSMessage = (e) => {
		try {
			const messageObject = JSON.parse(e.data);

			if (messageObject.chat_id === id) {
				setWaitForBotMessage(false);
				setChatData((prevChatData) => [
					...prevChatData,
					{
						type: "bot",
						message: markdown(messageObject.prompt),
					},
				]);
			}
		} catch (error) {
			console.error("Error parsing message:", error);
		}
	};

	useEffect(() => {
		scrollToBottom();
	}, [chatData]);
	useEffect(() => {
		const uuid_cookie = sessionStorage.getItem("chat_uuid");
		if (uuid_cookie?.length) {
			setId(uuid_cookie);
		} else {
			const uuid = uuidv4();
			sessionStorage.setItem("chat_uuid", uuid);
			setId(uuid);
		}
	}, []);
	useEffect(() => {
		if (!id?.length) return;
		const getPreviousChats = async () => {
			try {
				const response = await fetch("/api/get-prompts", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						chat_id: id,
					}),
				});
				if (!response.ok) {
					throw new Error(`Error: ${response.json}`);
				}
				const result = await response.json();
				if (result.status == "success") {
					const data = result.data;
					let count = chatData.length;

					setChatData((prevChatData) => [
						...prevChatData,
						...(data?.map((a) => {
							count += 1;
							return {
								type: a?.user_type?.toLowerCase(),
								message: markdown(a?.prompt),
							};
						}) || []),
					]);
				}
			} catch (error) {
				console.error("Error getting chats:", error);
			}
		};
		getPreviousChats();
		const dev = window.location.hostname === "localhost";
		let ws;
		let attempt = 1;

		const connectWebSocket = () => {
			ws = new WebSocket(
				`${dev ? "ws" : "wss"}://${
					dev ? "localhost:3000" : window.location.hostname
				}/ws`
			);

			ws.onopen = () => {
				console.clear();
				console.log("WebSocket connection established");
				attempt = 1;
			};

			ws.onmessage = checkWSMessage;

			ws.onerror = (error) => {
				console.error("WebSocket error:", error);
			};

			ws.onclose = (e) => {
				console.log(
					"WebSocket connection closed. Attempting to reconnect..."
				);
				let timeout = Math.min(20000, 2 ** attempt * 1000);
				setTimeout(connectWebSocket, timeout);
				attempt++;
			};
		};

		connectWebSocket();

		return () => {
			if (ws) {
				ws.close();
			}
		};
	}, [id]);

	return (
		<section className="panel chatbot_wrapper">
			{/* <div className="bg_star"></div> */}
			<h2>Experience it for yourself!</h2>
			<div className="chatbot_container">
				<div className="icon_left">
					<Image
						src={leftIcon}
						width={50}
						height={0}
						alt="icon"
						className={isWaitForBotMessage ? "bounce_img" : ""}
					/>
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
								<div className="bubble_container" key={index}>
									<div
										className={`chat_bubble ${
											chat.type === "bot"
												? "left_message"
												: ""
										} ${
											chat.type === "user"
												? "right_message"
												: ""
										}`}
									>
										<p
											dangerouslySetInnerHTML={{
												__html: chat.message,
											}}
										></p>
									</div>
								</div>
							);
						})}
						{isWaitForBotMessage ? (
							<div className="bubble_container">
								<div
									className={`chat_bubble left_message loading`}
								>
									<div className="loader"></div>
								</div>
							</div>
						) : (
							<></>
						)}
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
					<Image
						src={rightIcon}
						width={40}
						height={0}
						alt="icon"
						className={!isWaitForBotMessage ? "bounce_img" : ""}
					/>
				</div>
			</div>
		</section>
	);
};

export default ChatBot;
