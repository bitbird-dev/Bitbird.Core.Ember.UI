import Controller from '@ember/controller';
import { A } from '@ember/array';
import Object from '@ember/object';

export default Controller.extend({
    init() {
        this._super(...arguments);
        this._loadItems();
    },

    items: null,

    _loadItems() {
        let data = A();
        data.pushObject(new Object({ id: 1, title: "Element One" }));
        data.pushObject(new Object({ id: 2, title: "Element Two" }));
        data.pushObject(new Object({ id: 3, title: "Element Three" }));
        data.pushObject(new Object({ id: 4, title: "Element Four" }));
        data.pushObject(new Object({ id: 5, title: "Element Five" }));
        console.log(data);
        this.set('items', data);
    }
})
