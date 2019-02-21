import Component from '@ember/component';
import { run } from '@ember/runloop';
import { computed } from '@ember/object';
const { later, cancel } = run;
import layout from '../templates/components/tr-treeview';

/**
 * A sortable Treeview with expandable nodes.
 * 
 * @module
 * @augments ember/component
 * @kind class
 * @public
 * @name addon.components.trTreeView
*/
export default Component.extend({
    layout,

    classNames: 'tr-treeview',
    classNameBindings: 'isSorting',
    tagName: 'ul',

    /**
     * The Tree data.
     * 
     * @type {Object}
     * @public
     * @memberof addon.components.trTreeView
     */
    model: null,

    enableSorting: false,
    isSorting: false,
    showPath: false,

    /**
     * Name of the property containing the child items.
     * 
     * @type {String}
     * @public
     * @memberof addon.components.trTreeView
     */
    childItemsPropertyName: 'items',

    /**
     * Name of the property tracking the busy state.
     * 
     * @type {String}
     * @public
     * @memberof addon.components.trTreeView
     */
    isBusyPropertyName: 'isBusy',

    /**
     * Name of the property tracking the tree item's expandsion state.
     * 
     * @type {String}
     * @public
     * @memberof addon.components.trTreeView
     */
    isExpandedPropertyName: 'isExpanded',

    /**
     * Name of the property indicating wether the item is a leaf node.
     * 
     * @type {String}
     * @public
     * @memberof addon.components.trTreeView
     */
    hasAnyChildItemPropertyName: 'hasAnyChild',

    isDirtyPropertyName: 'isDirty',

    routeName: null,

    itemComponentName: 'tr-container',

    didInsertElement: function(){
        let self = this,
            childItemsPropertyName = this.get('childItemsPropertyName');
        run.schedule('actions', function () {
            if(!self.get('enableSorting')) return;
            self.$().sortable({
                axis: 'y',
                dropOnEmpty: false,
                distance: 5,
                items: 'li',
                cancel: '.is-dirty',
                opacity: 0.5,
                scroll: true,
                revert: true,
                start: function(event, ui) {
                    self.set('isSorting', true);
                    let itemId = ui.item.attr('data-item-id'),
                        model = self.get('model.' + childItemsPropertyName).find(function(item) { return item.get('id').toString() == itemId; }),
                        index = $(ui.item).index();

                    //Ember.run.schedule('actions', function () {
                        self.sendAction('onStartSorting', model, index);
                    //});
                },
                update: function(event, ui) {
                    let itemId = ui.item.attr('data-item-id'),
                        model = self.get('model.' + childItemsPropertyName).find(function(item) { return item.get('id').toString() == itemId; }),
                        index = $(ui.item).index();

                    //Ember.run.schedule('actions', function () {
                        self.sendAction('onUpdateSorting', model, index);
                    //});
                },
                stop: function(event, ui) {
                    if(self._sortingStopCallback) {
                        cancel(self._sortingStopCallback);
                        this._sortingStopCallback = null;
                    }

                    let itemId = ui.item.attr('data-item-id'),
                        model = self.get('model.' + childItemsPropertyName).find(function(item) { return item.get('id').toString() == itemId; }),
                        index = $(ui.item).index();

                    //Ember.run.schedule('actions', function () {
                        self.sendAction('onStopSorting', model, index);
                    //});

                    self._sortingStopCallback = later(self, function() {
                        this.set('isSorting', false);
                        this._sortingStopCallback = null;
                    }, 2500);
                }
            });
        });
    },

    self: computed({
        get() {
            return this;
        }
    }),

    actions: {
        toggle (item){
            this.sendAction('onToggle', item);
        },
        customAction (item){
            this.sendAction('onCustomAction', item);
        },
        startSorting (item, index){
            if(!this.get('enableSorting')) return;
            this.sendAction('onStartSorting', item, index);
        },
        updateSorting (item, index){
            if(!this.get('enableSorting')) return;
            this.sendAction('onUpdateSorting', item, index);
        },
        stopSorting (item, index){
            if(!this.get('enableSorting')) return;
            this.sendAction('onStopSorting', item, index);
        },
    }
});
