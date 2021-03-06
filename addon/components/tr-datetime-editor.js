import Editor from './tr-editor';
import { computed, observer } from '@ember/object';
import layout from '../templates/components/tr-datetime-editor';

export default Editor.extend({
    layout,

    didInsertElement: function() {
        let self = this;

        this._super();

        let input = this.$('input')[0],
            mode = self.get('mode');

        this.kalEl = new KalEl(input, {
            className: 'cal-w280',
            value: this.get('value'),
            wrap: false,
            mode: this.get('displayMode'),
            seconds: self.get('seconds'),
            dates: mode === 'default' || mode === 'date',
            times: mode === 'default' || mode === 'time',
            onDateChanged: function(kalEl, date) {
                //kalEl.value = date;//kalEl.params.formatDateTime(date);
                self.set('value', date);
            }
        });
    },

    willDestroyElement: function() {
        if(this.kalEl) {
            this.kalEl.destroy();
            this.kalEl = null;
        }
    },

    classNames: 'tr-datetime-editor',
    classNameBindings: 'displayMode',

    value: null,

    displayMode: 'picker',
    mode: 'default',

    seconds: false,

    displayValue: computed('value', {
        set(key, value) {
            this._setValueFromString(value);
            return this.get('displayValue');
        },
        get() {
            let value = this.get('value');
            if(value) {
                let _moment = moment(value);
                if(this.get('mode') === 'date') {
                    return _moment.format('L');
                } else if(this.get('mode') === 'time') {
                    return _moment.format('LT');
                }

                return _moment.format('L') + ' ' + _moment.format('LT');
            }
            return '';
        }
    }),

    kalEl: null,

    _valueDidChange: observer('value', function() {
        let value = this.get('value');
        this.kalEl.select(value);
    }),

    _setValueFromString(value) {
        let parsedValue = moment(value, "DD.MM.YYYY HH:mm");
        if(parsedValue.isValid())
        {
            //console.log("set: " + parsedValue.toDate());
            this.set('value', parsedValue.toDate());
        }
    },

    change: function(e){
        this._setValueFromString(e.target.value);
    }
});
