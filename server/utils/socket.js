import { Server } from "socket.io";

let ioInstance = null;
const sessionTimers = new Map();

export function createIO(httpServer, corsOrigin) {
	ioInstance = new Server(httpServer, {
		cors: {
			origin: corsOrigin || "*",
			methods: ["GET", "POST"],
			credentials: false
		}
	});

	ioInstance.on("connection", (socket) => {
		socket.on("session:join", ({ sessionId }) => {
			if (!sessionId) return;
			socket.join(`session:${sessionId}`);
		});
	});

	return ioInstance;
}

export function getIO() {
	return ioInstance;
}

export function startSessionTimer(sessionId, totalSeconds) {
	stopSessionTimer(sessionId);
	if (!ioInstance || !sessionId || !Number.isFinite(totalSeconds)) return;
	let remaining = Math.max(0, Math.floor(totalSeconds));
	const interval = setInterval(() => {
		remaining = Math.max(0, remaining - 1);
		ioInstance.to(`session:${sessionId}`).emit("timer:tick", { remainingSec: remaining });
		if (remaining <= 0) {
			stopSessionTimer(sessionId);
		}
	}, 1000);
	sessionTimers.set(sessionId, interval);
}

export function stopSessionTimer(sessionId) {
	const handle = sessionTimers.get(sessionId);
	if (handle) {
		clearInterval(handle);
		sessionTimers.delete(sessionId);
	}
}


