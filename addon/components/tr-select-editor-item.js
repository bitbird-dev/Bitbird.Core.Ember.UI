
import { observer, computed } from '@ember/object'
import Component from '@ember/component';
import layout from '../templates/components/tr-select-editor-item';
const {RSVP: {Promise}} = Ember;
const { next } = Ember.run;

export default Component.extend({
    layout,

    content: null,
    valueProperty: null,

    _updateValue: observer('content[isLoaded,isLoading]', 'valueProperty', function() {
        let valueProperty = this.get('valueProperty'),
            content = this.get('content');

        if(!content) {
            this.set('value', null);
            return;
        }

        if(!content.get) {
            this.set('value', content);
            return;
        }

        let value = content.get(valueProperty),
            self = this;

        if(value.then) {
            self.set('isLoading', true);
            value.then(() => {
                self.set('isLoading', false);
            }, () => {
                self.set('isLoading', false);
            });
        }

        this.set('value', value);
    }).on('init'),

    isLoading: false,
    value: null
});
