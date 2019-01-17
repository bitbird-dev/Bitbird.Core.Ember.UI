import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-table/tr-table-cell-presenter', 'Integration | Component | tr table/tr table cell presenter', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{tr-table/tr-table-cell-presenter}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tr-table/tr-table-cell-presenter}}
      template block text
    {{/tr-table/tr-table-cell-presenter}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
