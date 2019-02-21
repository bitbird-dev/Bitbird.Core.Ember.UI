import Component from '@ember/component';
import layout from '../../templates/components/tr-table/tr-table-row';

export default Component.extend({
  layout,
  classNames: ['btbrd-table-row'],
  classNameBindings: ['isExtended:is-extended','isSelected:is-selected'],
  attributeBindings: ['draggable'],
  draggable: 'true',

  isSelected: false,
  isExtended: false,

  /**
   * reference to row data in model
   */
  data: null,

  /**
   * register onClick callback here
   */
  onClick:null,

  /**
   * register onClick callback here
   */
  onDoubleClick:null,

  /**
   * register onCtrlClick callback here
   */
  onCtrlClick: null,

  /**
   * register onClick callback here
   */
  onDrag:null,

  dragStart(event){
    let dragCb = this.get('onDrag');
    if(dragCb !== null) {
      return dragCb(this.data, event);
    }
  },

  click(event){
    let clickCb = (event.ctrlKey)?this.get('onCtrlClick'):this.get('onClick');
    if(clickCb !== null) {
      clickCb(this.data);
    }
  },
  doubleClick(event){
    let clickCb = this.get('onDoubleClick');
    if(clickCb !== null) {
      clickCb(this.data);
    }
  }
});

