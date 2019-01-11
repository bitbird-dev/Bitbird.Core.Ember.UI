import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed, observer } from '@ember/object';
import { isPresent } from '@ember/utils';
import layout from '../templates/components/tr-editor';
import BusyKeys from 'bitbird-core-ember-helpers/mixins/busy-keys';

export default Component.extend(BusyKeys, {
    layout,

    didInsertElement() {
        this._triggerFocus();
        this._updateI18n();
    },

    concatenatedProperties: ['i18nProperties'],

    i18n: service(),

    attributeBindings: ['title'],

    classNames: 'tr-editor',
    classNameBindings: ['isDisabled:disabled:enabled', 'isReadonly:readonly'],

    value: null,

    label: null,
    info: null,
    prefix: null,
    postfix: null,

    i18nKey: null,
    i18nProperties: ['label', 'title', 'info', 'prefix', 'postfix'],

    isDisabled: false,
    isReadonly: false,
    isVisible: true,
    isBusy: false,
    isDisabledWhenBusy: true,
    autocomplete: null,

    /**
     * If isDisabledWhenBusy is true, this flag announces the its state
     */
    _isBusyDisabled: computed('isBusy','isDisabledWhenBusy', function() {
        if(!this.get('isDisabledWhenBusy')) {
            return undefined;
        }

        return this.get('isBusy');
    }),

    isDisabledOrReadonly: computed('isDisabled', 'isReadonly', function () {
        return this.get('isDisabled') || this.get('isReadonly');
    }),

    title: computed('value', {
        get() {
            let value = this.get('value'),
                length = 0;

            if (value) {
                if (value.string) {
                    length = value.string.length;
                } else if (value.length) {
                    length = value.length;
                }
            }

            return length > 15 ? value : null;
        }
    }),

    errors: null,

    focus: false,

    isValid: computed('error', {
        get() {
            return !this.get('error');
        }
    }),

    _triggerFocus: observer('focus', function () {
        if (!this.get('focus')) return;
        this.$('input').focus();
    }),

    _updateI18n: observer('i18nKey', 'i18n.locale', function () {
        let i18nKey = this.get('i18nKey'),
            i18n = this.get('i18n');

        if (!i18nKey || !i18n) return;

        let i18nProperties = this.get('i18nProperties') || [];

        i18nProperties.forEach(function(propertyName) {
            this._updateI18nForPropertyName(i18n, i18nKey, propertyName);
        }, this);
    }),

    /**
     * Translates properties with i18n
     * @param {service} i18n - The i18n service instance to use for translation
     * @param {string} i18nKey - The key to use for translation for this class
     * @param {string} propertyName - The name of the property to translate
     * @description Tries to find the appropriate translation for <{i18nKey}.{propertyName}>.
     * If not found, the first alternative <editor.default.{propertyName}> is searched.
     * If again not found, <editor.default.null> is searched. ATTENTION: This key MUST be available with value \null\!
     * @private
     */
    _updateI18nForPropertyName: function(i18n, i18nKey, propertyName) {
        let translation = null;
        if(isPresent(propertyName)) {
            translation = i18n.t(i18nKey + '.' + propertyName, { default: ['editor.default.' + propertyName, 'editor.default.null'] });
        }
        if(translation.toString() !== '\\null\\') this.set(propertyName, translation);
    }
});
