import Controller from '@ember/controller';
export default Controller.extend({
  status: "click a row...",
  init() {
    this._super(...arguments);
    // BEGIN-SNIPPET tr-table-header.js
    this.set('headers', [{
      headerTitle: 'ColumnOne',
      attributeName: 'attributeOne',
    }, {
      headerTitle: 'ColumnTwo',
      attributeName: 'attributeTwo',
    }, {
      headerTitle: 'ColumnThree',
      attributeName: 'attributeThree',
    }]);
    // END-SNIPPET
    // BEGIN-SNIPPET tr-table-data.js
    this.set('tableData', [{
      attributeOne: Math.random(),
      attributeTwo: Math.random(),
      attributeThree: Math.random(),
    }, {
      attributeOne: Math.random(),
      attributeTwo: Math.random(),
      attributeThree: Math.random(),
    }, {
      attributeOne: Math.random(),
      attributeTwo: Math.random(),
      attributeThree: Math.random(),
    }, {
      attributeOne: Math.random(),
      attributeTwo: Math.random(),
      attributeThree: Math.random(),
    }, {
      attributeOne: Math.random(),
      attributeTwo: Math.random(),
      attributeThree: Math.random(),
    }]);
    // END-SNIPPET
  },
  // BEGIN-SNIPPET tr-table-actions.js
  actions:{
    rowClick(eventData){
      this.set('status',`row {${eventData.attributeOne.toFixed(2)}, ${eventData.attributeTwo.toFixed(2)}, ${eventData.attributeThree.toFixed(2)}} clicked.`);
    }
  },
  // END-SNIPPET
});