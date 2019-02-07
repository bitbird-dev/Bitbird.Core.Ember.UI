import Component from '@ember/component';
import layout from '../../templates/components/tr-table/tr-table-cell-presenter';

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

    init(){
      this._super(...arguments);
    },
});
