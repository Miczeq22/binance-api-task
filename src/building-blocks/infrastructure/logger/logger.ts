import { createLogger, format, transports } from 'winston';

import { envConstants, getStringEnvVar } from '../environments/utils';

export interface Logger {
  log: LogMethod;
  error: LeveledLogMethod;
  warn: LeveledLogMethod;
  info: LeveledLogMethod;
  verbose: LeveledLogMethod;
  debug: LeveledLogMethod;
}

export type LogMethod = (level: string, message: string) => Logger;

export type LeveledLogMethod = (message: string, error?: unknown) => Logger;

const logFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} | [${level}]: ${message}`;
});

export const loggerDev: Logger = createLogger({
  level: getStringEnvVar('LOGGING_LEVEL', 'debug'),
  transports: [
    new transports.Console({
      format: format.combine(format.timestamp(), format.colorize(), format.splat(), format.align(), logFormat),
    }),
  ],
});

export const loggerProd: Logger = createLogger({
  level: getStringEnvVar('LOGGING_LEVEL', 'debug'),
  format: format.json(),
  transports: [new transports.Console({})],
});

export const logger: Logger = envConstants.isDev ? loggerDev : loggerProd;
