"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dispatch = void 0;
const uuid_1 = require("uuid");
/**
 * La fonction Dispatch simplifie l'envoi d'événements depuis le frontend vers les extensions du backend,
 * en utilisant la fonctionnalité de démarrage de processus en parallèle de Neutralino. Elle permet de déclencher
 * des extensions écrites dans différentes langues (C++, Python, Node.js, etc.) pour inclure des modules backend
 * dans l'application. Cette fonctionnalité est basée sur un serveur WebSocket natif de Neutralino, qui facilite
 * la communication bidirectionnelle entre le backend et le frontend. Elle élimine la nécessité de gérer manuellement
 * les écouteurs pour les réponses d'appels depuis le frontend, contribuant ainsi à réduire la complexité du code.
 * @param {string} extensionName - Le nom de l'extension cible.
 * @param {string} event - Le nom de l'événement à déclencher.
 * @param {any} data - Les données à envoyer avec l'événement.
 * @returns Une Promesse résolvant en un CustomEvent de type IResponseData contenant la réponse de l'extension.
 */
const Dispatch = (extensionName, event, data) => {
    const { extensions, events } = window['Neutralino'];
    /* La ligne `let replyChanelId = uuidv4();` génère un identifiant unique à l'aide de la fonction `uuidv4`
    de la bibliothèque `uuid`. Cet identifiant unique est utilisé pour créer un nom de canal pour l'événement
    personnalisé qui sera déclenché lorsque l'extension répond à l'événement envoyé. En utilisant
    un nom de canal unique, le code peut s'assurer que la réponse correcte est reçue pour l'événement
    envoyé, même si plusieurs événements sont envoyés simultanément. */
    let replyChanelId = (0, uuid_1.v4)();
    /* La ligne `let replyChanelName = `-`;` crée un nom de canal unique
    pour l'événement personnalisé qui sera déclenché lorsque l'extension répond à l'événement envoyé. */
    let replyChanelName = `${replyChanelId}-${event}`;
    return new Promise((next, reject) => __awaiter(void 0, void 0, void 0, function* () {
        let { connected, loaded } = yield extensions.getStats();
        /* Le bloc de code vérifie l'état de l'extension spécifiée (`extensionName`) pour déterminer
        si elle est connectée et chargée. */
        if (!connected.includes(extensionName) && loaded.includes(extensionName))
            reject(new Error(`Extension {${extensionName}} is loaded but isn't connected`));
        else if (!connected.includes(extensionName) && !loaded.includes(extensionName))
            reject(new Error(`Extension {${extensionName}} isn't loaded and connected`));
        else {
            /**
             * La fonction configure un contrôleur de réponse pour un événement personnalisé, avec un délai de 2000 ms,
             * et déclenche l'événement avec les données fournies.
             * @param response - Le paramètre response est un objet CustomEvent qui contient les données de réponse.
             */
            let responseController = (response) => {
                clearTimeout(dispatchTimeout);
                events.off(replyChanelName, responseController);
                next(response);
            };
            /* La variable `dispatchTimeout` est utilisée pour définir un délai pour l'événement d'envoi.
            Si l'événement ne reçoit pas de réponse dans les 2000 millisecondes (2 secondes), la fonction de délai sera
            déclenchée. */
            let dispatchTimeout = setTimeout(() => {
                /* La ligne de code `events.off( `-` , responseController  );` est utilisée
                pour supprimer le gestionnaire d'événement qui a été configuré avec la méthode `events.on()`. */
                events.off(replyChanelName, responseController);
                reject(new Error(`Dispatch timeout 2000ms`));
            }, 2000);
            /* La ligne de code `events.on( `-` , responseController );` configure
            un gestionnaire d'événement pour un événement personnalisé. Il écoute un événement avec un nom spécifique,
            qui est généré en concaténant les variables `replyChanelId` et `event`. Lorsque cet événement est
            déclenché, la fonction `responseController` sera appelée avec les données de réponse en argument.
            Cela permet au code de gérer la réponse de l'extension et de résoudre la Promesse avec les données de réponse. */
            events.on(replyChanelName, responseController);
            /* La fonction `extensions.dispatch()` est utilisée pour envoyer une requête à une extension spécifique avec un
            événement et des données spécifiés. */
            extensions.dispatch(extensionName, event, {
                chanel: replyChanelName,
                data
            });
        }
    }));
};
exports.Dispatch = Dispatch;
//# sourceMappingURL=dispatch.js.map