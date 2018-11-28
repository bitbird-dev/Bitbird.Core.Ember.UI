import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-numeric-editor', 'Integration | Component | tr numeric editor', {
  integration: true
});

test('it renders', function(assert) {
    //todo:implement test
    this.render(hbs`{{tr-value-bar}}`);
    assert.equal(true, true);

  /*this.render(hbs`{{tr-numeric-editor}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tr-numeric-editor}}
      template block text
    {{/tr-numeric-editor}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
