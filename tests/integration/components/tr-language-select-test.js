import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-language-select', 'Integration | Component | tr language select', {
  integration: true
});

test('it renders', function(assert) {
    //todo:implement test
    this.render(hbs`{{tr-language-select}}`);
    assert.equal(true, true);

  /*this.render(hbs`{{tr-language-select}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tr-language-select}}
      template block text
    {{/tr-language-select}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
