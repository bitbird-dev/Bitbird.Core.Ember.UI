import Controller from '@ember/controller';

export default Controller.extend({
  clickCount: 0,
  isDisabled: false,
  isReadonly: false,
  highlight: false,
  init(){
    this._super(...arguments);
  },
  // BEGIN-SNIPPET tr-button-editor-click.js
  actions: {
    onClick() {
      this.incrementProperty('clickCount');
    },
  }
  // END-SNIPPET
});
