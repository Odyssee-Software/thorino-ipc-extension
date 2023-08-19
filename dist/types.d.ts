import { w3cwebsocket } from 'websocket';
export interface IExtension {
    port: string;
    token: string;
    extensionId: string;
    client: w3cwebsocket;
    log(message: string, type: 'INFO' | 'ERROR'): void;
}
export interface IExtensionRequest {
    chanel: string;
    data: any;
}
export interface IExtensionResponse {
    send(message: any): void;
}
export type TExtensionEvent = (req: IExtensionRequest, res: IExtensionResponse) => void;
export type TExtensionEvents = Record<string, TExtensionEvent>;
