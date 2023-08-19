import chalk from 'chalk';

export function log( extensionId:string , message, type = "INFO") {
  
  const logLine = `[${extensionId}]: ${chalk[
    type === "INFO" ? "green" : "red"
  ](type)} ${(typeof message == 'object' ? JSON.stringify(message , null , '\t') : message)}`;

  console[type === "INFO" ? "log" : "error"](logLine);

}