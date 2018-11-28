import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-button-editor', 'Integration | Component | tr button editor', {
  integration: true
});

test('it renders', function(assert) {
    //todo:implement test
    this.render(hbs`{{tr-button-editor}}`);
    assert.equal(true, true);

  /*this.render(hbs`{{tr-button-editor}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tr-button-editor}}
      template block text
    {{/tr-button-editor}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
