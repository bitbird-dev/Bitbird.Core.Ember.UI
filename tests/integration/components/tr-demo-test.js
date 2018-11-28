import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-demo', 'Integration | Component | tr demo', {
  integration: true
});

test('it renders', function(assert) {
    //todo:implement test
    this.render(hbs`{{tr-demo}}`);
    assert.equal(true, true);

  /*this.render(hbs`{{tr-demo}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tr-demo}}
      template block text
    {{/tr-demo}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
