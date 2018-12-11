import Component from '@ember/component';
import layout from '../templates/components/tr-form';

export default Component.extend({
    layout,
    classNames: 'form',
    classNameBindings: ['isFullScreen:form-fullscreen', 'section:form-section', 'escape:form-block', 'sizeClassName'],

    isFullScreen: false,
    section: false,
    escape: false,
    size: 1,

    sizeClassName: Ember.computed('size', 'escape', {
        get() {
            let size = this.get('size') || 1;
            if(this.get('escape')) size = 1;
            return 'form-' + size;
        }
    }),

    actions: {
        fullscreen() {
            this.set('isFullScreen', !this.get('isFullScreen'));
        }
    }
});
