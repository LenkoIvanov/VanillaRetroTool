import { createLogger, addColors, transports, format } from 'winston';

// Custom log levels
const logLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'blue',
  },
};

// Add colors to the logger
addColors(logLevels.colors);

// Custom logging formatter
const logFormat = format.printf((info) => {
  return `{${info.timestamp}} - [${info.level}]: ${info.message}`;
});

const logger = createLogger({
  levels: logLevels.levels,
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.timestamp({ format: 'DD.MM.YY - HH:MM:SS' }), logFormat),
    }),
  ],
});

export default logger;
