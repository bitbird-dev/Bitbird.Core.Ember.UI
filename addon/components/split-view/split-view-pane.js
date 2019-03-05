import Component from '@ember/component';
import layout from '../../templates/components/split-view';
import {computed, observer} from '@ember/object';
import { A } from '@ember/array';

export default Component.extend({
    classNames: 'split-view-item split-view-pane',
    attributeBindings: ['style'],
    orientation: 'vertical',
    panelSize: 'auto',

    _updateSize: observer('orientation', 'panelSize', function() {
        let orientation = this.get('orientation'),
          panelSize = this.get('panelSize'),
          panelSizeIsNumber = Number.isFinite(panelSize),
          finalPanelSize = panelSizeIsNumber ? `${panelSize}px` : panelSize,
          isVertical = orientation.indexOf('vertical') === 0;

        if(isVertical)
        {
            this.$().css('width', finalPanelSize);
            this.$().css('height', '');

            //todo: check if scroll handle is in viewport
        }
        else
        {
            this.$().css('height', finalPanelSize);
            this.$().css('width', '');

            //todo: check if scroll handle is in viewport
        }
    }),

    _onResize: ()=>{},

    willDestroyElement() {
        this.$(window).off('resize', this._onResize);
    },

    didInsertElement() {
        let self = this;

        this._updateSize();

        this._onResize = function() {
            let isVertical = self.get('orientation').indexOf('vertical') === 0;
            if(isVertical)
            {
                self.set('panelSize', self.$().css('width'));
            } else {
                self.set('panelSize', self.$().css('height'));
            }
        };

        this.$(window).on('resize', this._onResize);
    }
});
