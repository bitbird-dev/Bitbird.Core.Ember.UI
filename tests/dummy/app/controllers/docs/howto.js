import Controller from '@ember/controller';

export default Controller.extend({
  formFirstName: '',
  formLastName: '',
  init(){
    this._super(...arguments);
  },
  // BEGIN-SNIPPET howto.js
  actions: {
    submitAction(){
      alert(`Hello ${this.formFirstName} ${this.formLastName}!`);
    },
  }
  // END-SNIPPET
});