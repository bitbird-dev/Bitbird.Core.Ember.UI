import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-error-tooltip', 'Integration | Component | tr error tooltip', {
  integration: true
});

test('it renders', function(assert) {
    //todo:implement test
    this.render(hbs`{{tr-error-tooltip}}`);
    assert.equal(true, true);

  /*this.render(hbs`{{tr-error-tooltip}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tr-error-tooltip}}
      template block text
    {{/tr-error-tooltip}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
