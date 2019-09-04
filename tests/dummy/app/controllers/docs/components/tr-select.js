import Controller from '@ember/controller';
import EmberObject, {computed, observer} from '@ember/object';
import {A} from '@ember/array';
import { Promise } from 'rsvp';
import { later } from '@ember/runloop';
import ObjectProxy from '@ember/object/proxy';
import PromiseProxyMixin from '@ember/object/promise-proxy-mixin';

export default Controller.extend({
    selectedItems: A(),
    selectedItem: null,
    selectedKey: null,
    items: null,
    isCloseOnPrimary: true,

    values: null,

    style: 'popout',

    toggleAllowNull:false,

    _keyDidChange: observer('items','items.@each.isPending','selectedKey', function() {
        let all = this.get('items') || [],
            selectedKey = this.get('selectedKey');

        if(all.getEach('isPending').any(function(_bool){ return _bool === true; })) {
            return;
        }

        let match = all.find(function(currentItem) {
            return currentItem.get('key') === selectedKey;
        });

        if(match === this.get('selectedItem')) return;

        this.set('selectedItem', match);
    }),


    _selectedItemDidChange: observer('items','selectedItem','selectedItem.isPending', function() {
        if(this.get('selectedItem.isPending')) {
            return;
        }

        let selectedItemKey = this.get('selectedItem.key') || null,
            selectedKey = this.get('selectedKey') || null;

        if(selectedItemKey === selectedKey) return;

        this.set('selectedKey', selectedItemKey);
    }),

    eventOutput: '',
    feedEventOutput: null,
    onPrimaryAction: null,
    onOpen: null,
    onClose: null,

    loadData(loadAsync) {
        let items = A(),
            values = A();

        let ObjectPromiseProxy = ObjectProxy.extend(PromiseProxyMixin);

        let initialProps = {},
            _fun = function(){};

        if(loadAsync)
        {
            // BEGIN-SNIPPET tr-select-promise.js

            _fun = function() {
                for (let index = 1; index < 30; index++) {
                    for (let iidx = 1, imax = 4; iidx < imax; iidx++) {
                        let obj = EmberObject.create({ key: `key ${iidx}${index}`, value: `value ${iidx}${index}`});
                        let promise = ObjectPromiseProxy.create({
                            promise: new Promise(function(resolve) {
                                later(this, function() {
                                    resolve(obj);
                                }, 1500);
                            })
                        });

                        if(iidx===1 && index === 2) {
                            initialProps = {
                                selectedKey: `key ${iidx}${index}`,
                                selectedItem: obj
                            }
                        }

                        values.pushObject(`value ${iidx}${index}`);
                        items.pushObject(promise);
                    }
                }

                initialProps.items = items;
                initialProps.values = values;

                this.setProperties(initialProps);
            };
            later(this, _fun, 1000);

            // END-SNIPPET
        } else {
            _fun = function() {
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
            };
            _fun.apply(this);
        }
    },

    init(){
// BEGIN-SNIPPET tr-select.js
        this.loadData(true);
        this.setProperties({
            feedEventOutput: (text) => {
                this.set('eventOutput', this.get('eventOutput') + `${moment().format('HH:mm:ss')}: ${text}\n`);
            },
            onPrimaryAction: () => {
                this.get('feedEventOutput')('onPrimaryAction');
            },
            onOpen: () => {
                this.get('feedEventOutput')('onOpen');
            },
            onClose: () => {
                this.get('feedEventOutput')('onClose');
            }
        });

        this._super(...arguments);
// END-SNIPPET
    },
    actions: {
        changeDisplayValues(){
            this.get('items').forEach((item, idx) => {
                item.set('value', 'value ' + idx + '-' + new Date().getMilliseconds());
            });
        },
        selectItemByKey(key) {
            this.setProperties({
                selectedKey: key,
                //selectedItem: this.get('items').findBy('key', key)
            });
        },
        selectStyle(key) {
            this.set('style', key);
        }
    }
});
