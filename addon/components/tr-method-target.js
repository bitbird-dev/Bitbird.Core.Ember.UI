import Component from '@ember/component';
import layout from '../templates/components/tr-method-target';

export default Component.extend({
    click() {
        if(this.onClick) this.onClick();
        return this.get('bubbles');
    },

    bubbles: true,

    /**
     * Handles click events
     */
    onClick: null
});
