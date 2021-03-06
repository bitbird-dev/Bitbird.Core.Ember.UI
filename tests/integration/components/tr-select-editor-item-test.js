import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-select-editor-item', 'Integration | Component | tr select editor item', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{tr-select-editor-item}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tr-select-editor-item}}
      template block text
    {{/tr-select-editor-item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
