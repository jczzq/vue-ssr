const DEBUG = require('../../.env').DEBUG || false

class Log {
  debug (name, data) {
    if (!DEBUG) {
      return
    }
    console.log(name, data)
  }
}

module.exports = new Log()
