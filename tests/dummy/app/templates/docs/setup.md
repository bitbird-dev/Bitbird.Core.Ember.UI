# Setup

Before this package can be used, ensure that the following items are present:

## Environment Setup
Add I18n to environment.cs:

~~~js
module.exports = function(environment) {
  let ENV = {
    //...
    i18n: {
        defaultLocale: "de",
        autoFetchTranslationFiles: false,
        autoFetchMissingTranslations: false,
        loadedRemoteLocales: []
    },
    //...
  }
  return ENV;
}
~~~

## Settings Model

~~~js
import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
    client: DS.attr('string'),

    key: DS.attr('string'),

    value: DS.attr('string'),

    object: computed('value', {
        get() {
            return JSON.parse(this.get('value') || '{}');
        },
        set(key, value) {
            if(!value) {
                this.set('value', "{}");
                return;
            }
            this.set('value', JSON.stringify(value));
            return value;
        }
    }),
    updateValue: function() {
        let o = this.get('object');
        if(!o) this.set('value', null);
        else this.set('value', JSON.stringify(o));
        return o;
    }
});
~~~



