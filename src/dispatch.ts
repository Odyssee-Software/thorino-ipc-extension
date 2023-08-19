import { v4 as uuidv4 } from 'uuid';

import { extensions , events } from "@neutralinojs/lib";

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
export const Dispatch = <IResponseData>( extensionName:string , event:string , data:any ):Promise<CustomEvent<IResponseData>> => {

  let replyChanelId = uuidv4();

  return new Promise(async (next,reject) => {

    let { connected , loaded } = await extensions.getStats();

    if(!connected.includes(extensionName) && loaded.includes(extensionName))reject(new Error(`Extension {${extensionName}} is loaded but isn't connected`));
    else if(!connected.includes(extensionName) && !loaded.includes(extensionName))reject(new Error(`Extension {${extensionName}} isn't loaded and connected`));

    events.on( `${replyChanelId}-${event}` , (response:CustomEvent<IResponseData>) => {
      next(response);
    } )
    
    extensions.dispatch( extensionName , event , {
      chanel : `${replyChanelId}-${event}`,
      data
    })

  })

}