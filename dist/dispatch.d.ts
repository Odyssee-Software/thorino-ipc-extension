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
export declare const Dispatch: <IResponseData>(extensionName: string, event: string | Record<string, any>, data: any) => Promise<CustomEvent<IResponseData>>;
