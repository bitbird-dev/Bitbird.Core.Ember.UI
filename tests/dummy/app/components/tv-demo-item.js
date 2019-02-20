import Component from '@ember/component';

export default Component.extend({
  attributeBindings: ['data-item-id'],
  classNameBindings: [
      'item.inProgress:in-progress',
      'item.isExpanded:is-expanded:is-collapsed',
      'item.hasAnyChildRealm:is-node:is-leaf',
      'item.isDirty:is-dirty'
  ],
  
  actions:{
    onToggle(){
      let i = this.get('item.isExpanded');
      if(i !== undefined){
        this.set('item.isExpanded', !i);
      }
    }
  }
});
