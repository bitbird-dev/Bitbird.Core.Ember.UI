import Component from '@ember/component';
import layout from '../templates/components/split-view';
import {computed, observer} from '@ember/object';
import { A } from '@ember/array';

export default Component.extend({
    layout,

    classNameBindings: ['computedClassNames', 'isReverse'],
    classNames: 'split-view',

    orientation: 'vertical', //horizontal, vertical, horizontal-inverse, vertical-inverse
    isResizable: false,
    isReverse: false,

    panelSize: 'auto',

    computedClassNames: computed('orientation', function() {
      let resizableClass = this.get('isResizable') ? 'split-view-resizable' : "";

      return `split-view-${this.get('orientation')} ${resizableClass}`;
    }),

    _resizable: observer('isResizable', function() {
      if(!this.get('isResizable')) return;

      let self = this,
        isVertical = this.get('orientation').indexOf("vertical") === 0,
        isReverse = self.get('isReverse'),
        resizable = isReverse ? '.split-view-content' : '.split-view-pane';

      this.$('>' + resizable).resizable({
        create: function() {
          self.$().find('.ui-resizable-handle').css('z-index', 49);
        },
        handles: isVertical ? "e" : "s",
        minHeight: isVertical ? null : 2,
        maxHeight: isVertical ? null : self.$().height()-6,
        minWidth: isVertical ? 2 : null,
        maxWidth: isVertical ? self.$().width()-6 : null
      });
    }),

    __onResize: null,

    _destroyResizable() {
      if(!this.get('isResizable')) return;
      this.$(window).off('resize', this.__onResize);
      this.$('>.split-view-pane').resizable('destroy');
    },

    didInsertElement() {
      let self = this,
        isVertical = this.get('orientation').indexOf("vertical") === 0;
      this._resizable();
      this.__onResize = function() {
        if(!self.get('isResizable')) return;
        let isReverse = self.get('isReverse'),
            resizable = isReverse ? '.split-view-content' : '.split-view-pane';

        if(isVertical) {
            self.$('>'+resizable).resizable( "option", "maxWidth", self.$().width()-6 );
        } else {
            self.$('>'+resizable).resizable( "option", "maxHeight", self.$().height()-6 );
        }
      };
      this.$(window).on('resize', this.__onResize);
    },

    willDestroyElement() {
      this._destroyResizable();
    }
});
