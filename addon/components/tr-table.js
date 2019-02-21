import Component from '@ember/component';
import EmberObject from '@ember/object';
import { camelize } from '@ember/string';
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
            // TODO: change default filter type
            let key = `_${definition.attributeName.camelize()}`;
            columnStates.set(key, EmberObject.create({ sortOrder: 'noSort', filterValue: '', filterType: definition.allowedFilterType }));
        });
        this.set('columnStates', columnStates);
    }).on('init'),

    init(){
        this._super(...arguments);
    },

    /** TODO: no need for the trigger */
    toggleRowExpansion(row/*, trigger*/) {
        // if(trigger === 'rowClick' && !this.get('toggleOnRowClick')) return;
        if(!row) return;
        row.set('isExpanded', !row.get('isExpanded'));
    },

    onRowClicked: null,
    onRowDoubleClicked: null,
    onRowCtrlClicked: null,
    onRowDragStart: null,

    actions : {
        /**
         * @param  {} rowData
         */
        rowClicked(rowData){
            let callback = this.get('onRowClicked');
            if(callback !== null){
                callback(rowData);
            }
        },
        /**
         * @param  {} rowData
         */
        rowDoubleClicked(rowData){
            let callback = this.get('onRowDoubleClicked');
            if(callback !== null){
                callback(rowData);
            }
        },
        /**
         * @param  {} rowData
         */
        rowCtrlClicked(rowData){
            let callback = this.get('onRowCtrlClicked');
            if(callback !== null){
                callback(rowData);
            }
        },
        /**
         * @param  {} rowData
         * @param  {} event
         */
        rowDragStart(rowData, event){
            let callback = this.get('onRowDragStart');
            if(callback !== null){
                callback(rowData, event);
            }
        },
        /**
         * Calls the Filter callback. 
         * @param  {} columnDefinition
         */
        applyColumnFilter(columnDefinition){
            let key = `_${columnDefinition.attributeName.camelize()}`;
            let state = this.columnStates[key];
            let filterAction = this.onFilterChanged;
            if(filterAction !== null){
                filterAction({attr: columnDefinition.attributeName, filter: state.filterValue, filterType: state.filterType});
            }
        },
        /** TODO: This is obsolete now */
        // toggle(row, trigger) {
        //     this.toggleRowExpansion(row, trigger);
        // },
        /**
         * Toggles the sorting mode for the colum
         * @param  {} columnDefinition
         */
        toggleSorting(columnDefinition){
            //get column sort order for column
            let camelizedAttributeName = `_${columnDefinition.attributeName.camelize()}`;
            let lastState = this.columnStates[camelizedAttributeName].sortOrder;
            let newState = 'noSort';

            //clear column sort order for all columns
            this.headerDefinition.forEach((header)=> {
                let key = `_${header.attributeName.camelize()}`;
                this.columnStates.get(key).set('sortOrder', 'noSort');
            });

            // select new state
            if(lastState === 'noSort'){
                newState = 'asc';
            } else if (lastState === 'asc'){
                newState = 'dsc';
            }

            // apply new state
            this.columnStates.get(camelizedAttributeName).set('sortOrder', newState);
            
            let sortAction = this.onSortingChanged;
            if(sortAction !== null){
                sortAction({attr: columnDefinition.attributeName, state: newState});
            }
            
        },
    }
});
