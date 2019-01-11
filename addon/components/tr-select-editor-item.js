
import { observer, computed } from '@ember/object'
import Component from '@ember/component';
import layout from '../templates/components/tr-select-editor-item';
import { isNone } from '@ember/utils';
const {RSVP: {Promise}} = Ember;
const { next } = Ember.run;

export default Component.extend({
    layout,

    /**
     * The source object to take data from
     */
    content: null,

    /**
     * Name of the source object property to display
     */
    valueProperty: null,

    /**
     * Defines if the is loading
     */
    isLoading: false,

    /**
     * Holds the raw value from the source object property
     */
    rawValue: null,

    /**
     * Computes the final value to display. Supports promises.
     */
    value: computed('rawValue', 'rawValue.content','rawValue.isPending', function() {
        let rawValue = this.get('rawValue'),
            rawValueContent = isNone(rawValue) || isNone(rawValue.get) ? null : rawValue.get('content');

        return isNone(rawValueContent) ? rawValue : rawValueContent;
    }),

    /**
     * Reads the valueProperty from the content object and sets the rawValue
     */
    _updateValue: observer('content', 'content.isLoading', 'content.isLoaded', 'content.isPending', 'valueProperty', function() {
        let valueProperty = this.get('valueProperty'),
            content = this.get('content');

        if(!content) {
            this.set('rawValue', undefined);
            return;
        }

        if(!content.get) {
            this.set('rawValue', content);
            return;
        }

        let value = content.get(valueProperty),
            self = this;

        if(value && value.then) {
            self.set('isLoading', true);
            value.then(() => {
                self.set('isLoading', false);
            }, () => {
                self.set('isLoading', false);
            });
        }

        this.set('rawValue', value);
    }).on('init'),
});
