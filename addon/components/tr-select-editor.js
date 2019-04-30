import { computed, observer } from '@ember/object';
import Editor from './tr-editor';
import OutsideClick from '../mixins/tr-outside-click';
import { A } from '@ember/array';
import { next, debounce } from '@ember/runloop';
import layout from '../templates/components/tr-select-editor';
import Ember from 'ember';

export default Editor.extend(OutsideClick, {
    layout,
    i18nProperties: ['placeholder'],

    init: function() {
        let self = this;
        this._super();
        this.on('didInsertElement', this, function() {
            this._itemsDidChange();

            if(this.get('selectedItem')) {
                this._selectedItemChanged();
            }
            if(this.get('selectedKey')){
                this._selectedKeyChanged();
            }
        });

        this.on('willDestroyElement', this, function() {
            this._resetList();
        });
    },

    _updateListPosition() {
        if(!this.get('destinationElement')) return;

        let editable = this.get('editable'),
            $target = $('#' + this.get('destinationElement')),
            $source = $('#' + this.get('elementId')),
            $innerSource = $('#' + this.get('elementId') + ' > .tr-editor > .tr-editor > .tr-editor-content-wrapper');

        //console.log($source.scrollParent().scrollTop());
        let topOffset = $source[0].getBoundingClientRect().top;
        let leftOffset = $source[0].getBoundingClientRect().left;

        if(!$target.length) return;

        $target.removeClass("tr-select-editor-below");
        $target.removeClass("tr-select-editor-above");

        $target.css('min-width', $source.outerWidth());
        $target.css('opacity', '1');

        let topWhenBelow = topOffset + $innerSource.outerHeight();
        let bottomWhenBelow = topWhenBelow + $target.outerHeight();
        let viewPortBottom = this.$(window).height();
        let canOpenBelow = bottomWhenBelow <= viewPortBottom;
        if(canOpenBelow) {
            this.set('_listPosition', 'is-open-below');
            $target.addClass("tr-select-editor-below");
            $target.css('top', topOffset + $innerSource.outerHeight());
            $target.css('left', $source.offset().left);
            $target.css('right', '');
            $target.css('bottom', '');
            return;
        }

        let topWhenAbove = topOffset  - $target.outerHeight();
        let canOpenAbove = topWhenAbove > 0;
        if(canOpenAbove) {
            this.set('_listPosition', 'is-open-above');
            $target.addClass("tr-select-editor-above");
            $target.css('top', topOffset - $target.outerHeight());
            $target.css('left', $source.offset().left);
            $target.css('right', '');
            $target.css('bottom', '');
            return;
        }

        this.set('_listPosition', null);
        $target.css('top', 0);
        $target.css('left', 0);
        $target.css('right', 0);
        $target.css('bottom', 0);
    },
    _resetList() {
        let destinationElement = this.get('destinationElement');
        if(!destinationElement) return;

        this.set('destinationElement', null);
        $('#' + destinationElement).remove();
    },
    _resetListPositionClassName: observer('isOpen', function() {
        let self = this;

        if(this.get('isOpen')) {
            if(this.get('destinationElement')) return;
            //Create wormhole combo
            let destinationElement = "select-editor-" + this.get('elementId');
            Ember.$('body.ember-application').append(`<div id="${destinationElement}" class="tr-select-editor-wormhole-list" style="opacity:0.0001;"></div>`);
            this.set('destinationElement', destinationElement);

            //Refresh position on all parent scrolls
            let $scrollParent = this.$().scrollParent();
            while($scrollParent.length > 0) {
                $scrollParent.scroll(function() { self._updateListPosition(); });
                if($scrollParent[0] === document) break;
                $scrollParent = $scrollParent.scrollParent();
            }

            //Refresh position on resizing
            this.$(window).resize(function() { self._updateListPosition(); });
        } else {
            this._resetList();
            this.set('_listPosition', null);
        }
    }),

    destinationElement: null,

    classNames: 'tr-select-editor',
    classNameBindings: ['isOpen', '_listPosition', 'styleClassName'],

    /*** DATA PROPERTIES ***/

    items: null,

    isMultiple: false,

    selectedItem: null,
    selectedValue: null,
    selectedKey: null,

    selectedItems: null,

    suggestedItem: null,
    suggestedValue: null,

    keyProperty: 'key',
    valueProperty: 'value',

    displayValue: computed(
        'selectedItems', 'selectedItems.{length,@each.isLoaded,@each.isLoading,isPending}',
        'selectedItem', 'selectedItem.isFulfilled',
        'isMultiple', 'i18n.locale', function() {
        if(this.get('isMultiple')) {
            let items = this.get('selectedItems'),
                values = A();

            if(!items) return null;

            items.forEach(function(item) {
                values.pushObject(this._getValue(item));
            }, this);
            return values.toString();
        }

        let selectedItem = this.get('selectedItem');
        if(!selectedItem) return selectedItem;

        let isBusy = selectedItem.then && !selectedItem.isFulfilled;
        if(isBusy) {
            this.busy('displayValue');
        } else {
            this.idle('displayValue');
        }
        if(isBusy) return null;

        return this._getValue(selectedItem);
    }),

    /*** UI PROPERTIES ***/

    /**
     * Toggles the filter mode
     */
    editable: false,

    /**
     * Text shown when no items available
     */
    emptyText: 'Keine Auswahl verfügbar',

    /**
     * Modes: Select, Flat, Popout
     */
    style: 'select',

    /**
     * Computed css class for style
     */
    styleClassName: computed('style', 'align', {
        get() {
            let style = (this.get('style') || '').toString().toLowerCase(),
                align = (this.get('align') || '').toString().toLowerCase();

            let classNames = A();

            classNames.pushObject(['flat','select','popout'].indexOf(style) > -1 ? `tr-select-editor-${style}` : 'tr-select-editor-select');
            classNames.pushObject(['auto','left','right'].indexOf(align) > -1 ? `tr-select-editor-align-${align}` : 'tr-select-editor-align-auto');

            return classNames.join(' ');
        }
    }),

    /**
     * Alignment of the combo content:
     * auto - stretches the combo to the control width
     * left - aligns combo to the left border of the control
     * right - aligns combo to the right border of the control
     */
    align: 'auto',

    /**
     * Toggles the item list
     */
    isOpen: false,

    /**
     * The value placeholder
     */
    placeholder: null,

    /**
     * Allows cleaning the value by x-Button
     */
    allowNull: true,

    /**
     * Item property to use as id value
     */
    idPropertyName: 'id',

    /**
     *  The position where the list is open
     */
    _listPosition: null,

    popoutHeader: null,
    popoutPrimaryText: 'Ok',

    /*** OBSERVER ***/
    _selectedItemChanged: observer('selectedItem', function() {
        //next(this, function() {
            this.set('selectedKey', this._getKey(this.get('selectedItem')));
            this.set('selectedValue', this._getValue(this.get('selectedItem')));
            this.set('suggestedItem', null);
            //this.close();
        //});
    }),

    _selectedKeyChanged: observer('selectedKey', function(){
        //next(this, function() {
            let self = this,
                items = this.get('items') || [];

            if(items.get('isFulfilled') === false) {
                return;
            }

            let matchedItems = items.filter(function(i){ return self._getKey(i) === self.get('selectedKey') });
            if(matchedItems.length > 0) {
                if(matchedItems[0] === this.get('selectedItem')) return;
                this.set('selectedItem', matchedItems[0]);
                return;
            }
            this.set('selectedItem', null);
        //});
    }),

    _suggestedItemChanged: observer('suggestedItem', function(){
        let suggestedItem = this.get('suggestedItem');
        //next(this, function() {
            this.set('suggestedValue', this._getValue(suggestedItem));
        //});
    }),

    /*** Exposed Events **/
    onSelectedItemChanged: null,
    onSelectedItemsChanged: null,

    /*** UI MEthods ***/

    open: function() {
        this._attachClickOutsideHandler();
        this.set('isOpen', true);
        //this._updateListPosition();
        next(this, function() {
            this._updateListPosition(true);
        });
    },
    close: function() {
        if(!this.get('isDestroyed')) {
            this.set('isOpen', false);
        }
        this._removeClickOutsideHandler();
    },
    toggle: function() {
        let isOpen = this.get('isOpen');
        if(isOpen) {
            this.close();
        } else {
            this.open();
        }
    },

    /*** Events **/
    clickOutside() {
        if(this.get('style') === 'popout' && this.get('isMultiple')) {
          //should be handled by modal dialog
          return;
        }

        let selectedItem = this.get('selectedItem'),
            suggestedItem = this.get('suggestedItem') || selectedItem;

        if(!this.get('isDestroyed')) {
            this.set('selectedItem', suggestedItem);
            this.set('suggestedItem', null);
        }

        this.close();
    },

    clickInside() {
        if(this.get('isMultiple')) {
          this.open();
          return;
        }

        if(this.get('isDisabled')) return;

        this.toggle();
    },

    focusInside() {
        //this.open();
    },
    focusOutside(){
        if(this.get('style') === 'popout' && this.get('isMultiple')) {
          //should be handled by modal dialog
          return;
        }

        if(this.get('isDisabled')) return;

        this.clickOutside();
    },

    /*** Helpers ***/

    onTextChanged: function(value) {
        let all = this.get('items'),
            editable = this.get('editable'),
            self = this;

        if(editable && value && value.length > 0) {
            let filtered = all.filter(function(item) {
                let currentValue = self._getValue(item) || '';
                let isMatch = currentValue.toLowerCase().indexOf(value.toLowerCase()) === 0;
                return isMatch;
            });

            if(filtered && filtered.length > 0) {
                this.set('suggestedItem', filtered.objectAt(0));
            } else {
                this.set('suggestedItem', null);
            }
            this.updateSuggestedValue(value);
            this.set('filteredItems', filtered);
        }
        else
        {
            this.set('suggestedItem', null);
            this.updateSuggestedValue(value);
            this.set('filteredItems', all);
        }
    },

    _itemsDidChange: observer('items', function() {
        debounce(this, this.onTextChanged, 150);
        //this.onTextChanged();
    }),

    updateSuggestedValue: function(text) {
        let value = this._getValue(this.get('suggestedItem'));

        if(!text || !value) {
            this.set('suggestedValue', null);
            return;
        }

        value = text + value.substr(text.length);

        this.set('suggestedValue', value);
    },

    _getValue: function(obj) {
        if(!obj || typeof obj !== 'object') return obj;
        if(obj.get) {
            return obj.get(this.get('valueProperty'));
        }

        return obj[this.get('valueProperty')];
    },

    _getKey: function(obj) {
        if(!obj || typeof obj !== 'object') return obj;
        if(obj.get) {
            return obj.get(this.get('keyProperty'));
        }
        return obj[this.get('keyProperty')];
    },

    actions: {
        onTextChanged: function(value) {
            if(this.get('isDisabled') || this.get('isReadonly')) return;

            this.onTextChanged(value);
        },
        editableClick: function(event) {
            event.preventDefault();
        },
        onSelectedItemChanged(item) {
            if(this.get('isDisabled') || this.get('isReadonly')) return;

            this.set('selectedItem', item);
            let action = this.get('onSelectedItemChanged');
            if(action) {
                action(item);
            }

            if(this.get('isMultiple') && this.get('selectedItems')) {
              if(this.get('selectedItems').includes(item)) {
                this.get('selectedItems').removeObject(item);
              } else {
                this.get('selectedItems').pushObject(item);
              }
            }

            action = this.get('onSelectedItemsChanged');
            if(action) {
              action(item);
            }
            if(!this.get('isMultiple')) this.close();
        },
        onClearValue() {
            if(this.get('isDisabled') || this.get('isReadonly')) return;

            this.set('selectedItem', null);

            if(!this.get('isMultiple')) this.close();
        },
        onToggle(key) {
            if(this.get('isDisabled') || this.get('isReadonly')) return;

            this.set('selectedKey', key);
        },
        onToggleState() {
            if(this.get('isDisabled')) return;

            this.toggle();
            this._clickIsInside = true;
        },
        onClose() {
          this.close();
        },
        onClickOverlay() {
            this.close();
        },
    }
});
