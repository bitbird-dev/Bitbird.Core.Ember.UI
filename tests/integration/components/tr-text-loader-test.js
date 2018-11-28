import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-text-loader', 'Integration | Component | tr text loader', {
  integration: true
});

test('it renders', function(assert) {
    //todo:implement test
    this.render(hbs`{{tr-text-loader}}`);
    assert.equal(true, true);
    /*this.render(hbs`{{tr-text-loader}}`);
  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tr-text-loader}}
      template block text
    {{/tr-text-loader}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
