import { w3cwebsocket } from 'websocket';
import { IExtension, TExtensionEvents } from './types';
/** The ExtensionSocket class is a TypeScript class that extends the w3cwebsocket class and provides a
convenient way to create a WebSocket connection to a specified hostname and port, with an extension
ID and token. */
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
    /** The line `log = (message) => { log( this.extensionId , message ); }` is defining a method called
    `log` within the `ExtensionSocket` class. This method takes a `message` parameter and calls the
    `log` function from the `log` module, passing in the `extensionId` property of the
    `ExtensionSocket` instance and the `message` parameter. This allows the `ExtensionSocket` class to
    log messages using the `log` function with the appropriate extension ID. */
    log: (message: any) => void;
}
/**
 * The above function is a TypeScript code that exports a function called "Extension" which creates a
 * WebSocket client and handles various events based on the provided events object.
 * @param {TExtensionEvents} events - The `events` parameter is an object that contains event names as
 * keys and event handler functions as values. These event handler functions will be called when the
 * corresponding event occurs.
 * @returns an object with the following properties:
 */
export declare const Extension: (events: TExtensionEvents) => IExtension | null;
