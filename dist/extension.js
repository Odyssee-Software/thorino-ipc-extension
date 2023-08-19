"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Extension = exports.ExtensionSocket = void 0;
const websocket_1 = require("websocket");
const minimist_1 = __importDefault(require("minimist"));
const uuid_1 = require("uuid");
const log_1 = require("./log");
/** The ExtensionSocket class is a TypeScript class that extends the w3cwebsocket class and provides a
convenient way to create a WebSocket connection to a specified hostname and port, with an extension
ID and token. */
class ExtensionSocket extends websocket_1.w3cwebsocket {
    constructor(options) {
        let hostname = ('hostname' in options ? options.hostname : '127.0.0.1');
        super(`ws://${hostname}:${options.port}?extensionId=${options.extensionId}`);
        /** The line `log = (message) => { log( this.extensionId , message ); }` is defining a method called
        `log` within the `ExtensionSocket` class. This method takes a `message` parameter and calls the
        `log` function from the `log` module, passing in the `extensionId` property of the
        `ExtensionSocket` instance and the `message` parameter. This allows the `ExtensionSocket` class to
        log messages using the `log` function with the appropriate extension ID. */
        this.log = (message) => { (0, log_1.log)(this.extensionId, message); };
        this.port = options.port;
        this.token = options.token;
        this.extensionId = options.extensionId;
    }
}
exports.ExtensionSocket = ExtensionSocket;
/**
 * The above function is a TypeScript code that exports a function called "Extension" which creates a
 * WebSocket client and handles various events based on the provided events object.
 * @param {TExtensionEvents} events - The `events` parameter is an object that contains event names as
 * keys and event handler functions as values. These event handler functions will be called when the
 * corresponding event occurs.
 * @returns an object with the following properties:
 */
const Extension = (events) => {
    let eventsKey = Object.keys(events);
    const { ['nl-port']: PORT, ['nl-token']: TOKEN, ['nl-extension-id']: EXTENSIONID } = (0, minimist_1.default)(process.argv.slice(2));
    try {
        let client = new ExtensionSocket({ port: PORT, token: TOKEN, extensionId: EXTENSIONID });
        client.onerror = (err) => (0, log_1.log)(EXTENSIONID, err, "ERROR");
        client.onopen = () => (0, log_1.log)(EXTENSIONID, "Connected");
        client.onclose = () => {
            (0, log_1.log)(EXTENSIONID, "Close");
            process.exit();
        };
        client.onmessage = (e) => {
            const { event, data } = JSON.parse(e.data);
            if (eventsKey.includes(event)) {
                let response = {
                    send: (message) => {
                        client.send(JSON.stringify({
                            id: (0, uuid_1.v4)(),
                            method: "app.broadcast",
                            accessToken: TOKEN,
                            data: { event: data.chanel, data: message },
                        }));
                    }
                };
                events[event](data, response);
            }
        };
        return {
            port: PORT,
            token: TOKEN,
            extensionId: EXTENSIONID,
            client,
            log: (message, type = "INFO") => {
                return (0, log_1.log)(EXTENSIONID, message, type);
            }
        };
    }
    catch (error) {
        return null;
    }
};
exports.Extension = Extension;
//# sourceMappingURL=extension.js.map