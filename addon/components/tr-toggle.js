import Ember from 'ember';
import Component from '@ember/component';
import layout from '../templates/components/tr-toggle';
import { computed } from '@ember/object'

export default Component.extend({
  layout,

  i18n: Ember.inject.service(),

  didReceiveAttrs() {
      this._super(...arguments);

      let i18n = this.get('i18n');
      if(this.get('options') === null) {
          let defaultOptions = Ember.A();
          defaultOptions.pushObject(Ember.Object.create({ value: true, content: i18n.t('toggle.value.true.content') }));
          defaultOptions.pushObject(Ember.Object.create({ value: false, content: i18n.t('toggle.value.false.content') }));
          this.set('options', defaultOptions);
      }
  },

  classNameBindings: ['sizeClass', 'styleClass', 'optionClassNames', 'isDisabled'],
  classNames: 'tr-toggle',
  options: null,
  selectedValue: null,
  style: 'switch', //toggle, switch
  isDisabled: false,

  selectedOption: computed('selectedValue', function() {
      let selectedValue = this.get('selectedValue');
      let result = (this.get('options') || Ember.A()).filter(function(option) {
          return option.value === selectedValue;
      }, this);

      if(result.length > 0) return result[0];
      return null;
  }),

  /**
   * In switch style, sets custom class names to the control depending on the selected value true/false/null.
   * Class names can be overridden in the options by providing the key 'classNames'
   */
  optionClassNames: computed('selectedValue', function() {
      if(this.get('style') !== 'switch') return null;

      let selectedValue = this.get('selectedValue');

      //return custom classNames property
      let result = (this.get('options') || Ember.A()).filter(function(option) {
          let optionClassNames = option.value === selectedValue ? option.classNames : null;
          return optionClassNames || null;
      }, this).objectAt(0);

      let value = result ? result.classNames : null;
      if(value) return value;

      //return true oder false
      if(selectedValue === true || selectedValue === false) {
          return selectedValue.toString();
      }
      return null;
  }),

  sizeClass: computed('options', function() {
      let len = (this.get('options') || Ember.A()).get('length') || 0;
      return `tr-toggle-size-${len}`;
  }),

  styleClass: computed('options', function() {
      let style = this.get('style') || 'toggle';
      return `tr-toggle-style-${style}`;
  }),

  onChange: null,

  actions: {
      select(option) {
          if(this.get('isDisabled')) return;

          let selectedValue = this.get('selectedValue'),
              nextValue = null;

          if(option === undefined || option.value === undefined) {
              option = this.get('selectedOption');
              let index = this.get('options').indexOf(option);
              nextValue = this.get('options').objectAt((index+1) % this.get('options').length).value;
          } else {
              nextValue = option.value;
          }

          let onChange = this.get('onChange');
          if(onChange) {
              if(option.value === selectedValue) {
                  onChange(nextValue);
                  return;
              }
              onChange(option.value);
          } else {
              this.set('selectedValue', nextValue);
          }
      }
  }
});
