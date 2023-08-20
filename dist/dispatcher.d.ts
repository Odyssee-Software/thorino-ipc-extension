/**
 * La fonction Dispatcher crée et retourne une fonction de déclenchement d'événement personnalisée
 * pour une extension spécifique. Cette fonction préconfigure le nom de l'extension pour simplifier
 * l'utilisation de la fonction Dispatch.
 * @param {string} extensionName - Le nom de l'extension cible.
 * @returns Une fonction qui facilite l'envoi d'événements personnalisés à l'extension spécifiée.
*/
export declare const Dispatcher: (extensionName: string) => <response>(event: string, message: string) => Promise<CustomEvent<response>>;
