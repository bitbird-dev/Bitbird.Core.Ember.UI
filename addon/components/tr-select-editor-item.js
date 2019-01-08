
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

        //Check if value comes from ajax call (i18n)
        let value = content.get(valueProperty);
        if(value.then) {
            let self = this;
            self.set('isLoading', true);
            value.then(function(v) {
                for(let prop in v) {
                    if(!v.hasOwnProperty(prop)) continue;
                    self.set('value', v[prop].toString());
                    break;
                }
                self.set('isLoading', false);
            }, function() {
                self.set('value', null);
                self.set('isLoading', false);
            });
            return;
        }

        this.set('value', value.toString());
    }).on('init'),

    isLoading: false,
    value: null
});
