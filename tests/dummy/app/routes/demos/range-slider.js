import Route from '@ember/routing/route';
import EmberObject from '@ember/object';

export default Route.extend({
  setupController(controller/*, model*/) {
    controller.set('model', EmberObject.create({id: 'id:0', value: 0}));
  }
});
