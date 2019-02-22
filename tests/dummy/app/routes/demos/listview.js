import Route from '@ember/routing/route';
import EmberObject from '@ember/object';
import {A} from '@ember/array';

export default Route.extend({
  setupController(controller/*, model*/) {
    let items = A();
    for (let index = 0; index < 10; index++) {
      items.push(EmberObject.create({id: `id:${index}`, key: `key:${index}`, value: `value:${index}`}));
    }
    controller.set('model', items);
  }
});
