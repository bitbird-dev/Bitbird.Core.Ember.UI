import Route from '@ember/routing/route';

export default Route.extend({
  setupController(controller/*, model*/) {
    controller.set('treeData', {
      items: [{
        id: '1',
        level: 0,
        isExpanded: false,
        hasAnyChild: true,
        items: [{
          id: '1',
          level: 1,
          isExpanded: false,
          hasAnyChild: false
        },{
          id: '2',
          level: 1,
          isExpanded: false,
          hasAnyChild: true,
          items: [{
            id: '1',
            level: 2,
            isExpanded: false,
            hasAnyChild: false
          },{
            id: '2',
            level: 2,
            isExpanded: false,
            hasAnyChild: false
          }]
        }]
      },{
        id: '2',
        level: 0,
        isExpanded: false,
        hasAnyChild: false
      }]
    });
  }
});
