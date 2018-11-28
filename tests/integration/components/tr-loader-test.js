import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-loader', 'Integration | Component | tr loader', {
  integration: true
});

test('it renders', function(assert) {
    //todo:implement test
    this.render(hbs`{{tr-loader-bar}}`);
    assert.equal(true, true);

  /*this.render(hbs`{{tr-loader}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tr-loader}}
      template block text
    {{/tr-loader}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
