const subscribeButton = document.getElementById("preset");

/**
* Sends a WebSocket message to subscribe to events emitted by a Remote Control Preset.
*/
const subscribeToPreset = (socket, preset) => {
	if (!socket) return;

	const registerPayload = {
		"MessageName": "preset.register",
		"Parameters": {
			"PresetName": `${preset}`,
		},
	};

	socket.send(JSON.stringify(registerPayload));
};

const onOpen = (event) => {
	console.log("Socket connected");
};

const onError = (event) => {
	console.log(event);
};

const onMessage = (event) => {
	console.log("WORKS");
	if (event.data instanceof Blob) {
		const reader = new FileReader();

		reader.addEventListener("load", () => {
			const json = JSON.parse(reader.result);
			const text = json.Type;
			console.log(reader.result);
			console.log(text);
		});

		reader.readAsText(event.data);
	}
	else {
		console.log("Not blob");
	}
};

const onClose = (event) => {
	console.log("Socket disconnected");
};

const connect = () => {
	const HOST = "127.0.0.1";
	const PORT = 30020;
	const socket = new WebSocket(`ws://${HOST}:${PORT}`);
	socket.addEventListener("open", onOpen);
	socket.addEventListener("error", onError);
	socket.addEventListener("message", onMessage);
	socket.addEventListener("close", onClose);
	return socket;
};

const socket = connect();

subscribeButton.addEventListener("click", () => {
	console.log("Clicked");
	subscribeToPreset(socket, "RC_Test");
});
