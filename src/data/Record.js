import {v4 as guid} from 'uuid';

const INCOME = 'in',
      OUTCOME = 'out';

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

  static get INCOME() {
    return INCOME;
  }

  static get OUTCOME() {
    return OUTCOME;
  }

  constructAsRecord(record) {
    this.constructAsObject(record.serialize());
  }

  constructAsObject(object) {
    const defaultAttributes = {
      createdAt: (new Date()).toString(),
      currency: 'HKD', // ISO 4217 currency code
      amount: 0.0,
      mode: this.OUTCOME,
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

export default Record;
