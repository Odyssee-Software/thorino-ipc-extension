/**
 * The Dispatch function is a TypeScript function that sends a request to an extension with a specified
 * name and event, and returns a Promise that resolves with the response data.
 * @param {string} extensionName - The `extensionName` parameter is a string that represents the name
 * of the extension you want to dispatch the event to.
 * @param {string} event - The `event` parameter is a string that represents the name of the event that
 * you want to dispatch. It is used to identify the specific event that you want to trigger.
 * @param {any} data - The `data` parameter is an object that contains the data to be sent along with
 * the event. It can be of any type.
 * @returns a Promise that resolves to a CustomEvent of type IResponseData.
*/
export declare const Dispatch: <IResponseData>(extensionName: string, event: string, data: any) => Promise<CustomEvent<IResponseData>>;
