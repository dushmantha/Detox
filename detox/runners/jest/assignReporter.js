const _ = require('lodash');
const chalk = require('chalk').default;
const detox = require('../../src');
const log = require('../../src/utils/logger').child();

class WorkerAssignReporter {
  onSuiteStart(event) {
    const { describeBlock } = event;
    const isTopLevel = describeBlock.parent && describeBlock.parent.parent === undefined;

    if (isTopLevel) {
      this._report(describeBlock.name);
    }
  }

  _report(suiteName) {
    const deviceName = _.attempt(() => detox.device.name);
    const formattedDeviceName = _.isError(deviceName)
      ? chalk.redBright('undefined')
      : chalk.blueBright(deviceName);

    log.info({event: 'WORKER_ASSIGN'}, `${chalk.whiteBright(suiteName)} is assigned to ${formattedDeviceName}`);
  }
}

module.exports = WorkerAssignReporter;
