import DS from 'ember-data';
import Setting  from '../mixins/models/setting';
import { computed } from '@ember/object';



export default DS.Model.extend(Setting, {
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
    user: DS.belongsTo('user', { async: true }),
    updateValue: function() {
        let o = this.get('object');
        if(!o) this.set('value', null);
        else this.set('value', JSON.stringify(o));
        return o;
    }
});
