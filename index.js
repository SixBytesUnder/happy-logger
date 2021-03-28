const { Console } = require('console');
const fs = require('fs');

const console = new Console(process.stdout, process.stderr);

module.exports = {
  options: {
    clean: false, // just the message, not preppended with anything
    level: 'INFO',
    env: 'development',
    transport: 'file...',
    prepend: {
      enable: true,
      message: '',
      get value() {
        // delete this.notifier;
        console.log(this);
        return `[${this.date} ${this.time}] ${this.level} `;
      }
    },
    append: {
      enable: false,
      message: '',
      get value() {
        return `[${this.date} ${this.time}] ${this.level} `;
      }
    }
  },
  // level: process.env.LOG_LEVEL,
  level: 'INFO',
  timestamp: new Date().getTime(),
  date: new Date().toISOString().slice(0, 19).split('T')[0],
  time: new Date().toISOString().slice(0, 19).split('T')[1],
  log(...args) {
    if (this.options.env === 'production') {
      if (!fs.existsSync('./logs/')) {
        fs.mkdirSync('./logs/');
      }
      fs.writeFile(`./logs/${this.date}.log`, `${this.options.prepend.value} ${args}\n`, { flag: 'a' }, (err) => {
        if (err) throw err;
      });
    } else {
      process.stdout.write(this.options.prepend.value);
      console.log(...args);
      process.stdout.write(this.options.append.value);
    }
  },
  error(message, stack = '') {
    if (process.env.ENV === 'production') {
      fs.writeFile(`./logs/${this.date}.log`, `[${this.date} ${this.time}] ERROR ${message} ${stack}\n`, { flag: 'a' }, (err) => {
        if (err) throw err;
      });
    } else {
      console.error(`[${this.date} ${this.time}] ERROR`, message, stack);
    }
  }
};
