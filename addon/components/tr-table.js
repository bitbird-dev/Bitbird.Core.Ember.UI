import Component from '@ember/component';
import EmberObject from '@ember/object';
import { observer } from '@ember/object';
import layout from '../templates/components/tr-table';

export default Component.extend({
  layout,
  tableData: null,
    headerDefinition: null,
    columnStates: null,
    toggleOnRowClick: false,

    _refreshColumnStates: observer('headerDefinition', function() {
        let columnStates = EmberObject.create({});
        (this.get('headerDefinition') || []).forEach(definition => {
            columnStates.set(definition.attributeName, EmberObject.create({ sortOrder: 'noSort', filterValue: '' }));
        });
        this.set('columnStates', columnStates);
    }).on('init'),

    init(){
        this._super(...arguments);
        this.activeFilters = new Map();
        this.queryCallback(Object.create(null)).then((queryResult) => this.set('tableData', queryResult.results));
    },
    requestfilterData(){
        let queryParams = Object.create(null);
        this.activeFilters.forEach((value,key)=>{
            if(value !== '') {
                queryParams[key]=value;
            }
        });
        let filterAction = this.queryCallback;
        filterAction(queryParams).then((filterResults) => { 
            this.set('tableData', filterResults.results);
        });
    },
    toggle(row, trigger) {
        if(trigger === 'rowClick' && !this.get('toggleOnRowClick')) return;
        if(!row) return;
        row.set('isExpanded', !row.get('isExpanded'));
    },
    actions : {
        /* Build a query like this: 
        param = {page[size] : 100, page[number] : 1, sort : -name, filter[firstname]=FREETEXT(flo*), filter[carId]=RANGE(12,13), filter[muh]=IN(muh1, muh3, anderemuh)}*/
        applyColumnFilter(columnDefinition){
            let filterValue = this.columnStates[columnDefinition.attributeName].filterValue;
            this.activeFilters.set(`Filter[${columnDefinition.attributeName}]`, filterValue);
            this.requestfilterData();
        },
        setPageSize(pagesize){
            this.activeFilters.set('Page[size]', pagesize);
        },
        gotoPage(index){
            this.activeFilters.set('Page[number]', index);
            this.requestfilterData();
        },
        nextPage(){
            let current = this.activeFilters.get('Page[number]');
            if(current === undefined) { current = 0;}
            this.activeFilters.set('Page[number]', current + 1);
            this.requestfilterData();
        },
        previousPage(){
            let current = this.activeFilters.get('Page[number]');
            if(current === undefined) { current = 1;}
            let prev = current - 1; 
            this.activeFilters.set('Page[number]', (prev < 0) ? 0 : prev);
            this.requestfilterData();
        },
        toggle(row, trigger) {
            this.toggle(row, trigger);
        },
        toggleSorting(columnDefinition){
            //get column sort order for column
            let lastState = this.columnStates[columnDefinition.attributeName].sortOrder;
            let newState = 'noSort';

            //clear column sort order for all columns
            this.headerDefinition.forEach((header)=> {
                this.columnStates.get(header.attributeName).set('sortOrder', 'noSort');
            });

            // select new state
            if(lastState === 'noSort'){
                newState = 'asc';
            } else if (lastState === 'asc'){
                newState = 'dsc';
            }

            // apply new state
            this.columnStates.get(columnDefinition.attributeName).set('sortOrder', newState);
            
            // set query filter
            let sortString = '';
            if(newState !== 'noSort'){
                sortString = (newState === 'asc') ? columnDefinition.attributeName : `-${columnDefinition.attributeName}`;
            }
            this.activeFilters.set('sort', sortString);

            // reload data
            this.requestfilterData();
        },
    }
});
