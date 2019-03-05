import Controller from '@ember/controller';
export default Controller.extend({
  status: "click a row...",
  isOpen: true,
  sidebarMode: false,
  enableToggle: false,
  enableBackdrop: false,
  init() {
    this._super(...arguments);
  },
  // BEGIN-SNIPPET tr-splitview-actions.js
  actions:{
    toggleIsOpen(){
      this.toggleProperty('isOpen');
    }
  },
  // END-SNIPPET
});