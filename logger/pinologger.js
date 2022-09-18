const pino = require('pino');

const levels = {
    emerg: 80,
    alert: 70,
    crit: 60,
    error: 50,
    warn: 40,
    notice: 30,
    info: 20,
    debug: 10,
  };

  const streams = [
    { stream: process.stdout },
    { stream: pino.destination({
        dest :`${__dirname}/combined.log` ,
        sync : false}) },
  ];


// process.on('uncaughtException', (err) => {
//     pinoLogger.error(err);
//     process.exit(1);
//   });
  
//   process.on('unhandledRejection', (err) => {
//     pinoLogger.error(err);
//     process.exit(1);
//   });

  const pinoLogger = pino({
    
    level: 'info',
    prettyPrint: true,
    customLevels: levels,
    useOnlyCustomLevels: true,
    formatters: {
      level: (label) => {
        return { level: label };
      },
    },
  },
  pino.multistream(streams)
  
)


  module.exports = pinoLogger