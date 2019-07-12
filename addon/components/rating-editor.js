import Component from '@ember/component';
import layout from '../templates/components/rating-editor';
import { isPresent } from '@ember/utils';
import { computed, observer } from '@ember/object';
import { run, debounce } from '@ember/runloop';
import Editor from './tr-editor';

export default Editor.extend({
    layout,

    classNames: 'rating-editor',

    /**
     * Lower boundary, usually the 0-value
     */
    lower: 0,

    /**
     * Upper boundary
     */
    upper: 100,

    /**
     * Minimum value that the user can select
     */
    minValue: null,

    /**
     * Maximum value that the user can select
     */
    maxValue: null,

    /**
     * Stepping between values
     */
    stepping: 10,

    /**
     * Percentage to be used for rendering
     */
    _percentage: computed({
        get() {
            let lower = this.get('lower'),
                upper = this.get('upper'),
                value = this.get('value'),
                base = upper - lower,
                percentage = 0;

            if(base !== 0)
            {
                percentage = 100 / base * (value - lower);
            }

            if (percentage < 0) {
                percentage = 0;
            } else if (percentage > 100) {
                percentage = 100;
            }

            return percentage;
        },
        set(key, value) {
            let lower = this.get('lower'),
                upper = this.get('upper'),
                minValue = this.get('minValue'),
                maxValue = this.get('maxValue'),
                base = upper - lower,
                stepping = this.get('stepping'),
                newValue = value;

            if(base === 0)
            {
                newValue = null;
            } else {
                newValue = (newValue/100*base) + lower;
            }

            if(newValue) {
                if(stepping > 0) {
                    newValue = Math.ceil(newValue/stepping)*stepping;
                }
                else {
                    newValue = Math.ceil(newValue);
                }

                if(isPresent(maxValue) && newValue > maxValue) {
                    newValue = maxValue;
                }
                else if(isPresent(minValue) && newValue < minValue) {
                    newValue = minValue;
                }
            }

            if(newValue !== this.get('value')) {
                this.set('value', newValue);
            }

            return value;
        }
    }).volatile(),

    _valueChanged: observer('value', 'lower', 'upper', function() {
        this.notifyPropertyChange('_percentage');
    }),

    _isDisabledChanged: observer('isDisabled', function() {
        this._detachEventHandler();
        if(!this.get('isDisabled')) {
            this._attachEventHandler();
        }
    }),

    didInsertElement() {
        this._attachEventHandler();
    },

    willDestroyElement() {
        this._detachEventHandler();
    },

    _handler: function(ui) {
        run(function() {
            let self = ui.data;

            let elX = $(ui.currentTarget).offset().left,
                clickX = ui.pageX;

            let lower = self.get('lower'),
                upper = self.get('upper'),
                base = upper - lower;

            let x = clickX - elX;

            let percentage = 100 / $(ui.currentTarget).width() * x;

            self.set('_percentage', percentage);
        });
    },

    _attachEventHandler(){
        debounce(this, function() {
            if(this.get('isDisabledOrReadonly')) {
                return;
            }
            this.$('.rating-editor-content').on('click', this, this._handler);
        }, 50);
    },

    _detachEventHandler() {
        this.$('.rating-editor-content').off('click', this, this._handler);
    }
});
