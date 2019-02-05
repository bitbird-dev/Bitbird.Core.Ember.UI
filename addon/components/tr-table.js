import Component from '@ember/component';
import EmberObject from '@ember/object';
import { filterBy } from '@ember/object/computed';
import { observer } from '@ember/object';
import layout from '../templates/components/tr-table';
export default Component.extend({
    layout,
    classNames: 'btbrd-table',
    tableData: null,
    headerDefinition: null,
    columnStates: null,
    toggleOnRowClick: false,
    onFilterChanged: null,
    onSortingChanged: null,
    
    _refreshColumnStates: observer('headerDefinition', function() {
        let columnStates = EmberObject.create({});
        (this.get('headerDefinition') || []).forEach(definition => {
            columnStates.set(definition.attributeName, EmberObject.create({ sortOrder: 'noSort', filterValue: '', filterType: 'FREETEXT' }));
        });
        this.set('columnStates', columnStates);
    }).on('init'),

    init(){
        this._super(...arguments);
        // if (this.onRowSelect === null) {
        //     this.onRowSelect = (row, trigger) =>{
        //         if(!row) return;
        //         row.set('isSelected', !row.get('isSelected'));
        //     };
        // }
        // if (this.onRowDragStart === null) {
        //     this.onRowDragStart = (rowData, event) =>{
        //         let items = this.get('selectedItems');
        //         if(item === null) return;
        //         let idArray = [];
        //         if(items.length > 0){
                    
        //             items.forEach( i => {idArray.push(i.id)});
        //         }
        //         else{
        //             idArray.push(rowData.id);
        //         }
        //         event.dataTransfer.setData('text/data', idArray);
        //     };
        // }
        
    },

    toggleRowExpansion(row, trigger) {
        if(trigger === 'rowClick' && !this.get('toggleOnRowClick')) return;
        if(!row) return;
        row.set('isExpanded', !row.get('isExpanded'));
    },

    onRowClicked: null,
    onRowCtrlClicked: null,
    onRowDragStart: null,

    actions : {
        rowClicked(rowData){
            let callback = this.get('onRowClicked');
            if(callback !== null){
                callback(rowData);
            }
        },
        rowCtrlClicked(rowData){
            let callback = this.get('onRowCtrlClicked');
            if(callback !== null){
                callback(rowData);
            }
        },
        rowDragStart(rowData, event){
            let callback = this.get('onRowDragStart');
            if(callback !== null){
                callback(rowData, event);
            }
        },
        applyColumnFilter(columnDefinition){
            let state = this.columnStates[columnDefinition.attributeName];
            let filterAction = this.onFilterChanged;
            if(filterAction !== null){
                filterAction({attr: columnDefinition.attributeName, filter: state.filterValue, filterType: state.filterType});
            }
        },
        toggle(row, trigger) {
            this.toggleRowExpansion(row, trigger);
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
            
            let sortAction = this.onSortingChanged;
            if(sortAction !== null){
                sortAction({attr: columnDefinition.attributeName, state: newState});
            }
            
        },
    }
});
