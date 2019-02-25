import Route from '@ember/routing/route';
import EmberObject from '@ember/object';

export default Route.extend({
  setupController(controller/*, model*/) {
    controller.set('isSelected', false);
    controller.set('label', 'label');
    controller.set('info', EmberObject.create({title:'title', content:'content', label:'label'}));
    controller.set('title', 'title');
    controller.set('errors', null);
    controller.set('placeholder', 'placeholder');
    controller.set('allowNull', false);
  }
});
