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
            isReverse = this.get('isReverse'),
            resizable = isReverse ? '.split-view-content' : '.split-view-pane';

        if(isVertical) {
            this.$('>' + resizable).width(this.get('panelSize'));
        } else {
            this.$('>' + resizable).height(this.get('panelSize'));
        }
    }),

    _orientationDidChange: observer('orientation', 'isReverse', function() {
        /*let self = this,
            isVertical = this.get('orientation') === "vertical",
            isReverse = this.get('isReverse'),
            resizable = isReverse ? '.split-view-content' : '.split-view-pane';

        this.$('>.split-view-pane').height('');
        this.$('>.split-view-pane').width('');
        this.$('>.split-view-content').height('');
        this.$('>.split-view-content').width('');*/
    }),

    computedClassNames: computed('orientation', 'isResizable', function () {
        let resizableClass = this.get('isResizable') ? 'split-view-resizable' : '';

        return `split-view-${this.get('orientation')} ${resizableClass}`;
    }),

    _resizable: observer('isResizable', 'isReverse', 'orientation', function (sender, attr) {
        let self = this,
            isVertical = this.get('orientation') === "vertical",
            isReverse = this.get('isReverse'),
            resizable = isReverse ? '.split-view-content' : '.split-view-pane';

        if (!this.get('isResizable')) {
            this._destroyResizable();
            return;
        }

        let jqHandles = isVertical ? "e" : "s",
            jqMinHeight = isVertical ? null : 2,
            jqMaxHeight = isVertical ? null : self.$().height() - 6,
            jqMinWidth = isVertical ? 2 : null,
            jqMaxWidth = isVertical ? self.$().width() - 6 : null;

        if (this.$('>' + resizable).is('.ui-resizable')) {
            this.$('>' + resizable).resizable("option", "handles", jqHandles);
            this.$('>' + resizable).resizable("option", "minHeight", jqMinHeight);
            this.$('>' + resizable).resizable("option", "maxHeight", jqMaxHeight);
            this.$('>' + resizable).resizable("option", "minWidth", jqMinWidth);
            this.$('>' + resizable).resizable("option", "maxWidth", jqMaxWidth);
        }
        else {
            next(this, function(){
                self.$('>' + resizable).resizable({
                    create: function () {
                        self.$().find('.ui-resizable-handle').css('z-index', 49);
                    },
                    handles: jqHandles,
                    minHeight: jqMinHeight,
                    maxHeight: jqMaxHeight,
                    minWidth: jqMinWidth,
                    maxWidth: jqMaxWidth,
                    resize: function(event, ui) {
                        let w = self.$('.split-view-pane').width(),
                            h = self.$('.split-view-pane').height();

                        if(self.get('orientation') === "vertical") {
                            self.set('panelSize', w);
                        } else {
                            self.set('panelSize', h);
                        }
                    }
                });
            });
        }
    }),

    __onResize: null,

    _destroyResizable() {
        this.$(window).off('resize', this.__onResize);

        /*this.$('>.split-view-pane').height('');
        this.$('>.split-view-pane').width('');
        this.$('>.split-view-content').height('');
        this.$('>.split-view-content').width('');*/

        if (this.$('> .split-view-content').is('.ui-resizable')) {
            this.$('>.split-view-content').resizable('destroy');
        }
        if (this.$('> .split-view-pane').is('.ui-resizable')) {
            this.$('>.split-view-pane').resizable('destroy');
        }
    },

    didInsertElement() {
        let self = this;

        this._resizable();

        this.__onResize = function () {
            if (!self.get('isResizable')) return;
            let isReverse = self.get('isReverse'),
                resizable = isReverse ? '.split-view-content' : '.split-view-pane',
                isVertical = self.get('orientation') === "vertical";

            if (isVertical) {
                self.$('>' + resizable).resizable("option", "maxWidth", self.$().width() - 6);
            } else {
                self.$('>' + resizable).resizable("option", "maxHeight", self.$().height() - 6);
            }
        };

        this.$(window).on('resize', self.__onResize);
    },

    willDestroyElement() {
        this._destroyResizable();
    }
});
