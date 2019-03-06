import Component from '@ember/component';
import layout from '../templates/components/split-view';
import {computed, observer} from '@ember/object';
import {A} from '@ember/array';
import {next} from '@ember/runloop';

export default Component.extend({
    layout,

    classNameBindings: ['computedClassNames', 'isReverse'],
    classNames: 'split-view',

    orientation: 'vertical', //horizontal, vertical
    isResizable: false,
    isReverse: false,

    panelSize: 'auto',

    _panelSizeDidChange: observer('panelSize', function() {
        let isVertical = this.get('orientation') === "vertical",
        panelSize = this.get('panelSize');

        if(isVertical) {
            this.$('>.split-view-pane').width(panelSize);
        } else {
            this.$('>.split-view-pane').height(panelSize);
        }
        next(this, this._fixPanelSize);
    }),

    _orientationDidChange: observer('orientation', 'isReverse', function() {
        this.$('>.split-view-pane').height('');
        this.$('>.split-view-pane').width('');

       this._destroyResizable();
    }),

    computedClassNames: computed('orientation', 'isResizable', function () {
        let resizableClass = this.get('isResizable') ? 'split-view-resizable' : '';

        return `split-view-${this.get('orientation')} ${resizableClass}`;
    }),

    _resizable: observer('isResizable', 'isReverse', 'orientation', function (sender, attr) {
        let self = this,
            isVertical = this.get('orientation') === "vertical",
            isReverse = this.get('isReverse');

        if (!this.get('isResizable')) {
            this._destroyResizable();
            return;
        }

        next(this, function(){

            let jqHandles = isVertical ? (isReverse ? "w" : "e") : (isReverse ? "n" : "s"),
                jqMinHeight = isVertical ? 0 : 7,
                jqMaxHeight = isVertical ? 0 : self.$().height(),
                jqMinWidth = isVertical ? 7 : 0,
                jqMaxWidth = isVertical ? self.$().width() : 0;

            if (this.$('>.split-view-pane').is('.ui-resizable')) {
                this.$('>.split-view-pane').resizable("option", "handles", jqHandles);
                this.$('>.split-view-pane').resizable("option", "minHeight", jqMinHeight);
                this.$('>.split-view-pane').resizable("option", "maxHeight", jqMaxHeight);
                this.$('>.split-view-pane').resizable("option", "minWidth", jqMinWidth);
                this.$('>.split-view-pane').resizable("option", "maxWidth", jqMaxWidth);
            }
            else {
                console.log('CREATE');
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
            console.log('DESTROY');
            this.$('>.split-view-pane').resizable('destroy');
        }
    },

    _fixPanelSize() {
        if (!this.$('>.split-view-pane').is('.ui-resizable')) {
            return;
        }

        if(this.get('orientation') === "vertical")
        {
            let paneWidth = this.$('>.split-view-pane').width(),
                availableWidth = this.$().width();

            if(paneWidth > availableWidth) {
                this.set('panelSize', availableWidth);
            }
            else if(paneWidth < 7)
            {
                this.set('panelSize', 7);
            }
        } else {
            let paneHeight = this.$('>.split-view-pane').height(),
                availableHeight = this.$().height();

            if(paneHeight > availableHeight) {
                this.set('panelSize', availableHeight);
            }
            else if(paneHeight < 7)
            {
                this.set('panelSize', 7);
            }
        }
    },

    didInsertElement() {
        let self = this;

        this._resizable();

        this.__onResize = function () {
            if (!self.get('isResizable')) return;
            let isVertical = self.get('orientation') === "vertical";

            if (isVertical) {
                self.$('>.split-view-pane').resizable("option", "maxWidth", self.$().width());
            } else {
                self.$('>.split-view-pane').resizable("option", "maxHeight", self.$().height());
            }
        };

        this.$(window).on('resize', self.__onResize);
    },

    willDestroyElement() {
        this._destroyResizable();
    }
});
