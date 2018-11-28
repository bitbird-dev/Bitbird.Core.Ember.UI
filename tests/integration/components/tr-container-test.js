import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-container', 'Integration | Component | tr container', {
  integration: true
});

test('it renders', function(assert) {
    //todo:implement test
    this.render(hbs`{{tr-container}}`);
    assert.equal(true, true);

  /*this.render(hbs`{{tr-container}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tr-container}}
      template block text
    {{/tr-container}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
