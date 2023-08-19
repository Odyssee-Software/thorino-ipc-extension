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
const lib_1 = require("@neutralinojs/lib");
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
const Dispatch = (extensionName, event, data) => {
    let replyChanelId = (0, uuid_1.v4)();
    return new Promise((next, reject) => __awaiter(void 0, void 0, void 0, function* () {
        let { connected, loaded } = yield lib_1.extensions.getStats();
        if (!connected.includes(extensionName) && loaded.includes(extensionName))
            reject(new Error(`Extension {${extensionName}} is loaded but isn't connected`));
        else if (!connected.includes(extensionName) && !loaded.includes(extensionName))
            reject(new Error(`Extension {${extensionName}} isn't loaded and connected`));
        lib_1.events.on(`${replyChanelId}-${event}`, (response) => {
            next(response);
        });
        lib_1.extensions.dispatch(extensionName, event, {
            chanel: `${replyChanelId}-${event}`,
            data
        });
    }));
};
exports.Dispatch = Dispatch;
//# sourceMappingURL=dispatch.js.map