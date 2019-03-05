import Controller from '@ember/controller';
export default Controller.extend({
  status: "click a row...",
  isOpen: true,
  sidebarMode: false,
  toggleIsResizeable: false,
  enableBackdrop: false,
  selectedOption: 'vertical',
  orientationOptions: null,
  init() {
    this._super(...arguments);
    this.set('orientationOptions', [
      {value:'vertical', name:'vertical'},
      {value:'vertical-inverse', name:'vertical-inverse'},
      {value:'horizontal', name:'horizontal'},
      {value:'horizontal-inverse', name:'horizontal-inverse'},
    ]);
    this.set('selectedOption', 'vertical');
  },
  // BEGIN-SNIPPET tr-splitview-actions.js
  actions:{
    toggleIsOpen(){
      this.toggleProperty('isOpen');
    },
    setSelection: function(selected) {
      this.set('selectedOption', selected);
    },
  },
  // END-SNIPPET
});