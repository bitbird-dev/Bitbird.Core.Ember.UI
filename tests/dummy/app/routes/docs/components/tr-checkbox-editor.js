import Route from '@ember/routing/route';
import EmberObject from '@ember/object';

export default Route.extend({
//BEGIN-SNIPPET tr-checkbox-editor.js
/** app/routes/components/tr-checkbox-editor.js */
  setupController(controller/*, model*/) {
    controller.set('label', 'checkbox label');
    controller.set('info', EmberObject.create({title:'title', content:'content', label:'label'}));
    controller.set('title', 'title');
    controller.set('errors', null);
    controller.set('placeholder', 'placeholder');
    controller.set('allowNull', false);
    controller.set('isSelected', false);
  }
//END-SNIPPET
});
