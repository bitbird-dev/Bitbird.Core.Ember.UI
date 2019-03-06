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
        let self = this,
            isVertical = this.get('orientation') === "vertical",
            isReverse = this.get('isReverse');

        if(isVertical) {
            this.$('>.split-view-pane').width(this.get('panelSize'));
        } else {
            this.$('>.split-view-pane').height(this.get('panelSize'));
        }
    }),

    _orientationDidChange: observer('orientation', 'isReverse', function() {
        let self = this,
            isVertical = this.get('orientation') === "vertical",
            isReverse = this.get('isReverse'),
            resizable = isReverse ? '.split-view-content' : '.split-view-pane';

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
                jqMinHeight = isVertical ? 0 : 2,
                jqMaxHeight = isVertical ? 0 : self.$().height() - 5,
                jqMinWidth = isVertical ? 2 : 0,
                jqMaxWidth = isVertical ? self.$().width() - 5 : 0;

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

    didInsertElement() {
        let self = this;

        this._resizable();

        this.__onResize = function () {
            if (!self.get('isResizable')) return;
            let isReverse = self.get('isReverse'),
                isVertical = self.get('orientation') === "vertical";

            if (isVertical) {
                self.$('>.split-view-pane').resizable("option", "maxWidth", self.$().width() - 6);
            } else {
                self.$('>.split-view-pane').resizable("option", "maxHeight", self.$().height() - 6);
            }
        };

        this.$(window).on('resize', self.__onResize);
    },

    willDestroyElement() {
        this._destroyResizable();
    }
});
