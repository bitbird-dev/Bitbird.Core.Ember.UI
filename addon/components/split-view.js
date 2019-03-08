import Component from '@ember/component';
import layout from '../templates/components/split-view';
import {computed, observer} from '@ember/object';
import {A} from '@ember/array';
import {next,once} from '@ember/runloop';

const RESIZE_HANDLE_SIZE = 7;

export default Component.extend({
    layout,

    classNameBindings: ['computedClassNames', 'isReverse'],
    classNames: 'split-view',

    orientation: 'vertical', //horizontal, vertical
    isResizable: false,
    isReverse: false,
    isFullSize: false,

    panelSize: null,

    _panelSizeChange: observer('orientation', 'panelSize', function(sender, key) {
        if(this.get('panelSize') !== null  && (key === 'panelSize' || key === undefined)) {
            let paneSize, availableSize;
            if(this.get('orientation') === "vertical")
            {
                paneSize = this.$('>.split-view-pane').width();
                availableSize = this.$().width();
            } else {
                paneSize = this.$('>.split-view-pane').height();
                availableSize = this.$().height();
            }

            this.set('isFullSize', paneSize === availableSize);
        } else {

        }

        this._sizeDidChange();
    }).on('didInsertElement'),

    _sizeDidChange: observer('isReverse', 'isFullSize', function() {
        let isVertical = this.get('orientation') === "vertical",
            panelSize = this.get('panelSize'),
            isFullSize = this.get('isFullSize');

        if(isFullSize) {
            if(isVertical) {
                this.$('>.split-view-pane').height('');
                this.$('>.split-view-pane').width(this.$().width());
            } else {
                this.$('>.split-view-pane').width('');
                this.$('>.split-view-pane').height(this.$().height());
            }
        }
        else if(panelSize)
        {
            if(isVertical) {
                this.$('>.split-view-pane').height('');
                this.$('>.split-view-pane').width(panelSize);
            } else {
                this.$('>.split-view-pane').width('');
                this.$('>.split-view-pane').height(panelSize);
            }
        }
        once(this, this._fixPanelSize);
    }).on('didInsertElement'),

    computedClassNames: computed('orientation', 'isResizable', function () {
        let resizableClass = this.get('isResizable') ? 'split-view-resizable' : '';

        return `split-view-${this.get('orientation')} ${resizableClass}`;
    }),

    _resizable: observer('isResizable', 'isReverse', 'orientation', function (sender, attr) {
        let self = this,
            isVertical = this.get('orientation') === "vertical",
            isReverse = this.get('isReverse');

        if (!this.get('isResizable')) {
            if (this.$('> .split-view-pane').is('.ui-resizable')) {
                this.$('>.split-view-pane').resizable('destroy');
            }
            return;
        }

        next(this, function(){
            let jqHandles = isVertical ? (isReverse ? "w" : "e") : (isReverse ? "n" : "s"),
                jqMinHeight = isVertical ? 0 : RESIZE_HANDLE_SIZE,
                jqMaxHeight = isVertical ? 0 : self.$().height(),
                jqMinWidth = isVertical ? RESIZE_HANDLE_SIZE : 0,
                jqMaxWidth = isVertical ? self.$().width() : 0;

            if (this.$('>.split-view-pane').is('.ui-resizable')) {
                this.$('>.split-view-pane').resizable("option", "handles", jqHandles);
                this.$('>.split-view-pane').resizable("option", "minHeight", jqMinHeight);
                this.$('>.split-view-pane').resizable("option", "maxHeight", jqMaxHeight);
                this.$('>.split-view-pane').resizable("option", "minWidth", jqMinWidth);
                this.$('>.split-view-pane').resizable("option", "maxWidth", jqMaxWidth);
            }
            else {
                self.$('>.split-view-pane').resizable({
                    create: function () {
                        self.$().find('.ui-resizable-handle').css('z-index', 49);
                    },
                    handles: jqHandles,
                    minHeight: jqMinHeight,
                    maxHeight: jqMaxHeight,
                    minWidth: jqMinWidth,
                    maxWidth: jqMaxWidth,
                    resize: function(event, ui) {
                        ui.position.left = 0;
                        ui.position.top = 0;
                        if(self.get('orientation') === "vertical") {
                            self.set('panelSize', self.$('.split-view-pane').width());
                        } else {
                            self.set('panelSize', self.$('.split-view-pane').height());
                        }
                    }
                });
            }
        });
    }),

    __onResize: null,

    _destroyResizable() {
        this.$(window).off('resize', this.__onResize);

        if (this.$('> .split-view-pane').is('.ui-resizable')) {
            this.$('>.split-view-pane').resizable('destroy');
        }
    },

    _fixPanelSize() {
        let panelSize = this.get('panelSize');

        //if the panelSize is not relevant or not set from outside, we also do not touch it
        if([undefined, null, 'auto', ''].indexOf(panelSize) > -1) {
            return;
        }

        let minPanelSize = this.get('isResizable') ? RESIZE_HANDLE_SIZE : 0,
            isVertical = this.get('orientation') === "vertical",
            isFullSize = this.get('isFullSize');

        if(isFullSize) {
            if(isVertical) {
                this.$('>.split-view-pane').height('');
                this.$('>.split-view-pane').width(this.$().width());
            } else {
                this.$('>.split-view-pane').width('');
                this.$('>.split-view-pane').height(this.$().height());
            }
            return;
        }

        if(isVertical)
        {
            let paneWidth = this.$('>.split-view-pane').width(),
                availableWidth = this.$().width();

            if(availableWidth < minPanelSize) return;

            if(paneWidth > availableWidth) {
                this.set('panelSize', availableWidth);
            }
            else if(paneWidth < minPanelSize)
            {
                this.set('panelSize', minPanelSize);
            }


        } else {
            let paneHeight = this.$('>.split-view-pane').height(),
                availableHeight = this.$().height();

            if(availableHeight < minPanelSize) return;

            if(paneHeight > availableHeight) {
                this.set('panelSize', availableHeight);
            }
            else if(paneHeight < minPanelSize)
            {
                this.set('panelSize', minPanelSize);
            }
        }
    },

    didInsertElement() {
        let self = this;

        this._resizable();
        this._fixPanelSize();

        this.__onResize = function () {
            self._fixPanelSize();
            self._resizable();
        };

        this.$(window).on('resize', self.__onResize);
    },

    willDestroyElement() {
        this._destroyResizable();
    }
});
