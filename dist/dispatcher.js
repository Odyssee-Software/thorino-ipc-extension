"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dispatcher = void 0;
const dispatch_1 = require("./dispatch");
/**
 * La fonction Dispatcher crée et retourne une fonction de déclenchement d'événement personnalisée
 * pour une extension spécifique. Cette fonction préconfigure le nom de l'extension pour simplifier
 * l'utilisation de la fonction Dispatch.
 * @param {string} extensionName - Le nom de l'extension cible.
 * @returns Une fonction qui facilite l'envoi d'événements personnalisés à l'extension spécifiée.
*/
const Dispatcher = (extensionName) => {
    return (event, message) => {
        // Utilisation de la fonction Dispatch en préconfigurant le nom de l'extension
        return (0, dispatch_1.Dispatch)(extensionName, event, message);
    };
};
exports.Dispatcher = Dispatcher;
//# sourceMappingURL=dispatcher.js.map