import { computed, observer } from '@ember/object';
import Editor from './tr-editor';
import OutsideClick from '../mixins/tr-outside-click';
import { A } from '@ember/array';
import { next, debounce } from '@ember/runloop';
import { isNone } from '@ember/utils';
import layout from '../templates/components/tr-select';
import Ember from 'ember';

export default Editor.extend(OutsideClick, {
    layout,
    i18nProperties: ['placeholder'],

    init: function() {
        this._super();

        this.on('willDestroyElement', this, function() {
            this._popupReset();
        });
        this._refreshFilteredItems();
        this.__updateDisplayValue();
        this.__refreshDisplayValue();
    },

    classNames: 'tr-select-editor',
    classNameBindings: ['isOpen', '_popupPosition', 'styleClassName'],

    /*** DATA PROPERTIES ***/

    items: null,

    isMultiple: false,

    _selectedItem: null,

    selectedItem: computed({
        get() {
            return this._selectedItem;
        },
        set(key, value) {
            //this._setSuggestedItems(null);
            this._resetSuggestedItems(false);

            let item = value;

            if(this.get('isMultiple') && this.get('selectedItems')) {
                if(this.get('selectedItems').includes(item)) {
                    this.get('selectedItems').removeObject(item);
                } else {
                    this.get('selectedItems').pushObject(item);
                }
                this.fireEvent(this.get('onSelectedItemsChanged'), this.get('selectedItems'));
            }

            if(value === this._selectedItem) {
                return value;
            }

            this._selectedItem = item;
            this.notifyPropertyChange('selectedItem');

            this._selectItem(this._selectedItem, false);

            if(item && item.then && item.isPending) {
                let self = this;
                this.set('_editable', false);
                item.then((resolvedData) => {
                    self.set('_editable', true);
                    //self.set('selectedItem', value);
                    //self.notifyPropertyChange("selectedItem");
                    self.setProperties({
                        selectedKey: self._getKey(resolvedData),
                        selectedValue: self._getValue(resolvedData)
                    });

                    if(resolvedData && resolvedData.addObserver)
                    {
                        resolvedData.removeObserver(self.get('valueProperty'), self, '_updateDisplayAndSelectedValue');
                        resolvedData.addObserver(self.get('valueProperty'), self, '_updateDisplayAndSelectedValue');
                    }
                });
                //return;
            }

            this.setProperties({
                selectedKey: this._getKey(item),
                selectedValue: this._getValue(item)
            });

            if(item && item.addObserver)
            {
                item.removeObserver(this.get('valueProperty'), this, '_updateDisplayAndSelectedValue');
                item.addObserver(this.get('valueProperty'), this, '_updateDisplayAndSelectedValue');
            }

            this.notifyPropertyChange('selectedItem');

            this.fireEvent(this.get('onSelectedItemChanged'), item);

            return this._selectedItem;
        }
    }).volatile(),
    selectedKey: computed('selectedItem', {
        get() {
            return this._getKey(this.get('selectedItem'));
        },
        set(key, value) {
            let self = this,
                all = this.get('items') || [];

            let match = all.find(function(currentItem) {
                return self._getKey(currentItem) === value;
            });

            let selectedItem = this.set('selectedItem', match);
            return this._getKey(selectedItem);
        }
    }),
    selectedValue: null,

    selectedItems: null,

    suggestedItem: null,
    suggestedValue: null,

    keyProperty: 'key',
    valueProperty: 'value',

    /**
     * Adds observer to each items displayValue property to update it if necessary
     */
    __refreshDisplayValue: observer('valueProperty', 'items', function() {
        let valueProperty = this.get('valueProperty'),
            items = this.get('items') || [];

        items.forEach(function(item) {
            item.removeObserver(valueProperty, this, '_updateDisplayAndSelectedValue');
            item.addObserver(valueProperty, this, '_updateDisplayAndSelectedValue');
        }, this);

        this._updateDisplayAndSelectedValue();
    }).on('didInsertElement'),

    filteredItems: null,
    _updateDisplayAndSelectedValue() {
        debounce(this, this._updateDisplayAndSelectedValueCore, 20);
    },
    _updateDisplayAndSelectedValueCore() {
        let selectedItem = this.get('selectedItem');
        if (selectedItem &&  !this.get('isDestroyed'))
        {
            this.set('selectedValue', this._getValue(selectedItem));
        }
        this.__updateDisplayValue();
    },
    __updateDisplayValue: observer(
        'selectedItems', 'selectedItems.{length,@each.isLoaded,@each.isLoading,isPending}',
        'selectedItem', 'selectedItem.{isFulfilled,isLoaded}',
        'isMultiple', 'i18n.locale', function() {
            if(this.get('isMultiple')) {
                let items = this.get('selectedItems'),
                    values = A();

                if(!items) {
                    this.set('displayValue', null);
                    return;
                }

                items.forEach(function(item) {
                    values.pushObject(this._getValue(item));
                }, this);
                this.set('displayValue', values.toString());
                return;
            }

            let selectedItem = this.get('selectedItem');
            if(!selectedItem) {
                this.set('displayValue', selectedItem);
                return;
            }

            let isBusy = selectedItem.then && !selectedItem.isFulfilled;
            if(isBusy) {
                this.busy('displayValue');
            } else {
                this.idle('displayValue');
            }
            if(isBusy) {
                this.set('displayValue', null);
                return;
            }

            this.set('displayValue', this._getValue(selectedItem));
        }),

    displayValue: null,

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
     * Defines the size of the popout: fullHeight, fullSize
     */
    popoutSize: 'fullHeight',

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
     * Allow to select unknown values
     */
    allowUnknownValue: false,

    /**
     * Item property to use as id value
     */
    idPropertyName: 'id',

    /**
     * Text to show if filter has no result
     */
    noFilterResultText: 'Filter does not match any item.',

    popoutHeader: null,

    popoutPrimaryText: 'Ok',

    isCloseOnPrimary: true,

    _editable: true,

    /*** Exposed Events **/
    onSelectedItemChanged: null,
    onSelectedItemsChanged: null,
    onOpen: null,
    onClose: null,
    onPrimaryAction: null,

    /*** UI Methods ***/

    open: function() {
        this._attachClickOutsideHandler();
        this.set('isOpen', true);
        this.set('filteredItems', this.get('items') || []);

        next(this, function() {
            this._popupUpdatePosition(true);

            this.fireEvent(this.get('onOpen'));
        });
    },
    close: function() {
        if(!this.get('isDestroyed')) {
            this.set('isOpen', false);
        }
        this._removeClickOutsideHandler();

        this.fireEvent(this.get('onClose'));
    },
    toggle: function() {
        let isOpen = this.get('isOpen');
        if(isOpen) {
            this.close();
        } else {
            this.open();
        }
    },

    /*** Handle Style Specifics ***/
    _refreshFilteredItems: observer('style', 'items', function() {
        let style = this.get('style') || '';
        if(style.toLowerCase() === 'select') {
            return;
        }
        this.set('filteredItems', this.get('items') || []);
    }),

    /*** Events **/
    clickOutside() {
        if(this.get('style') === 'popout') {
            //should be handled by modal dialog
            return;
        }

        //this._handleInputEvent(event, true, undefined);
        this._selectSuggested(true);
    },

    _selectSuggested(closeList) {
        if(this.isDestroyed) return;

        if(this.get('style') === 'popout' && this.get('isMultiple')) {
            //should be handled by modal dialog
            return;
        }

        let allowNull = this.get('allowNull'),
            $input = this.$('.tr-select-text-editor input'),
            currentInput = $input ? $input.val() : null,
            suggestedItem = this.get('suggestedItem');

        if(!currentInput && allowNull) {
            suggestedItem = null;
        }

        this._selectItem(suggestedItem);

        //next(this, function() {
            this._resetSuggestedItems(!closeList);
            this.$('.tr-select-text-editor input').val(this._getDisplayValue());
        //});
        if(closeList)
        {
            this.close();
        }
        return false;
    },

    _reset() {
        this.$('.tr-select-text-editor input').val(this._getDisplayValue());

        //this._setSuggestedItems(null);
        this._resetSuggestedItems();
        this.close();
    },

    _handleInputEvent(event, useSuggestedItem=true, suggestedFallbackItem=undefined) {
        if(this.get('style') === 'popout' && this.get('isMultiple')) {
            //should be handled by modal dialog
            return;
        }

        if(useSuggestedItem) {
            //if(this.get('suggestedItem')) {
            if(!this._selectItem(this.get('suggestedItem') || suggestedFallbackItem)) {
                //console.log("NIX STIMMT");
            }
            next(this, function() {
                //this._setSuggestedItems(null);
                this._resetSuggestedItems();
                this.$('.tr-select-text-editor input').val(this._getDisplayValue());
            });
            this.close();
            return false;
            //}
        }

        this.$('.tr-select-text-editor input').val(this._getDisplayValue());

        //this._setSuggestedItems(null);
        this._resetSuggestedItems();
        this.close();
    },

    _getDisplayValue() {
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
        if(this.get('style') === 'popout') {
            //should be handled by modal dialog
            return;
        }

        if(this.get('isDisabled')) return;

        //Select suggested item
        this._handleInputEvent(null, true);
    },

    /** calls the given eventHandler-function */
    fireEvent(eventHandler, args) {
        if(!eventHandler) return;

        if(typeof(eventHandler) === 'function'){
            next(this, () => eventHandler(args));
        }
    },

    /*** Popup ***/

    _popupUpdatePosition() {
        if(!this.get('_popupDestinationElement')) return;

        let editable = this.get('editable'),
            $target = $('#' + this.get('_popupDestinationElement')),
            $source = $('#' + this.get('elementId')),
            $innerSource = $('#' + this.get('elementId') + ' > .tr-editor > .tr-editor > .tr-editor-content-wrapper'),
            $innerLabelSource = $('#' + this.get('elementId') + ' > .tr-editor > .tr-editor > .tr-label');

        //console.log($source.scrollParent().scrollTop());
        let topOffset = $source[0].getBoundingClientRect().top;
        let leftOffset = $source[0].getBoundingClientRect().left;

        if(!$target.length) return;

        $target.removeClass("tr-select-editor-below");
        $target.removeClass("tr-select-editor-above");

        $target.css('min-width', $source.outerWidth());
        $target.css('opacity', '1');

        let topWhenBelow = topOffset + $innerSource.outerHeight() + $innerLabelSource.outerHeight();
        let bottomWhenBelow = topWhenBelow + $target.outerHeight();
        let viewPortBottom = this.$(window).height();
        let canOpenBelow = bottomWhenBelow <= viewPortBottom;
        if(canOpenBelow) {
            this.set('_popupPosition', 'is-open-below');
            $target.addClass("tr-select-editor-below");
            $target.css('top', topOffset + $innerSource.outerHeight() + $innerLabelSource.outerHeight());
            $target.css('left', $source.offset().left);
            $target.css('right', '');
            $target.css('bottom', '');
            return;
        }

        let topWhenAbove = topOffset  - $target.outerHeight() + $innerLabelSource.outerHeight();
        let canOpenAbove = topWhenAbove > 0;
        if(canOpenAbove) {
            this.set('_popupPosition', 'is-open-above');
            $target.addClass("tr-select-editor-above");
            $target.css('top', topOffset - $target.outerHeight() + $innerLabelSource.outerHeight());
            $target.css('left', $source.offset().left);
            $target.css('right', '');
            $target.css('bottom', '');
            return;
        }

        this.set('_popupPosition', null);
        $target.css('top', 0);
        $target.css('left', 0);
        $target.css('right', 0);
        $target.css('bottom', 0);
    },

    _popupReset() {
        let _popupDestinationElement = this.get('_popupDestinationElement');
        if(!_popupDestinationElement) return;

        this.set('_popupDestinationElement', null);
        $('#' + _popupDestinationElement).remove();
    },

    _popupResetPositionClassName: observer('isOpen', function() {
        let self = this;

        if(this.get('isOpen')) {
            if(this.get('_popupDestinationElement')) return;
            //Create wormhole combo
            let _popupDestinationElement = "select-editor-" + this.get('elementId');
            Ember.$('body.ember-application').append(`<div id="${_popupDestinationElement}" class="tr-select-editor-wormhole-list" style="opacity:0.0001;"></div>`);
            this.set('_popupDestinationElement', _popupDestinationElement);

            //Refresh position on all parent scrolls
            let $scrollParent = this.$().scrollParent();
            while($scrollParent.length > 0) {
                $scrollParent.scroll(function() { self._popupUpdatePosition(); });
                if($scrollParent[0] === document) break;
                $scrollParent = $scrollParent.scrollParent();
            }

            //Refresh position on resizing
            this.$(window).resize(function() { self._popupUpdatePosition(); });
        } else {
            this._popupReset();
            this.set('_popupPosition', null);
        }
    }),

    _popupDestinationElement: null,

    /**
     *  The position where the list is open
     */
    _popupPosition: null,

    /*** Helpers ***/
    _onTextChanged: function(text) {
        let all = this.get('items') || [],
            editable = this.get('editable'),
            self = this;

        if(editable) {
            if(text && text.length > 0)
            {
                let filtered = all.filter(function(item) {
                    let currentValue = self._getValue(item) || '';
                    return currentValue.toLowerCase().indexOf(text.toLowerCase()) === 0;
                });

                this._setSuggestedItems(filtered, text);
            } else {
                this._setSuggestedItems(all);
            }
        }
        else
        {
            //this._setSuggestedItems(null);
            this._resetSuggestedItems();
        }
    },

    _itemsDidChange: observer('items', function() {
        debounce(this, this._onTextChanged, 150);
    }),

    _selectionIsValid(item) {
        if(item === null && this.get('allowNull')) {
            return true;
        }

        let items = this.get('items') || [],
            selectedItem = item || this.get('selectedItem'),
            self = this;

        let itemValues = items.map(function(item) {
            return self._getValue(item);
        });

        return !(itemValues.indexOf(this._getValue(selectedItem)) === -1 && this.get('allowUnknownValue'));
    },

    _resetSuggestedItems: function(resetFilter = true) {
        if(resetFilter) {
            this.setProperties({
                filteredItems: null,
                suggestedItem: undefined,
                suggestedValue: undefined
            });
        } else {
            this.setProperties({
                suggestedItem: undefined,
                suggestedValue: undefined
            });
        }
    },

    _setSuggestedItems: function(suggestedItems, currentUiText) {
        let suggestedValue = undefined,
            suggestedItem = undefined;

        if(currentUiText === undefined) {
            this.setProperties({
                filteredItems: suggestedItems,
                suggestedItem: suggestedItem,
                suggestedValue: suggestedValue
            });
            return;
        }

        if(currentUiText === null && this.get('allowNull')) {
            suggestedItem = null;
            suggestedValue = '';
        } else {
            if(suggestedItems && suggestedItems.length > 0) {
                suggestedItem = suggestedItems.objectAt(0);
                suggestedValue = this._getValue(suggestedItem);
            }

            //take the chars from the textbox to match casing!
            if(suggestedValue && currentUiText) {
                suggestedValue = currentUiText + suggestedValue.substr(currentUiText.length)
            } else {
                //if no ui text is present, no suggested value
                suggestedValue = null;
            }
        }

        this.setProperties({
            filteredItems: suggestedItems,
            suggestedItem: suggestedItem,
            suggestedValue: suggestedValue
        });
    },

    _selectItem(item, set) {
        if(this.get('isDisabled') || this.get('isReadonly')) return;

        if(item === undefined) {
            return true;
        }

        if(!this._selectionIsValid(item)){
            return false;
        }

        if(set !== false) this.set('selectedItem', item);

        return true;
    },

    _resetSelection() {
        if(this.get('isDisabled') || this.get('isReadonly')) return;

        this.setProperties({
            selectedItem: null,
            selectedKey: null,
            selectedValue: null
        });

        if(this.get('selectedItems'))
        {
            this.get('selectedItems').clear();
        }
        //this._setSuggestedItems(null);
        this._resetSuggestedItems();
    },

    _getValue: function(obj) {
        let returnValue = null;

        if(!obj || typeof obj !== 'object') {
            returnValue = obj;
        }
        else if(obj.get) {
            returnValue = obj.get(this.get('valueProperty'));
        }
        else {
            returnValue = obj[this.get('valueProperty')];
        }

        if(!isNone(returnValue) && returnValue.constructor.name === "SafeString") {
            return returnValue.string;
        }

        return returnValue;
    },

    _getKey: function(obj) {
        let returnValue = null;

        if(!obj || typeof obj !== 'object') {
            returnValue = obj;
        }
        else if(obj.get) {
            returnValue = obj.get(this.get('keyProperty'));
        }
        else {
            returnValue = obj[this.get('keyProperty')];
        }

        if(!isNone(returnValue) && returnValue.constructor.name === "SafeString") {
            return returnValue.string;
        }

        return returnValue;
    },

    keyDown:function(event) {
        //ENTER
        if(event.keyCode === 13) {
            this._selectSuggested(true);
            return false;
        }
        //TAB
        else if (event.keyCode === 9) {
            this._selectSuggested(true);
            return true;
        }
        //ESC
        else if (event.keyCode === 27) {
            this._reset();
            return true;
        }
    },

    keyUp: function(event) {
        if(this.get('isDisabled') || this.get('isReadonly')) return;
        this._onTextChanged(this.$(event.target).val());
    },

    actions: {
        onTextChanged: function(value) {

        },
        editableClick: function(event) {
            event.preventDefault();
        },
        onSelectedItemChanged(item) {
            if(this._selectItem(item))
            {
                if(!this.get('isMultiple')) {
                    this.close();
                }
            }
        },
        onClearValue() {
            this._resetSelection();

            if(!this.get('isMultiple')) this.close();
        },
        /*onToggle(key) {
            if(this.get('isDisabled') || this.get('isReadonly')) return;

            this.set('selectedKey', key);
        },*/
        onToggleState() {
            if(this.get('isDisabled')) return;

            this.toggle();
            this._clickIsInside = true;
        },
        /** for popout-editor primary action button */
        onPrimary(){
            if(this.get('isDisabled')) return;

            if(this.get('isCloseOnPrimary')) {
                this.close();
            }
            this._clickIsInside = true;

            this.fireEvent(this.get('onPrimaryAction'))
        },
        onClose() {
            this.close();
        },
        onClickOverlay() {
            this.close();
        },
    }
});
