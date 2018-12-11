import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/tr-splitview';

export default Component.extend({
    layout,
    classNames: 'tr-splitview',

    classNameBindings: ['hasContent', 'isOpen', 'paneLocation', 'size', 'sidebarMode:sidebar-mode:content-mode'],

    isOpen: true,
    hasContent: true,
    showPath: false,
    sidebarMode: false,
    paneLocation: 'left',
    size: 'small',

    enableBackdrop: false,
    enableToggle: false,

    panel: null,
    content: null,

    actions: {
        toggle () {
            this.set('isOpen', !this.get('isOpen'));
        }
    }
});
