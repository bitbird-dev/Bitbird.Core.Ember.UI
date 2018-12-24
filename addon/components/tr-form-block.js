import Component from '@ember/component';
import layout from '../templates/components/tr-form-block';

const ESC_KEY = 27;

export default Component.extend({
    layout,

    didInsertElement() {
        this._super(...arguments);
        this._initEscListener();
    },

    willDestroyElement(){
        this._super(...arguments);
        Ember.$('body').off('keyup.modal-dialog');
    },

    _initEscListener() {
        const closeOnEscapeKey = (ev) => {
            if (ev.keyCode === ESC_KEY) { this.minimize(); }
        };

        Ember.$('body').on('keyup.modal-dialog', closeOnEscapeKey);
    },

    classNames: 'form-block',
    classNameBindings: ['header:form-block-with-header', 'sizeClassName', 'overflowClassName', 'isCollapsed:form-block-collapsed'],

    header: null,
    size: null,
    useCustomMenu: false,

    fullSizeContent: false,
    canMaximize: false,
    isMaximized: false,

    canCollapse: true,
    isCollapsed: false,

    overflow: null, //left, right, both

    overflowClassName: Ember.computed('overflow', {
        get() {
            let overflow = this.get('overflow'),
                cssClass = '';
            if(overflow === 'both' || overflow === 'left') {
                cssClass += ' form-block-overflow-left';
            }
            if(overflow === 'both' || overflow === 'right') {
                cssClass += ' form-block-overflow-right';
            }
            return cssClass.trimLeft();
        }
    }),

    sizeClassName: Ember.computed('size', {
        get() {
            let size = this.get('size');
            if(!size) return null;
            return 'form-' + size;
        }
    }),

    maximize() {
        if(!this.get('canMaximize')) return;
        this.set('isMaximized', true);
    },

    minimize() {
        if(!this.get('canMaximize')) return;
        this.set('isMaximized', false);
    },
    expand() {
        if(!this.get('canCollapse')) return;
        this.set('isCollapsed', false);
    },
    collapse() {
        if(!this.get('canCollapse')) return;
        this.set('isCollapsed', true);
    },
    toggleIsCollapsed() {
        if(!this.get('canCollapse')) return;
        this.set('isCollapsed', !this.get('isCollapsed'));
    },

    actions: {
        maximize() {
            this.maximize();
        },
        minimize() {
            this.minimize();
        },
        expand() {
            this.expand();
        },
        collapse() {
            this.collapse();
        },
        toggleIsCollapsed() {
            this.toggleIsCollapsed();
        }
    }
});
