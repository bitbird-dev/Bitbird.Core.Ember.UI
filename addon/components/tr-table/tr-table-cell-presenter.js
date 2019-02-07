import Component from '@ember/component';
import layout from '../../templates/components/tr-table/tr-table-cell-presenter';
import { observer } from '@ember/object';

/**
 * Represents the state of a table cell.
 * @property  {null} value the cells data
 * @property  {null} column the column which contains the cell
 */
export default Component.extend({
  layout,
  classNames: "cell-presenter",

  rowValue: null,
  value: null,
  column: null,
  isloading: false,

  valueObserver: observer('rowValue', ()=>this._refreshValue()),

  init(){
    this._super(...arguments);
    this._refreshValue();
  },

  _refreshValue(){
    // column = 'address.street';
    let paths = this.column.split('.');
    let result = this.rowValue.get(paths[0]);

    if(result === undefined){return;}

    if (paths.length == 1) {
      // synchronous (value is already stored in model, e.g. flat properties like "nr")
      //console.log(this.column + "; path: [" + 0 + "]: " + JSON.stringify(result));
      this.value = result;
      return;
    }

    this.set('isloading', true);
    this.set('value', null);

    //async (value may be fetched. promise is returned. wait for promise to resolve by chaining "then").

    for(let i = 1; i < paths.length; i++){
      result = result.then(x => {
        //console.log(this.column + "; path: [" + (i-1) + "]: " + JSON.stringify(x));
        return x.get(paths[i])
      });
    }
    result.then(x => {
      //console.log(this.column + "; path: [last]: " + JSON.stringify(x));
      this.set('value', x);
      this.set('isloading', false);
    });

    //this.value = result;
    //result = result.then(x => this.value = x);

    //this.value = result.resolve();
  }
});
