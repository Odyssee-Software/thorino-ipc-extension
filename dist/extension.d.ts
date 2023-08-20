import { w3cwebsocket } from 'websocket';
import { IExtension, TExtensionEvents } from './types';
/** La classe ExtensionSocket simplifie la création et la gestion d'une connexion WebSocket entre le backend et le frontend
 * en utilisant la fonctionnalité native de Neutralino. */
export declare class ExtensionSocket extends w3cwebsocket {
    port: number;
    token: string;
    extensionId: string;
    constructor(options: {
        port: number;
        token: string;
        extensionId: string;
        hostname?: string;
    });
    /** La ligne `log = (message) => { log( this.extensionId , message ); }` définit une méthode appelée
     * `log` à l'intérieur de la classe `ExtensionSocket`. Cette méthode prend un paramètre `message` et appelle
     * la fonction `log` du module `log`, en passant la propriété `extensionId` de l'instance `ExtensionSocket`
     * et le paramètre `message`. Cela permet à la classe `ExtensionSocket` de journaliser des messages en utilisant
     * la fonction `log` avec l'ID d'extension approprié. */
    log: (message: any) => void;
}
/**
 * La fonction Extension facilite la communication entre le backend et le frontend en utilisant des extensions exécutées
 * en parallèle par Neutralino. Elle met en place un serveur WebSocket natif pour établir une interaction bidirectionnelle
 * entre les deux parties. Cette fonctionnalité simplifie considérablement le processus en évitant la gestion manuelle
 * des écouteurs pour les réponses d'appels depuis le frontend, réduisant ainsi la complexité du code.
 * @param {TExtensionEvents} events - Les fonctions de gestion d'événements pour les interactions frontend-backend.
 * @returns Un objet contenant les paramètres de configuration et le client WebSocket.
 */
export declare const Extension: (events: TExtensionEvents) => IExtension | null;
