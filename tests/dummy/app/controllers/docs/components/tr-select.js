import Controller from '@ember/controller';
import EmberObject, {computed, observer} from '@ember/object';
import {A} from '@ember/array';

export default Controller.extend({
    selectedItems: A(),
    selectedItem: null,
    selectedKey: null,
    items: null,

    values: null,

    style: 'popout',

    toggleAllowNull:false,

    _keyDidChange: observer('selectedKey', function() {
        let all = this.get('items') || [],
            selectedKey = this.get('selectedKey');

        let match = all.find(function(currentItem) {
            return currentItem.get('key') === selectedKey;
        });
        this.set('selectedItem', match);
    }),

    init(){
// BEGIN-SNIPPET tr-select.js
        let items = A(),
            values = A();
        for (let index = 1; index < 30; index++) {
            for (let iidx = 1, imax = 4; iidx < imax; iidx++) {
                values.pushObject(`value ${iidx}${index}`);
                items.pushObject(EmberObject.create({ key: `key ${iidx}${index}`, value: `value ${iidx}${index}`}));
            }
        }
        this.setProperties({
            items: items,
            values: values
        });

        this._super(...arguments);
// END-SNIPPET
    },
    actions: {
        selectItemByKey(key) {
            this.setProperties({
                selectedKey: key,
                selectedItem: this.get('items').findBy('key', key)
            });
        },
        selectStyle(key) {
            this.set('style', key);
        }
    }
});
