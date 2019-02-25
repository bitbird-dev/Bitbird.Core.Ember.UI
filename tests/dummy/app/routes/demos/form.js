import Route from '@ember/routing/route';
import EmberObject from '@ember/object';
import {A} from '@ember/array';

export default Route.extend({
  setupController(controller/*, model*/) {
    let items = A();
    for (let index = 0; index < 10; index++) {
      items.push(EmberObject.create({
        id: `id:${index}`, 
        header: `header:${index}`, 
        size: 1, 
        useCustomMenu: false, 
        fullSizeContent: false, 
        canMaximize: true, 
        canCollapse: true, 
        overflow: null,
      }));
    }
    controller.set('model', items);
    controller.set('formSettings', EmberObject.create({isFullScreen:false, section:false, escape:false, size:2}));
    controller.set('overflowOptions', A(['null','left','right','both']));
  }
});