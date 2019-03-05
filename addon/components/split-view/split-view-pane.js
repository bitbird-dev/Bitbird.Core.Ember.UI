import Component from '@ember/component';
import layout from '../../templates/components/split-view';
import {computed, observer} from '@ember/object';
import { A } from '@ember/array';

export default Component.extend({
    classNames: 'split-view-item split-view-pane',
    attributeBindings: ['style'],
    orientation: 'vertical',



    _onResize: ()=>{},

    willDestroyElement() {
        this.$(window).off('resize', this._onResize);
    },

    didInsertElement() {
        let self = this;

        //this._updateSize();

        this._onResize = function() {

        };

        this.$(window).on('resize', this._onResize);
    }
});
