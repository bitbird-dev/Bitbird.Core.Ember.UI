import Controller from '@ember/controller';
import EmberObject from '@ember/object';
import {A} from '@ember/array';

export default Controller.extend({
  selectedItem: null,
  selectedKey: 'key 1',
  items: null,

  selectedValue: 'Item 3',
  values: null,

  style: 'popout',

  toggleAllowNull:false,

  init(){
    this._super(...arguments);
// BEGIN-SNIPPET tr-select-editor.js
    let items = A(),
        values = A();
    for (let index = 1; index < 11; index++) {
        for (let iidx = 1, imax = 4; iidx < imax; iidx++) {
            values.pushObject(`Item ${iidx}${index}`);
            items.pushObject(EmberObject.create({ key: `key ${index}`, value: `value ${iidx}${index}`}));
        }
    }
    this.setProperties({
        items: items,
        values: values
    });
// END-SNIPPET
  },
  actions: {
      selectItemByKey(key) {
          this.set('selectedItem', this.get('items').findBy('key', key));
      },
      selectKey(key) {
          this.set('selectedKey', key);
      },
      selectStyle(key) {
          this.set('style', key);
      }
  }
});
