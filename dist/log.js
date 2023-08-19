"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const chalk_1 = __importDefault(require("chalk"));
function log(extensionId, message, type = "INFO") {
    const logLine = `[${extensionId}]: ${chalk_1.default[type === "INFO" ? "green" : "red"](type)} ${(typeof message == 'object' ? JSON.stringify(message, null, '\t') : message)}`;
    console[type === "INFO" ? "log" : "error"](logLine);
}
exports.log = log;
//# sourceMappingURL=log.js.map