import Controller from '@ember/controller';
import EmberObject from '@ember/object';
import {A} from '@ember/array';

export default Controller.extend({
  item: null,
  selectedItem: null,
  init(){
    this._super(...arguments);
// BEGIN-SNIPPET tr-select-editor.js
    let items = A();
    for (let index = 0; index < 10; index++) {
      items.push(EmberObject.create({ key: `key ${index}`, value: `value ${index}`}));
    }
    this.set('items', items);
    this.set('selectedItem', items[0]);
// END-SNIPPET
  },
});