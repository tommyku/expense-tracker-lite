import {v4 as guid} from 'uuid';

class Record {
  constructor(arg) {
    switch (typeof arg) {
      case 'Record':
        this.constructAsRecord(arg);
        break;
      case 'object':
        this.constructAsObject(arg);
        break;
      default:
        this.constructAsObject({});
    }
  }

  constructAsRecord(record) {
    this.constructAsObject(record.serialize());
  }

  constructAsObject(object) {
    const defaultAttributes = {
      createdAt: (new Date()).toString(),
      currency: 'HKD', // ISO 4217 currency code
      amount: 0.0,
      mode: this.MODES.OUTCOME,
      uuid: guid()
    };

    const {uuid, mode, amount, currency, createdAt} = Object.assign(
      defaultAttributes, object
    );

    this.createdAt = createdAt;
    this.currency = currency;
    this.amount = amount;
    this.mode = mode;
    this.uuid = uuid;
  }

  serialize() {
    return {
      createdAt: this.createdAt,
      currency: this.currency,
      amount: this.amount,
      mode: this.mode,
      uuid: this.uuid,
    };
  }
}

Record.prototype.MODES = {
  INCOME: 'in',
  OUTCOME: 'out'
}

export default Record;
