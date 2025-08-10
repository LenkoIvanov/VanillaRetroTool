import { createLogger, addColors, transports, format } from 'winston';

const logLevelColors = {
  error: 'red',
  warn: 'yellow',
  info: 'blue',
};

// Register colors
addColors(logLevelColors);

const capitalizeLevel = format((info) => {
  info.level = info.level.toUpperCase();
  return info;
});

const logFormat = format.printf((info) => {
  return `{${info.timestamp}} - [${info.level}]: ${info.message}`;
});

/**
 * Utilizes default levels
 * (error -> warn -> info -> http -> verbose -> debug -> silly)
 */
const logger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        capitalizeLevel(),
        format.colorize(),
        format.timestamp({ format: 'DD.MM.YY - HH:mm:ss' }),
        logFormat
      ),
    }),
  ],
});

export default logger;
