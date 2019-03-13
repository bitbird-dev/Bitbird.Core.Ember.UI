import Controller from '@ember/controller';

export default Controller.extend({
  timeModeOptions: null,
  selectedTimeMode : null,
  
  modeOptions: null,
  selectedMode: 'single',

  startsOnMonday: true,

  selectedDate: null,

  isOpen: true,

  init(){
    this._super(...arguments);
    this.set('timeModeOptions', [
      {value:'null', name:'null'},
      {value:'hm', name:'hm'},
      {value:'hms', name:'hms'},
    ]);
    this.set('modeOptions', [
      {value:'single', name:'single'},
      {value:'range', name:'range'},
      {value:'multiple', name:'multiple'},
    ]);
// BEGIN-SNIPPET tr-datetime-picker.js
    this.set('selectedDate', new Date(Date.now()));
// END-SNIPPET
  },
  actions:{
    toggleIsOpen(){
      this.toggleProperty('isOpen');
    },
    setSelectedTimeMode: function(selected) {
      this.set('selectedTimeMode', selected);
    },
    setSelectedMode: function(selected) {
      this.set('selectedMode', selected);
    },
  },
});