import { v4 as uuidv4 } from 'uuid';

import { TExtensionEvents } from './types';
import { Extension } from './extension';

export * from './extension';
export * from './dispatch';
export * from './types';

// const extensionEvents:TExtensionEvents = {
//   ping : ( data , client , token) => {

//     client.send(JSON.stringify({
//       id: uuidv4(),
//       method: "app.broadcast",
//       accessToken: token,
//       data: { event: "pong", data: "Pong return !" },
//     }))

//   },
//   eventToExtension : ( data , client , token) => {

//     client.send(JSON.stringify({
//       id: uuidv4(),
//       method: "app.broadcast",
//       accessToken: token,
//       data: { event: "eventFromExtension", data: "Hello app!" },
//     }))

//   },
//   getString : ( data , client , token ) => {

//     console.log('COUCOU');

//   }
// };

// const extension = Extension( extensionEvents );