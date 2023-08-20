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
/** La classe ExtensionSocket simplifie la création et la gestion d'une connexion WebSocket entre le backend et le frontend
 * en utilisant la fonctionnalité native de Neutralino. */
class ExtensionSocket extends websocket_1.w3cwebsocket {
    constructor(options) {
        let hostname = ('hostname' in options ? options.hostname : '127.0.0.1');
        super(`ws://${hostname}:${options.port}?extensionId=${options.extensionId}`);
        /** La ligne `log = (message) => { log( this.extensionId , message ); }` définit une méthode appelée
         * `log` à l'intérieur de la classe `ExtensionSocket`. Cette méthode prend un paramètre `message` et appelle
         * la fonction `log` du module `log`, en passant la propriété `extensionId` de l'instance `ExtensionSocket`
         * et le paramètre `message`. Cela permet à la classe `ExtensionSocket` de journaliser des messages en utilisant
         * la fonction `log` avec l'ID d'extension approprié. */
        this.log = (message) => { (0, log_1.log)(this.extensionId, message); };
        this.port = options.port;
        this.token = options.token;
        this.extensionId = options.extensionId;
    }
}
exports.ExtensionSocket = ExtensionSocket;
/**
 * La fonction Extension facilite la communication entre le backend et le frontend en utilisant des extensions exécutées
 * en parallèle par Neutralino. Elle met en place un serveur WebSocket natif pour établir une interaction bidirectionnelle
 * entre les deux parties. Cette fonctionnalité simplifie considérablement le processus en évitant la gestion manuelle
 * des écouteurs pour les réponses d'appels depuis le frontend, réduisant ainsi la complexité du code.
 * @param {TExtensionEvents} events - Les fonctions de gestion d'événements pour les interactions frontend-backend.
 * @returns Un objet contenant les paramètres de configuration et le client WebSocket.
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
            client.log('message incoming');
            if (eventsKey.includes(event)) {
                let response = {
                    send: (message) => {
                        return client.send(JSON.stringify({
                            id: (0, uuid_1.v4)(),
                            method: "app.broadcast",
                            accessToken: TOKEN,
                            data: { event: data.chanel, data: message },
                        }));
                    }
                };
                console.log(events);
                events[event](data, response);
            }
        };
        return {
            get port() { return client.port; },
            get token() { return client.token; },
            get extensionId() { return client.extensionId; },
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