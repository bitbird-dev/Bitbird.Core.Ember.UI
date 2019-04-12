import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bb-dialog', 'Integration | Component | bb dialog', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bb-dialog}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bb-dialog}}
      template block text
    {{/bb-dialog}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
