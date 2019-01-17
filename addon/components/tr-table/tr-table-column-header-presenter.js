import Component from '@ember/component';
import layout from '../../templates/components/tr-table/tr-table-column-header-presenter';

export default Component.extend({
  layout,
  columnDefinition: null,
  filterValue: '',
  toggleSorting: null,
  columnState: null,
  applyColumnFilter: null
});
