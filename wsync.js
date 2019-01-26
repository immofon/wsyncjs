import ReconnectingWebSocket from "./reconnecting-websocket";
import kv from "./kv"

let ws = new ReconnectingWebSocket(kv.get("wsync_server_addr","ws://localhost:8111/"), null, {
	maxReconnectInterval: 3000,
	reconnectDecay: 1.0,
});
let connected = false;
var onMessage = (e)=>{
	console.log("default onMessage:",e)
};
var onOpen = ()=>{};

function getOnMessage() {return onMessage}
function getOnOpen() {return onOpen}


ws.onopen = () => {
	connected = true;
	(getOnOpen())();
};
ws.onclose = () => {
	connected = false;
};
ws.onmessage = evt => {
	const raw = evt.data.split("\x1F")
	let method,topic = ""
	let metas = [];
	if (raw.length > 0) {
		method = raw[0];
	}
	if (raw.length > 1) {
		topic = raw[1];
	}
	if (raw.length > 2) {
		metas = raw.slice(2);
	}

	(getOnMessage())({method,topic,metas})
};

export default {
	setOnMessage: function(fn) {
		console.log("set on event")
		onMessage = fn;
	},
	AfterOpen(fn) {
		onOpen = fn;
		if (connected) {
			fn();
		}
	},
	send:(method,topic,...metas)=>{
		console.log("send:",[method,topic,...metas].join("\x1F"))
		if (data.length == 0) {
			ws.send([method,topic].join("\x1F"))
		} else {
			ws.send([method,topic,data.join("\x1F")].join("\x1F"))
		}
	},
	connected: () => {
		return connected;
	}
};

