import { observer, computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import Widget from './tr-widget';
import layout from '../../templates/components/widgets/tr-value-widget';

export default Widget.extend({
    layout,

    init: function() {
        this._super();
        this.displayValueInitializer();
    },

    classNames: 'tr-value-widget',

    icon: null,
    value: null,
    label: null,
    text: null,
    safeLabel: computed('label', {
        get() {
            return htmlSafe(this.get('label'));
        }
    }),

    displayValue: null,

    getRandomInteger: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    },

    displayValueInitializer: observer('value', function() {
        let value = this.get('value'),
            diff = this.getRandomInteger(10, 15),
            timeout = this.getRandomInteger(8, 12);

        let valueIsNumber = !isNaN(parseFloat(value)) && isFinite(value);

        if(!valueIsNumber) {
            this.set('displayValue', value);
            return;
        }

        let startValue = value-diff > 0 ? value-diff : value;

        this.count(startValue, value, timeout);
    }),

    /**
     *
     * @param from start value
     * @param to end value
     * @param timeout time between value changes
     * @param factor random factor to increase or decrease timeout for each run
     */
    count: function(from, to, timeout, factor) {
        let _this = this;

        if(!factor) {
            factor = Math.random() * (1.15 - 1.05) + 1.05;
        }

        //Ember.run.later( function() {
        window.setTimeout(function(){
            _this.set('displayValue', from);
            if(from++ < to)
            {
                _this.count(from, to, timeout*factor, factor);
            }
        }, timeout);
    }
});
