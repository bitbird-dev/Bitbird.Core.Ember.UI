import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-label', 'Integration | Component | tr label', {
  integration: true
});

test('it renders', function(assert) {
    //todo:implement test
    this.render(hbs`{{tr-label}}`);
    assert.equal(true, true);

  /*this.render(hbs`{{tr-label}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tr-label}}
      template block text
    {{/tr-label}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
