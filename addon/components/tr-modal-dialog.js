import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from 'bitbird-core-ember-ui/templates/components/tr-modal-dialog';

export default Component.extend({
    layout,
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
    isFullHeight: false,
    isFullSize: false,

    scrollingDisabled: false,

    wrapperClass: null,
    containerClassNames: computed('isMessage', 'isFullHeight', 'isFullSize', function() {
        return (this.get('isMessage') ? 'tr-message-box' : '') +
            (this.get('isFullHeight') ? 'is-full-height' : '') +
            (this.get('isFullSize') ? 'is-full-size' : '');
    }),

    isFooterVisible: computed('primaryAction', 'secondaryAction', {
        get() {
            return this.get('primaryAction') || this.get('secondaryAction');
        }
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
