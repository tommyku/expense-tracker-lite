import {v4 as guid} from 'uuid';

class Category {
  constructor(arg) {
    switch (typeof arg) {
      case 'Category':
        this.constructAsCategory(arg);
        break;
      case 'object':
        this.constructAsObject(arg);
        break;
      default:
        this.constructAsObject({name: 'nothing', uuid: guid()});
    }
  }

  constructAsCategory(category) {
    this.constructAsObject(category.serialize());
  }

  constructAsObject({name = null, uuid = null}) {
    this.name = name;
    this.uuid = uuid || guid();
  }

  serialize() {
    return {
      name: this.name,
      uuid: this.uuid
    };
  }
}

export default Category;
