import Route from '@ember/routing/route';
import EmberObject from '@ember/object';

export default Route.extend({
//BEGIN-SNIPPET tr-numeric-editor.js
/** app/routes/components/tr-numeric-editor.js */
  setupController(controller/*, model*/) {
    controller.set('label', 'label');
    controller.set('title', 'title');
    controller.set('info', 'info');
    controller.set('errors', null);
    controller.set('placeholder', 'placeholder');
    controller.set('allowNull', false);
    controller.set('isReadonly', false);

    controller.set('minValue', 0);
    controller.set('maxValue', 100);
    controller.set('fractionLength', 2);
    controller.set('value', 99);    
  }
//END-SNIPPET
});
