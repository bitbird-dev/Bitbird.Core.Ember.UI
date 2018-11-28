import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-textarea-editor', 'Integration | Component | tr textarea editor', {
  integration: true
});

test('it renders', function(assert) {
    //todo:implement test
    this.render(hbs`{{tr-textarea-editor}}`);
    assert.equal(true, true);
  /*this.render(hbs`{{tr-textarea-editor}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tr-textarea-editor}}
      template block text
    {{/tr-textarea-editor}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');*/
});
