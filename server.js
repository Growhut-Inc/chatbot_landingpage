import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { WebSocketServer } from "ws";
import "dotenv/config";

const dev = process.env.NODE_ENV === "development";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	let server;

	server = createServer((req, res) => {
		const parsedUrl = parse(req.url, true);
		handle(req, res, parsedUrl);
	});

	server.on("error", (error) => {
		console.error("Server error:", error);
	});

	let connectedClients = [];

	const wss = new WebSocketServer({ noServer: true });

	server.on("upgrade", (request, socket, head) => {
		if (request.headers["sec-websocket-protocol"] !== "vite-hmr") {
			const protocol = dev ? "http" : "https";
			const pathname = new URL(
				request.url,
				`${protocol}://${request.headers.host}`
			).pathname;

			if (pathname === "/ws") {
				wss.handleUpgrade(request, socket, head, (ws) => {
					wss.emit("connection", ws, request);
				});
			} else if (!pathname.includes("_next/webpack-hmr")) {
				socket.destroy();
			}
		}
	});

	wss.on("connection", (ws) => {
		connectedClients.push(ws);

		ws.on("message", (message) => {
			let messageToSend;
			if (Buffer.isBuffer(message)) {
				const messageStr = message.toString();
				messageToSend = JSON.parse(messageStr);
			} else {
				messageToSend = JSON.parse(message);
			}
			connectedClients.forEach((client) => {
				if (client.readyState === WebSocket.OPEN) {
					client.send(JSON.stringify(messageToSend));
				}
			});
		});

		ws.on("close", () => {});
	});
	const port = 3000;
	server.listen(port, () => {
		console.log(`> Ready on http://localhost:${port}`);
	});
});

process.on("uncaughtException", (err) => {
	console.error("There was an uncaught error", err);
	process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
	console.error("Unhandled Rejection at:", promise, "reason:", reason);
	process.exit(1);
});
