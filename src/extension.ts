import { w3cwebsocket } from 'websocket';
import minimist from 'minimist';
import { v4 as uuidv4 } from 'uuid';

import { log } from './log';
import {
  IExtension,
  TExtensionEvents
} from './types';

/** The ExtensionSocket class is a TypeScript class that extends the w3cwebsocket class and provides a
convenient way to create a WebSocket connection to a specified hostname and port, with an extension
ID and token. */
export class ExtensionSocket extends w3cwebsocket{

  port:number;
  token:string;
  extensionId:string;

  constructor( options : { port:number , token:string , extensionId:string , hostname?:string } ){

    let hostname = ( 'hostname' in options ? options.hostname : '127.0.0.1' );

    super(`ws://${hostname}:${options.port}?extensionId=${options.extensionId}`);

    this.port = options.port;
    this.token = options.token;
    this.extensionId = options.extensionId;
  }

  /** The line `log = (message) => { log( this.extensionId , message ); }` is defining a method called
  `log` within the `ExtensionSocket` class. This method takes a `message` parameter and calls the
  `log` function from the `log` module, passing in the `extensionId` property of the
  `ExtensionSocket` instance and the `message` parameter. This allows the `ExtensionSocket` class to
  log messages using the `log` function with the appropriate extension ID. */
  log = (message) => { log( this.extensionId , message ); }

}

/**
 * The above function is a TypeScript code that exports a function called "Extension" which creates a
 * WebSocket client and handles various events based on the provided events object.
 * @param {TExtensionEvents} events - The `events` parameter is an object that contains event names as
 * keys and event handler functions as values. These event handler functions will be called when the
 * corresponding event occurs.
 * @returns an object with the following properties:
 */
export const Extension = ( events:TExtensionEvents ):IExtension|null => {

  let eventsKey = Object.keys(events);

  const { 
    ['nl-port'] : PORT ,
    ['nl-token'] : TOKEN ,
    ['nl-extension-id'] : EXTENSIONID
  } = minimist(process.argv.slice(2));

  try{
    let client = new ExtensionSocket({ port : PORT , token : TOKEN , extensionId : EXTENSIONID });

    client.onerror = (err) => log( EXTENSIONID , err, "ERROR");
    client.onopen = () => log( EXTENSIONID , "Connected");
    client.onclose = () => {
      log( EXTENSIONID , "Close")
      process.exit();
    };
  
    client.onmessage = (e) => {

      const { event, data } = JSON.parse(e.data as string);
  
      if(eventsKey.includes( event )){

        let response = {
          send : ( message ) => {

            client.send(JSON.stringify({
              id: uuidv4(),
              method: "app.broadcast",
              accessToken: TOKEN,
              data: { event: data.chanel, data : message },
            }))

          }
        }

        events[event]( data , response );
      }
  
    };
  
    return {
      port : PORT,
      token : TOKEN,
      extensionId : EXTENSIONID,
      client,
      log : (message, type = "INFO") => {
        return log( EXTENSIONID , message , type );
      }
    }
  }
  catch(error){
    return null;
  }

}