import Component from '@ember/component';
import layout from '../templates/components/simple-combobox';

export default Component.extend({
    layout,
    classNames: 'simple-combobox',
    options: null,
    selectedOption: null,

    actions: {
    }
});
