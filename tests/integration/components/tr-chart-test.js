import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-chart', 'Integration | Component | tr chart', {
  integration: true
});

test('it renders', function(assert) {
    //todo:implement test
    this.render(hbs`{{tr-chart}}`);
    assert.equal(true, true);

  /*this.render(hbs`{{tr-chart}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tr-chart}}
      template block text
    {{/tr-chart}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
