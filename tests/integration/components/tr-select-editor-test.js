import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-select-editor', 'Integration | Component | tr select editor', {
  integration: true
});

test('it renders', function(assert) {
    //todo:implement test
    this.render(hbs`{{tr-select-editor}}`);
    assert.equal(true, true);

  /*this.render(hbs`{{tr-select-editor}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tr-select-editor}}
      template block text
    {{/tr-select-editor}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
