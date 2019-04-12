import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from 'bitbird-core-ember-ui/templates/components/bb-dialog';

export default Component.extend({
    layout,
    classNames: 'bb-dialog',
    header: null,

    primaryAction: null,
    primaryText: null,
    primaryIsDisabled: false,

    secondaryAction: null,
    secondaryText: null,
    secondaryIsDisabled: false,

    submenuDisabled: true,

    onClose: null,
    onClickOverlay: null,

    isVisible: true,
    isMessage: false,

    scrollingDisabled: false,

    wrapperClass: null,
    containerClassNames: computed('isMessage', function() {
        return this.get('isMessage') ? 'tr-message-box' : null;
    }),

    actions: {
        onClose: function() {
            let onClose = this.get('onClose');
            if(onClose) onClose();
        },
        onClickOverlay: function() {
            let onClickOverlay = this.get('onClickOverlay');
            if(onClickOverlay) onClickOverlay();
        }
    }
});
