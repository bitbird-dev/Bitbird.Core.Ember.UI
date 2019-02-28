import Component from '@ember/component';
import layout from '../templates/components/split-view';
import {computed, observer} from '@ember/object';
import { A } from '@ember/array';

export default Component.extend({
    layout,

    classNameBindings: ['computedClassNames'],
    classNames: 'split-view',

    orientation: 'vertical', //horizontal, vertical, horizontal-inverse, vertical-inverse
    isResizable: false,

    panelSize: 'auto',

    computedClassNames: computed('orientation', function() {
      let resizableClass = this.get('isResizable') ? 'split-view-resizable' : "";

      return `split-view-${this.get('orientation')} ${resizableClass}`;
    }),

    _resizable: observer('isResizable', function() {
      if(!this.get('isResizable')) return;

      let self = this;

      this.$('>.split-view-pane').resizable({
        create: function() {
          self.$().find('.ui-resizable-handle').css('z-index', 49);
        },
        handles: self.get('orientation').indexOf("vertical") === 0 ? "e" : "s",
        minHeight: 2,
        maxHeight: self.$().height()-6
      });
    }),

    __onResize: null,

    _destroyResizable() {
      if(!this.get('isResizable')) return;
      this.$(window).off('resize', this.__onResize);
      this.$('>.split-view-pane').resizable('destroy');
    },

    didInsertElement() {
      let self = this;
      this._resizable();
      this.__onResize = function() {
        if(!self.get('isResizable')) return;
        self.$('>.split-view-pane').resizable( "option", "maxHeight", self.$().height()-6 );
      };
      this.$(window).on('resize', this.__onResize);
    },

    willDestroyElement() {
      this._destroyResizable();
    }
});
