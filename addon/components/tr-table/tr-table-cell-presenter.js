import Component from '@ember/component';
import layout from '../../templates/components/tr-table/tr-table-cell-presenter';

/**
 * Represents the state of a table cell.
 * @param  {null} value the cells data
 * @param  {null} column the column which contains the cell
 * @param  {null} toggleRowExpansion action to trigger whether the cells row should be expanded
 */
export default Component.extend({
  layout,
  classNames: "cell-presenter",

  value: null,
  column: null,
  toggleRowExpansion: null,
});
