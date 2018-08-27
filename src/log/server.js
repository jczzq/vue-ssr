// 日志库 bunyan：https://github.com/trentm/node-bunyan
const bunyan = require('bunyan');
const DEBUG = require('../../.env').DEBUG || false;

class Log {
    constructor() {
        this.log = bunyan.createLogger({
            name: 'avalon',
            level: 'debug',
            streams: [
                {
                    type: 'file',
                    path: `./log/debug.log`
                }
            ]
        });
    }

    debug(name, data) {
        if (!DEBUG) {
            return;
        }
        try {
            this.log.info(
                Object.assign(data, {
                    index_name: name
                })
            );
        } catch (e) {}
    }
}

module.exports = new Log();
